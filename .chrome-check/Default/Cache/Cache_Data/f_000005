(() => {
  const page = document.querySelector("#autoDispatchPage");
  const body = page.querySelector("#autoTaskBody");
  const inspector = page.querySelector("#autoInspector");
  const rulesDialog = page.querySelector("#autoRulesDialog");
  const rulesForm = page.querySelector("#autoRulesForm");
  const SETTINGS_KEY = "container-logistics-auto-dispatch-settings-v1";
  const defaultSettings = { enabled: true, triggerMode: "realtime", intervalMinutes: 5, retryEnabled: true, maxTrips: 1, warningDays: 30 };
  const loadSettings = () => {
    try {
      return { ...defaultSettings, ...JSON.parse(window.localStorage?.getItem(SETTINGS_KEY) || "{}") };
    } catch (error) {
      return { ...defaultSettings };
    }
  };
  const settings = loadSettings();
  const saveSettings = () => {
    try { window.localStorage?.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch (error) { /* Storage can be unavailable in private contexts. */ }
  };
  const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
  const dateAfter = (days) => {
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() + days);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  };
  const dateCode = dateAfter(0).replace(/-/g, "");
  const initialTasks = () => [
    ...dispatches.filter((item) => item.status === "待派单").map((item) => ({
      id: `pending-${item.id}`, waybillNo: item.waybillNo, routeId: item.routeId,
      planDate: dateAfter(1), source: "待派单运单", status: "queue",
    })),
    { id: "order-201", waybillNo: `WB${dateCode}006`, routeId: "XL-002", planDate: dateAfter(2), source: "待调度订单", status: "queue" },
    { id: "order-202", waybillNo: `WB${dateCode}007`, routeId: "XL-003", planDate: dateAfter(1), source: "待调度订单", status: "queue" },
    { id: "order-203", waybillNo: `WB${dateCode}008`, routeId: "XL-004", planDate: dateAfter(1), source: "待调度订单", status: "queue" },
    { id: "order-204", waybillNo: dispatches.find((item) => item.status === "运输中")?.waybillNo || "WB20260916001", routeId: "XL-001", planDate: dateAfter(2), source: "待调度订单", status: "queue" },
  ];
  let tasks = initialTasks();
  let activeTab = "queue";
  let selectedId = tasks[0]?.id;
  let selectedPlate = vehicles[0]?.plateNo;
  let lastRun = "";
  let nextRun = settings.enabled && settings.triggerMode === "realtime" ? "新任务进入时" : "";
  let lastSummary = "等待任务";
  let runState = settings.enabled ? "waiting" : "paused";
  let autoTimer = null;

  function syncPendingTasks() {
    tasks = tasks.filter((task) => !task.id.startsWith("pending-") || task.status === "confirmed" || dispatches.some((item) => `pending-${item.id}` === task.id && item.status === "待派单"));
    dispatches.filter((item) => item.status === "待派单").forEach((item) => {
      if (tasks.some((task) => task.id === `pending-${item.id}`)) return;
      tasks.unshift({ id: `pending-${item.id}`, waybillNo: item.waybillNo, routeId: item.routeId,
        planDate: dateAfter(1), source: "待派单运单", status: "queue" });
    });
  }

  function routeFor(task) { return fixedRoutes.find((route) => route.id === task.routeId); }
  function vehicleOperation(vehicle) {
    if (vehicle.vehicleState !== "在用") return { state: vehicle.vehicleState || "停用", dispatch: null };
    const dispatch = dispatches.find((item) => item.vehicleId === vehicle.plateNo && ["运输中", "已派单"].includes(item.status));
    if (!dispatch) return { state: "闲置", dispatch: null };
    return { state: dispatch.status === "运输中" ? "在途" : "作业中", dispatch };
  }
  function reservations(date, planned = []) {
    const existing = dispatches.filter((item) => item.dispatchTime?.slice(0, 10) === date && ["已派单", "运输中", "已完成"].includes(item.status));
    const sameDay = planned.filter((task) => task.planDate === date && task.match);
    return {
      drivers: [...existing.map((item) => item.driverId), ...sameDay.map((task) => task.match.driver.id)],
      vehicles: sameDay.map((task) => task.match.vehicle.plateNo),
    };
  }
  function qualifiedDriver(driver, date) {
    return driver.driverType === "自有司机" && driver.driverState === "空闲" &&
      driver.certificationStatus === "verified" && driver.licenseExpiry >= date && driver.qualificationExpiry >= date;
  }
  function qualifiedVehicle(vehicle, date) {
    return vehicleOperation(vehicle).state === "闲置" && vehicle.inspectionDue >= date &&
      vehicle.insuranceDue >= date && vehicle.operatingPermitExpiry >= date;
  }
  function candidatesFor(task, planned) {
    const route = routeFor(task);
    if (!route) return { candidates: [], reason: "线路档案不存在" };
    if (route.routeState !== "启用") return { candidates: [], reason: "线路已停用" };
    if (dispatches.some((item) => item.waybillNo === task.waybillNo && !["待派单", "取消"].includes(item.status))) {
      return { candidates: [], reason: "运单已有有效派单" };
    }
    const used = reservations(task.planDate, planned);
    const eligibleDrivers = drivers.filter((driver) => qualifiedDriver(driver, task.planDate));
    if (!eligibleDrivers.length) return { candidates: [], reason: "无空闲、已认证且证件有效的自有司机" };
    const availableDrivers = eligibleDrivers.filter((driver) => used.drivers.filter((id) => id === driver.id).length < settings.maxTrips);
    if (!availableDrivers.length) return { candidates: [], reason: "司机当日任务已达上限" };
    const idleVehicles = vehicles.filter((vehicle) => vehicleOperation(vehicle).state === "闲置");
    if (!idleVehicles.length) return { candidates: [], reason: "暂无闲置车辆，在途及作业中车辆不可分配" };
    const eligibleVehicles = idleVehicles.filter((vehicle) => qualifiedVehicle(vehicle, task.planDate));
    if (!eligibleVehicles.length) return { candidates: [], reason: "闲置车辆的年检、营运证或保险已到期" };
    const availableVehicles = eligibleVehicles.filter((vehicle) => !used.vehicles.includes(vehicle.plateNo));
    if (!availableVehicles.length) return { candidates: [], reason: "闲置车辆在该日期已安排任务" };

    const candidates = availableDrivers.flatMap((driver) => availableVehicles.map((vehicle) => {
      const load = used.drivers.filter((id) => id === driver.id).length;
      const dedicated = vehicle.plateNo === route.defaultVehicle;
      const familiar = driver.name === route.defaultDriver;
      const soon = [driver.licenseExpiry, driver.qualificationExpiry, vehicle.insuranceDue, vehicle.inspectionDue]
        .some((end) => (new Date(`${end}T12:00:00`) - new Date(`${task.planDate}T12:00:00`)) / 86400000 <= settings.warningDays);
      return { driver, vehicle, load, dedicated, soon, score: 76 + (dedicated ? 15 : 0) + (familiar ? 4 : 0) + Math.max(0, 5 - load * 3) };
    })).sort((a, b) => Number(b.dedicated) - Number(a.dedicated) || a.load - b.load || b.score - a.score ||
      a.driver.id.localeCompare(b.driver.id) || a.vehicle.plateNo.localeCompare(b.vehicle.plateNo, "zh-CN"));
    return { candidates: candidates.slice(0, 4), reason: "" };
  }
  function taskPriority(task) {
    const route = routeFor(task);
    const vehicle = vehicles.find((item) => item.plateNo === route?.defaultVehicle);
    return route?.routeState === "启用" && vehicle && qualifiedVehicle(vehicle, task.planDate) ? 1 : 0;
  }

  function nowText() {
    if (window.DispatchStore?.nowText) return window.DispatchStore.nowText();
    return new Date().toLocaleString("zh-CN", { hour12: false });
  }

  function updateNextRun() {
    if (!settings.enabled) {
      nextRun = "已暂停";
      return;
    }
    if (settings.triggerMode === "realtime") {
      nextRun = settings.retryEnabled ? "新任务进入时 / 异常自动重试" : "新任务进入时";
      return;
    }
    const date = new Date(Date.now() + settings.intervalMinutes * 60000);
    nextRun = date.toLocaleString("zh-CN", { hour12: false });
  }

  function persistAssignments() {
    window.DispatchStore?.save?.(dispatches);
    if (typeof saveWaybills === "function") saveWaybills();
  }

  function confirmTask(task, match, automatic = false) {
    const route = routeFor(task);
    if (!route || !match) return false;
    const dispatchTime = nowText();
    const pending = dispatches.find((item) => item.waybillNo === task.waybillNo && item.status === "待派单");
    const assignment = {
      dispatchMode: automatic ? "auto" : "manual",
      waybillNo: task.waybillNo,
      orderDate: pending?.orderDate || task.planDate,
      routeId: route.id,
      routeName: route.routeName,
      origin: route.origin,
      destination: route.destination,
      loadAddress: pending?.loadAddress || `${route.origin} / ${route.destination}`,
      dispatchTime,
      driverId: match.driver.id,
      driverName: match.driver.name,
      phone: match.driver.phone || "-",
      vehicleId: match.vehicle.plateNo,
      status: "已派单",
      currentNode: "待提货",
      boxes: pending?.boxes || "待装箱",
      estimatedRevenue: Number(route.estimatedRevenue) || 0,
      commission: calculateRouteCommission(route),
      note: automatic ? "系统自动派单" : "调度确认派单",
      pushed: true,
      timeline: [{ node: "已派单", time: dispatchTime, desc: automatic ? "系统完成自动派单并推送至司机微信小程序" : "调度确认后推送至司机微信小程序", photos: [] }],
    };
    if (pending) Object.assign(pending, assignment);
    else dispatches.unshift({ id: `PD-${Date.now()}-${task.id}`, ...assignment });
    match.driver.driverState = "运输中";
    if (typeof waybills !== "undefined") {
      const waybill = waybills.find((item) => item.waybillNo === task.waybillNo);
      if (waybill) {
        waybill.dispatchDate = dispatchTime.slice(0, 10);
        waybill.plateNo = match.vehicle.plateNo;
        waybill.driverId = match.driver.id;
        waybill.driverName = match.driver.name;
      }
    }
    task.match = match;
    task.status = "confirmed";
    task.confirmedAt = dispatchTime;
    task.executionMode = automatic ? "自动执行" : "人工确认";
    return true;
  }

  function runMatching({ automatic = false, trigger = "立即执行" } = {}) {
    runState = "running";
    syncPendingTasks();
    const reserved = tasks.filter((task) => task.status === "confirmed");
    tasks.map((task, index) => ({ task, index })).filter(({ task }) => task.status !== "confirmed")
      .sort((a, b) => taskPriority(b.task) - taskPriority(a.task) || a.index - b.index)
      .forEach(({ task }) => {
        const result = candidatesFor(task, reserved);
        task.candidates = result.candidates;
        task.reason = result.reason;
        task.matchIndex = 0;
        task.status = result.candidates.length ? "ready" : "exception";
        if (task.status === "ready") reserved.push({ ...task, match: task.candidates[0] });
      });
    let assignedCount = 0;
    if (automatic) {
      tasks.filter((task) => task.status === "ready").forEach((task) => {
        if (confirmTask(task, task.candidates[task.matchIndex || 0], true)) assignedCount += 1;
      });
      if (assignedCount) persistAssignments();
    }
    const exceptionCount = tasks.filter((task) => task.status === "exception").length;
    lastRun = nowText();
    lastSummary = automatic ? `成功 ${assignedCount} · 异常 ${exceptionCount}` : `已生成 ${tasks.filter((task) => task.status === "ready").length} 个方案`;
    runState = settings.enabled ? "waiting" : "paused";
    updateNextRun();
    activeTab = automatic
      ? (exceptionCount ? "exception" : "result")
      : (tasks.some((task) => task.status === "ready") ? "queue" : tasks.some((task) => task.status === "exception") ? "exception" : "result");
    selectedId = tasks.find((task) => activeTab === "queue" ? task.status === "ready" : activeTab === "exception" ? task.status === "exception" : task.status === "confirmed")?.id;
    page.dataset.lastTrigger = trigger;
    render();
  }

  function runAutomatic(trigger = "自动执行", force = false) {
    if (!settings.enabled && !force) return;
    runMatching({ automatic: true, trigger });
  }

  function scheduleAutomaticExecution() {
    if (autoTimer && window.clearInterval) window.clearInterval(autoTimer);
    autoTimer = null;
    updateNextRun();
    if (!settings.enabled || !window.setInterval || (settings.triggerMode !== "interval" && !settings.retryEnabled)) return;
    autoTimer = window.setInterval(() => {
      const hasExceptions = tasks.some((task) => task.status === "exception");
      if (settings.triggerMode === "interval" || (settings.retryEnabled && hasExceptions)) {
        runAutomatic(settings.triggerMode === "interval" ? "定时执行" : "异常自动重试");
      }
    }, settings.intervalMinutes * 60000);
  }
  function renderFleetDetail(vehicle) {
    if (!vehicle) { inspector.innerHTML = ""; return; }
    const operation = vehicleOperation(vehicle);
    const routes = fixedRoutes.filter((route) => route.defaultVehicle === vehicle.plateNo && route.routeState === "启用");
    const confirmed = tasks.filter((task) => task.status === "confirmed" && task.match.vehicle.plateNo === vehicle.plateNo);
    inspector.innerHTML = `<div class="auto-inspector-head"><div><span>车辆信息</span><h3>${escapeHtml(vehicle.plateNo)}</h3></div><span class="auto-state ${operation.state === "闲置" ? "ready" : operation.state === "停用" ? "disabled" : "busy"}">${operation.state}</span></div>
      <div class="auto-detail-grid"><div><span>车辆状态</span><strong>${escapeHtml(vehicle.vehicleState)}</strong></div><div><span>当前任务</span><strong>${escapeHtml(operation.dispatch?.waybillNo || "无")}</strong></div><div><span>绑定线路</span><strong>${escapeHtml(routes.map((route) => route.routeName).join("、") || "未绑定")}</strong></div><div><span>已确认排程</span><strong>${confirmed.length} 趟</strong></div><div><span>年检到期</span><strong>${escapeHtml(vehicle.inspectionDue)}</strong></div><div><span>保险到期</span><strong>${escapeHtml(vehicle.insuranceDue)}</strong></div></div>
      <button class="btn quiet auto-confirm" type="button" data-auto-nav="vehicle-archives">查看车辆档案</button>`;
  }
  function renderInspector(task) {
    if (!task) { inspector.innerHTML = '<div class="auto-inspector-empty"><strong>暂无记录</strong></div>'; return; }
    const route = routeFor(task);
    const match = task.status === "confirmed" ? task.match : task.candidates?.[task.matchIndex || 0];
    const dedicated = vehicles.find((vehicle) => vehicle.plateNo === route?.defaultVehicle);
    const dedicatedState = dedicated ? vehicleOperation(dedicated).state : "未绑定";
    const summary = route ? `<div class="auto-detail-grid"><div><span>固定线路</span><strong>${escapeHtml(route.routeName)}</strong></div><div><span>计划日期</span><strong>${escapeHtml(task.planDate)}</strong></div><div><span>起运地</span><strong>${escapeHtml(route.origin)}</strong></div><div><span>目的地</span><strong>${escapeHtml(route.destination)}</strong></div><div><span>线路专属车辆</span><strong>${escapeHtml(route.defaultVehicle || "未绑定")} · ${escapeHtml(dedicatedState)}</strong></div><div><span>预估收入 / 司机提成</span><strong>${formatMoney(Number(route.estimatedRevenue) || 0)} / ${formatMoney(calculateRouteCommission(route))}</strong></div></div>` : "";
    const others = task.status === "ready" && task.candidates.length > 1 ? `<div class="auto-candidate-list"><strong>其他候选运力</strong>${task.candidates.map((candidate, index) => `<button class="auto-candidate ${index === task.matchIndex ? "chosen" : ""}" type="button" data-auto-candidate="${index}"><span>${escapeHtml(candidate.driver.name)} · ${escapeHtml(candidate.vehicle.plateNo)}${candidate.dedicated ? " · 专属车辆" : ""} · 当日 ${candidate.load} 趟</span><b>${candidate.score} 分</b></button>`).join("")}</div>` : "";
    const destination = task.reason?.includes("线路") ? ["fixed-routes", "查看线路档案"] : task.reason?.includes("运单") ? ["dispatch-list", "查看派单列表"] : task.reason?.includes("司机") ? ["driver-archives", "查看司机档案"] : task.reason?.includes("车辆") ? ["vehicle-archives", "查看车辆档案"] : ["", ""];
    inspector.innerHTML = `<div class="auto-inspector-head"><div><span>任务详情</span><h3>${escapeHtml(task.waybillNo)}</h3></div><span class="auto-state ${task.status}">${{ queue: "待匹配", ready: "待确认", exception: "需处理", confirmed: "已派单" }[task.status]}</span></div>${summary}
      ${match ? `<div class="auto-match-result"><div class="auto-match-title"><strong>${task.status === "confirmed" ? "已分配运力" : "匹配建议"}</strong><span>${match.score} 分</span></div><div class="auto-match-person"><div><span>司机</span><strong>${escapeHtml(match.driver.name)}</strong><small>当日已安排 ${match.load} 趟 · 负载优先</small></div><div><span>车辆</span><strong>${escapeHtml(match.vehicle.plateNo)}</strong><small>闲置${match.dedicated ? " · 线路专属" : " · 可用运力"}</small></div></div>${dedicated && dedicatedState !== "闲置" && !match.dedicated ? `<p class="auto-warning">专属车辆${escapeHtml(dedicatedState)}，已匹配其他闲置车辆。</p>` : ""}${match.soon ? `<p class="auto-warning">有证件或保险将在 ${settings.warningDays} 天内到期。</p>` : ""}</div>${others}${task.status === "confirmed" ? `<div class="auto-trace"><strong>派单记录</strong><span>${escapeHtml(task.confirmedAt)} · ${escapeHtml(task.executionMode || "人工确认")} · 已推送司机端</span></div>` : `<button class="btn primary auto-confirm" id="autoConfirmBtn" type="button">确认并派单</button>`}` : task.status === "exception" ? `<div class="auto-exception-detail"><strong>待处理原因</strong><p>${escapeHtml(task.reason)}</p></div>${destination[0] ? `<button class="btn quiet auto-confirm" data-auto-nav="${destination[0]}" type="button">${destination[1]}</button>` : ""}<button class="auto-retry" id="autoRetryBtn" type="button">重新匹配</button>` : `<div class="auto-waiting"><strong>待匹配</strong></div><button class="btn primary auto-confirm" id="autoSingleRunBtn" type="button">运行匹配</button>`}`;
  }

  function renderExecutionState() {
    const enabled = settings.enabled;
    page.querySelector("#autoExecutionToggle").checked = enabled;
    page.querySelector("#autoTriggerMode").value = settings.triggerMode;
    page.querySelector("#autoIntervalMinutes").value = String(settings.intervalMinutes);
    page.querySelector("#autoRetryToggle").checked = settings.retryEnabled;
    page.querySelector("#autoIntervalField").classList.toggle("disabled", settings.triggerMode !== "interval");
    page.querySelector("#autoExecutionBadge").textContent = enabled ? "自动执行中" : "已暂停";
    page.querySelector("#autoExecutionBadge").dataset.state = enabled ? "active" : "paused";
    page.querySelector("#autoExecutionTitle").textContent = enabled ? "自动执行已开启" : "自动执行已暂停";
    page.querySelector("#autoExecutionDescription").textContent = enabled
      ? (settings.triggerMode === "realtime" ? "新任务进入后自动匹配并派单" : `每 ${settings.intervalMinutes} 分钟批量匹配并派单`)
      : "待派单任务将保留，仍可手动立即执行";
    page.querySelector("#autoLastRun").textContent = lastRun || "等待首次执行";
    page.querySelector("#autoNextRun").textContent = nextRun || "等待设置";
    page.querySelector("#autoRunSummary").textContent = lastSummary;
    page.querySelector("#autoRunDot").dataset.state = runState;
  }

  function render() {
    renderExecutionState();
    const queue = tasks.filter((task) => ["queue", "ready"].includes(task.status));
    const exceptions = tasks.filter((task) => task.status === "exception");
    const results = tasks.filter((task) => task.status === "confirmed");
    const idle = vehicles.filter((vehicle) => vehicleOperation(vehicle).state === "闲置");
    const busy = vehicles.filter((vehicle) => ["在途", "作业中"].includes(vehicleOperation(vehicle).state));
    page.querySelector("#autoMetrics").innerHTML = [
      ["待匹配任务", queue.length, "待处理运单", "total"], ["当前闲置车辆", idle.length, "按计划日期校验排程", "ready"],
      ["在途 / 作业中", busy.length, "当前不参与分配", "exception"], ["已完成派单", results.length, "已推送司机端", "result"],
    ].map(([label, value, hint, type]) => `<div class="auto-metric ${type}"><span>${label}</span><strong>${value}</strong><small>${hint}</small></div>`).join("");
    page.querySelector("#autoQueueCount").textContent = queue.length;
    page.querySelector("#autoExceptionCount").textContent = exceptions.length;
    page.querySelector("#autoResultCount").textContent = results.length;
    page.querySelector("#autoFleetCount").textContent = vehicles.length;
    page.querySelectorAll(".auto-stage span").forEach((stage, index) => stage.classList.toggle("reached", index === 0 || (lastRun && index < 3) || (results.length && index === 3)));
    page.querySelectorAll("[data-auto-tab]").forEach((tab) => {
      const active = tab.dataset.autoTab === activeTab;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", String(active));
    });
    if (activeTab === "fleet") {
      page.querySelector("#autoListTitle").textContent = "车辆运力状态";
      page.querySelector("#autoListSubtitle").textContent = `闲置 ${idle.length} · 在途 / 作业中 ${busy.length}`;
      page.querySelector("#autoTableHead").innerHTML = '<tr><th>车牌</th><th>绑定线路</th><th>当前状态</th><th>关联任务</th><th class="fixed-action-column">操作</th></tr>';
      if (!vehicles.some((vehicle) => vehicle.plateNo === selectedPlate)) selectedPlate = vehicles[0]?.plateNo;
      body.innerHTML = vehicles.map((vehicle) => {
        const operation = vehicleOperation(vehicle);
        const route = fixedRoutes.find((item) => item.routeState === "启用" && item.defaultVehicle === vehicle.plateNo);
        const booked = tasks.filter((task) => task.status === "confirmed" && task.match.vehicle.plateNo === vehicle.plateNo);
        const jobs = operation.dispatch?.waybillNo || booked.map((task) => `${task.planDate} ${task.waybillNo}`).join("、") || "-";
        return `<tr class="${selectedPlate === vehicle.plateNo ? "selected" : ""}" data-auto-plate="${escapeHtml(vehicle.plateNo)}"><td><strong>${escapeHtml(vehicle.plateNo)}</strong></td><td>${escapeHtml(route?.routeName || "未绑定")}</td><td><span class="auto-state ${operation.state === "闲置" ? "ready" : operation.state === "停用" ? "disabled" : "busy"}">${operation.state}</span></td><td>${escapeHtml(jobs)}</td><td class="fixed-action-column"><button class="link-btn" type="button">查看</button></td></tr>`;
      }).join("");
      renderFleetDetail(vehicles.find((vehicle) => vehicle.plateNo === selectedPlate));
      return;
    }
    const groups = { queue, exception: exceptions, result: results };
    const visible = groups[activeTab];
    if (!visible.some((task) => task.id === selectedId)) selectedId = visible[0]?.id;
    page.querySelector("#autoListTitle").textContent = { queue: "待处理任务", exception: "异常任务", result: "已完成派单" }[activeTab];
    page.querySelector("#autoListSubtitle").textContent = lastRun ? `最近执行：${lastRun}` : `待处理 ${queue.length} 条`;
    page.querySelector("#autoTableHead").innerHTML = '<tr><th>任务 / 来源</th><th>运输线路</th><th>计划日期</th><th>匹配状态</th><th class="fixed-action-column">操作</th></tr>';
    body.innerHTML = visible.length ? visible.map((task) => {
      const status = { queue: "待匹配", ready: "待确认", exception: "需处理", confirmed: "已派单" }[task.status];
      return `<tr class="${task.id === selectedId ? "selected" : ""}" data-auto-id="${escapeHtml(task.id)}"><td><strong>${escapeHtml(task.waybillNo)}</strong><small>${escapeHtml(task.source)}</small></td><td>${escapeHtml(routeFor(task)?.routeName || "线路未找到")}</td><td>${escapeHtml(task.planDate)}</td><td><span class="auto-state ${task.status}">${status}</span></td><td class="fixed-action-column"><button class="link-btn" type="button">查看</button></td></tr>`;
    }).join("") : `<tr><td class="no-data-cell" colspan="5">${{ queue: "暂无待处理任务", exception: "暂无异常任务", result: "暂无已完成派单" }[activeTab]}</td></tr>`;
    renderInspector(tasks.find((task) => task.id === selectedId));
  }

  page.querySelector("#autoRunBtn").addEventListener("click", () => runAutomatic("手动立即执行", true));
  page.querySelector("#autoResetBtn").addEventListener("click", () => {
    tasks = initialTasks();
    activeTab = "queue";
    selectedId = tasks[0]?.id;
    lastRun = "";
    lastSummary = "等待任务";
    runState = settings.enabled ? "waiting" : "paused";
    updateNextRun();
    render();
  });
  page.querySelector("#autoExecutionToggle").addEventListener("change", (event) => {
    settings.enabled = event.target.checked;
    runState = settings.enabled ? "waiting" : "paused";
    saveSettings();
    scheduleAutomaticExecution();
    if (settings.enabled && settings.triggerMode === "realtime") runAutomatic("启用自动执行");
    else render();
  });
  page.querySelector("#autoTriggerMode").addEventListener("change", (event) => {
    settings.triggerMode = event.target.value;
    saveSettings();
    scheduleAutomaticExecution();
    if (settings.enabled && settings.triggerMode === "realtime") runAutomatic("切换为即时执行");
    else render();
  });
  page.querySelector("#autoIntervalMinutes").addEventListener("change", (event) => {
    settings.intervalMinutes = Number(event.target.value) || 5;
    saveSettings();
    scheduleAutomaticExecution();
    render();
  });
  page.querySelector("#autoRetryToggle").addEventListener("change", (event) => {
    settings.retryEnabled = event.target.checked;
    saveSettings();
    scheduleAutomaticExecution();
    render();
  });
  page.querySelector("#autoRulesBtn").addEventListener("click", () => rulesDialog.showModal());
  page.querySelector("#autoRulesClose").addEventListener("click", () => rulesDialog.close());
  page.querySelector("#autoRulesCancel").addEventListener("click", () => rulesDialog.close());
  rulesForm.addEventListener("submit", (event) => {
    event.preventDefault();
    settings.maxTrips = Number(rulesForm.elements.maxTrips.value);
    settings.warningDays = Number(rulesForm.elements.warningDays.value);
    saveSettings();
    rulesDialog.close();
    if (lastRun && settings.enabled) runAutomatic("规则更新"); else render();
  });
  page.querySelectorAll("[data-auto-tab]").forEach((tab) => tab.addEventListener("click", () => { activeTab = tab.dataset.autoTab; render(); }));
  body.addEventListener("click", (event) => {
    const vehicleRow = event.target.closest("[data-auto-plate]");
    const taskRow = event.target.closest("[data-auto-id]");
    if (vehicleRow) selectedPlate = vehicleRow.dataset.autoPlate;
    if (taskRow) selectedId = taskRow.dataset.autoId;
    if (vehicleRow || taskRow) render();
  });
  inspector.addEventListener("click", (event) => {
    const destination = event.target.closest("[data-auto-nav]");
    if (destination) { switchPage(destination.dataset.autoNav); return; }
    const task = tasks.find((item) => item.id === selectedId);
    if (activeTab === "fleet" || !task) return;
    const candidate = event.target.closest("[data-auto-candidate]");
    if (candidate) { task.matchIndex = Number(candidate.dataset.autoCandidate); render(); return; }
    if (event.target.closest("#autoRetryBtn")) {
      if (settings.retryEnabled || settings.enabled) runAutomatic("异常重试", true);
      else runMatching();
      return;
    }
    if (event.target.closest("#autoSingleRunBtn")) { runMatching(); return; }
    if (!event.target.closest("#autoConfirmBtn") || task.status !== "ready") return;
    const match = task.candidates[task.matchIndex];
    const current = candidatesFor(task, tasks.filter((item) => item.status === "confirmed"));
    if (!current.candidates.some((item) => item.driver.id === match.driver.id && item.vehicle.plateNo === match.vehicle.plateNo)) {
      task.status = "exception";
      task.reason = current.reason || "候选运力已被其他任务占用，请重新匹配";
      activeTab = "exception";
      render();
      return;
    }
    task.match = match;
    confirmTask(task, match, false);
    persistAssignments();
    runMatching();
    activeTab = "result";
    selectedId = task.id;
    render();
  });
  function refresh() {
    syncPendingTasks();
    const hasQueuedTasks = tasks.some((task) => task.status === "queue");
    if (settings.enabled && settings.triggerMode === "realtime" && hasQueuedTasks) {
      runAutomatic("新任务接入");
      return;
    }
    const tab = activeTab;
    const taskId = selectedId;
    activeTab = tab;
    selectedId = taskId;
    render();
  }
  window.AutoDispatchManager = { render, refresh, run: () => runAutomatic("外部触发", true) };
  scheduleAutomaticExecution();
  if (settings.enabled && settings.triggerMode === "realtime") runAutomatic("系统启动");
  else render();
})();
