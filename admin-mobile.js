const moduleCatalog = {
  waybill: {
    title: "运单管理", eyebrow: "集卡业务", icon: "file-text", primary: "新增运单",
    filters: ["全部", "草拟", "已审核"],
    items: [
      { id: "WB20260916001", title: "宁波远海供应链有限公司", subtitle: "北仑港至江北仓", status: "草拟", statusClass: "warning", fields: [["接单日期", "2026-09-16"], ["箱型", "40HQ"], ["装卸地址", "北仑港区二期 / 江北仓"], ["回单", "未收到"]], note: "上午装柜" },
      { id: "WB20260916002", title: "上海嘉航国际物流有限公司", subtitle: "洋山港至昆山保税区", status: "草拟", statusClass: "warning", fields: [["接单日期", "2026-09-16"], ["箱型", "20GP*2"], ["装卸地址", "上海洋山港 / 昆山综保区"], ["回单", "未收到"]], note: "双拖作业" },
      { id: "WB20260916003", title: "杭州联贸进出口有限公司", subtitle: "萧山仓至梅山码头", status: "已审核", statusClass: "success", fields: [["接单日期", "2026-09-15"], ["箱型", "40GP"], ["装卸地址", "杭州萧山仓 / 梅山码头"], ["回单", "无需回单"]], note: "夜间进港" },
      { id: "WB20260916004", title: "苏州新程电子科技有限公司", subtitle: "苏州园区至外高桥", status: "草拟", statusClass: "warning", fields: [["接单日期", "2026-09-14"], ["箱型", "20GP"], ["装卸地址", "苏州工业园 / 外高桥"], ["回单", "未收到"]], note: "客户指定司机" },
    ],
  },
  route: {
    title: "固定线路", eyebrow: "集卡业务", icon: "route", primary: "新增线路",
    filters: ["全部", "启用", "停用"],
    items: [
      { id: "XL-NB-001", title: "北仑港至江北仓", subtitle: "宁波北仑港区二期 → 宁波江北物流园", status: "启用", statusClass: "success", fields: [["今日单量", "2 单"], ["负荷", "67%"], ["提成方式", "固定金额"], ["常用车辆", "浙B·K7812"]], note: "日常进口柜线路" },
      { id: "XL-SH-002", title: "洋山港至昆山保税区", subtitle: "上海洋山港 → 昆山综合保税区", status: "启用", statusClass: "success", fields: [["今日单量", "1 单"], ["负荷", "50%"], ["提成方式", "收入比例"], ["常用车辆", "沪D·A9021"]], note: "双拖需单独核价" },
      { id: "XL-HZ-003", title: "萧山仓至梅山码头", subtitle: "杭州萧山仓 → 宁波梅山码头", status: "启用", statusClass: "success", fields: [["今日单量", "1 单"], ["负荷", "50%"], ["提成方式", "固定金额"], ["常用司机", "陈涛"]], note: "出口柜线路" },
      { id: "XL-SZ-004", title: "苏州园区至外高桥", subtitle: "苏州工业园区 → 上海外高桥", status: "停用", statusClass: "muted", fields: [["今日单量", "0 单"], ["负荷", "0%"], ["提成方式", "收入比例"], ["常用车辆", "苏E·T5568"]], note: "暂停售价维护" },
    ],
  },
  dispatch: {
    title: "派单列表", eyebrow: "集卡业务", icon: "send", primary: "新增派单",
    filters: ["全部", "待派单", "已派单", "运输中", "已完成"],
    items: [
      { id: "PD-1005", title: "北仑港至江北仓", subtitle: "WB20260916005", status: "待派单", statusClass: "warning", fields: [["司机", "待分配"], ["车辆", "待分配"], ["当前节点", "待派单"], ["派单方式", "待分配"]], note: "等待调度" },
      { id: "PD-1002", title: "洋山港至昆山保税区", subtitle: "WB20260916002", status: "已派单", statusClass: "", fields: [["司机", "赵亮"], ["车辆", "沪D·A9021"], ["当前节点", "待提货"], ["派单方式", "自动派单"]], note: "双拖作业，按现场指引进港" },
      { id: "PD-1001", title: "北仑港至江北仓", subtitle: "WB20260916001", status: "运输中", statusClass: "", fields: [["司机", "王海"], ["车辆", "浙B·K7812"], ["当前节点", "在途"], ["派单方式", "自动派单"]], note: "上午装柜" },
      { id: "PD-1003", title: "萧山仓至梅山码头", subtitle: "WB20260916003", status: "已完成", statusClass: "success", fields: [["司机", "陈涛"], ["车辆", "浙A·F2190"], ["当前节点", "已送达"], ["派单方式", "手动派单"]], note: "夜间进港" },
    ],
  },
  auto: {
    title: "自动派单", eyebrow: "智能调度", icon: "wand-sparkles", primary: "立即执行",
    filters: ["全部", "待处理", "已完成", "异常"],
    items: [
      { id: "AUTO-260916-01", title: "自动执行任务", subtitle: "2026-09-16 09:30", status: "已完成", statusClass: "success", fields: [["接入任务", "4 条"], ["成功派单", "3 条"], ["待人工处理", "1 条"], ["执行耗时", "18 秒"]], note: "线路优先、闲置车辆优先、司机负载均衡" },
      { id: "RULE-01", title: "线路专属车辆优先", subtitle: "匹配规则 01", status: "已启用", statusClass: "success", fields: [["优先级", "最高"], ["适用线路", "全部固定线路"], ["冲突处理", "转入通用车辆池"], ["自动执行", "开启"]], note: "固定线路优先匹配绑定车辆" },
      { id: "RULE-02", title: "闲置运力优先", subtitle: "匹配规则 02", status: "已启用", statusClass: "success", fields: [["优先级", "高"], ["车辆状态", "仅闲置"], ["排除状态", "在途、维修中"], ["自动识别", "开启"]], note: "不分配在途或作业中的车辆" },
      { id: "AUTO-EX-01", title: "WB20260916005", subtitle: "北仑港至江北仓", status: "待处理", statusClass: "warning", fields: [["异常原因", "暂无闲置车辆"], ["建议操作", "人工补派"], ["进入时间", "10:08"], ["优先级", "高"]], note: "当前线路车辆均在执行任务" },
    ],
  },
  vehicle: {
    title: "车辆档案", eyebrow: "车辆管理", icon: "truck", primary: "新增车辆",
    filters: ["全部", "在用", "维修中", "停用"],
    items: [
      { id: "浙B·K7812", title: "集装箱牵引车", subtitle: "宁波港区集卡车队", status: "在用", statusClass: "success", fields: [["司机", "王海"], ["当前状态", "运输中"], ["审验到期", "2026-10-18"], ["保险到期", "2026-10-05"]], note: "港区短驳主力车辆" },
      { id: "沪D·A9021", title: "重型半挂牵引车", subtitle: "临港集卡车队", status: "在用", statusClass: "success", fields: [["司机", "赵亮"], ["当前状态", "已派单"], ["审验到期", "2026-09-28"], ["保险到期", "2026-11-12"]], note: "临港主力运力" },
      { id: "苏E·T5568", title: "集装箱骨架车", subtitle: "苏州园区集卡车队", status: "维修中", statusClass: "warning", fields: [["司机", "刘军"], ["当前状态", "维修中"], ["审验到期", "2026-08-30"], ["保险到期", "2026-09-10"]], note: "待复检，暂不排班" },
      { id: "浙A·F2190", title: "危险品牵引车", subtitle: "杭州危险品运输车队", status: "在用", statusClass: "success", fields: [["司机", "陈涛"], ["当前状态", "已完工"], ["审验到期", "2026-12-20"], ["保险到期", "2026-09-30"]], note: "需随车携带危化品资质" },
    ],
  },
  driver: {
    title: "司机档案", eyebrow: "司机管理", icon: "badge-user", primary: "新增司机",
    filters: ["全部", "空闲", "运输中", "停用"],
    items: [
      { id: "SJ-1001", title: "王海", subtitle: "宁波一队 · 138****8881", status: "运输中", statusClass: "", fields: [["准驾车型", "A2"], ["车辆", "浙B·K7812"], ["认证", "已认证"], ["证件到期", "2027-05-18"]], note: "自有司机" },
      { id: "SJ-1002", title: "赵亮", subtitle: "临港车队 · 139****6662", status: "运输中", statusClass: "", fields: [["准驾车型", "A2"], ["车辆", "沪D·A9021"], ["认证", "已认证"], ["证件到期", "2026-09-28"]], note: "自有司机" },
      { id: "SJ-1003", title: "刘军", subtitle: "苏州二队 · 137****3335", status: "停用", statusClass: "muted", fields: [["准驾车型", "A2"], ["车辆", "苏E·T5568"], ["认证", "审核中"], ["证件到期", "2026-08-30"]], note: "证件续办中" },
      { id: "SJ-1004", title: "陈涛", subtitle: "杭州车队 · 136****2228", status: "空闲", statusClass: "success", fields: [["准驾车型", "A2"], ["车辆", "浙A·F2190"], ["认证", "已认证"], ["证件到期", "2028-03-15"]], note: "自有司机" },
      { id: "SJ-1005", title: "周凯", subtitle: "宁波二队 · 135****7719", status: "停用", statusClass: "muted", fields: [["准驾车型", "A2"], ["车辆", "未绑定"], ["认证", "未认证"], ["证件到期", "2029-11-08"]], note: "入职资料待复核" },
    ],
  },
  customer: {
    title: "客户管理", eyebrow: "基础资料", icon: "building-2", primary: "新增客户",
    filters: ["全部", "启用", "停用"],
    items: [
      { id: "KH-1008", title: "宁波远海供应链有限公司", subtitle: "简称：宁波远海", status: "启用", statusClass: "success", fields: [["客户类型", "直营"], ["联系人", "李经理"], ["手机", "13800001008"], ["结算周期", "月结30天"]], note: "默认装货地址：宁波北仑港区二期" },
      { id: "KH-1022", title: "上海嘉航国际物流有限公司", subtitle: "简称：上海嘉航", status: "启用", statusClass: "success", fields: [["客户类型", "货代"], ["联系人", "陈主管"], ["手机", "13900001022"], ["结算周期", "月结15天"]], note: "默认装货地址：上海洋山港" },
      { id: "KH-1035", title: "杭州联贸进出口有限公司", subtitle: "简称：杭州联贸", status: "启用", statusClass: "success", fields: [["客户类型", "贸易企业"], ["联系人", "周女士"], ["手机", "13600001035"], ["结算周期", "月结30天"]], note: "默认装货地址：杭州萧山仓" },
      { id: "KH-1120", title: "上海港联贸易有限公司", subtitle: "简称：上海港联", status: "停用", statusClass: "muted", fields: [["客户类型", "贸易企业"], ["联系人", "何经理"], ["手机", "13100001120"], ["结算周期", "月结60天"]], note: "默认装货地址：上海外高桥" },
    ],
  },
  reminder: {
    title: "到期提醒", eyebrow: "车辆管理", icon: "shield-alert", primary: "消息提醒",
    filters: ["全部", "保险即将到期", "审验即将到期", "已过期"],
    items: [
      { id: "苏E·T5568", title: "车辆证件已过期", subtitle: "苏州园区集卡车队", status: "已过期", statusClass: "danger", fields: [["保险到期", "2026-09-10"], ["审验到期", "2026-08-30"], ["司机", "刘军"], ["车辆状态", "维修中"]], note: "立即补办审验或续保，暂停派车" },
      { id: "浙B·K7812", title: "保险即将到期", subtitle: "宁波港区集卡车队", status: "保险即将到期", statusClass: "warning", fields: [["保险到期", "2026-10-05"], ["剩余天数", "19 天"], ["司机", "王海"], ["车辆状态", "在用"]], note: "联系保险公司续保并上传新保单" },
    ],
  },
};

const messages = [
  { id: "M-1", type: "task", title: "自动派单存在待处理任务", desc: "WB20260916005 暂无可用车辆，请人工补派。", time: "10:08", icon: "wand-sparkles", style: "warning", module: "auto", unread: true },
  { id: "M-2", type: "warning", title: "车辆保险即将到期", desc: "浙B·K7812 的保险将在 19 天后到期。", time: "09:30", icon: "shield-alert", style: "warning", module: "reminder", unread: true },
  { id: "M-3", type: "task", title: "司机已上报运输节点", desc: "王海已完成提货，当前节点更新为在途。", time: "09:12", icon: "map-pinned", style: "success", module: "dispatch", unread: true },
  { id: "M-4", type: "warning", title: "车辆审验已过期", desc: "苏E·T5568 年检已过期，当前不可参与派车。", time: "昨天", icon: "triangle-alert", style: "warning", module: "reminder", unread: false },
  { id: "M-5", type: "task", title: "今日自动派单执行完成", desc: "接入 4 条任务，成功派单 3 条。", time: "昨天", icon: "circle-check", style: "success", module: "auto", unread: false },
];

const state = { currentView: "workbench", currentModule: "", moduleFilter: "全部", messageFilter: "all", search: "", detailItem: null };
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const h = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));

function refreshIcons() { window.lucide?.createIcons(); }

function showToast(message) {
  const toast = $("#managerToast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 1900);
}

function switchView(view) {
  state.currentView = view;
  $(".manager-shell").classList.remove("subpage-open");
  $$(".manager-view").forEach((item) => item.classList.toggle("active", item.id === `${view}View`));
  $$("#managerBottomNav button").forEach((button) => button.classList.toggle("active", button.dataset.view === view));
  $("#managerTitle").textContent = { workbench: "工作台", messages: "消息", profile: "我的" }[view];
  $("#headerEyebrow").textContent = view === "workbench" ? "集卡物流管理端" : view === "messages" ? "任务与预警通知" : "运营中心账号";
  if (view === "messages") renderMessages();
  $("#moduleView").classList.remove("open");
  $("#managerDetailView").classList.remove("open");
}

function renderWorkbench() {
  $("#focusList").innerHTML = `
    <button class="focus-row" data-open-module="dispatch" type="button"><span class="focus-symbol"><i data-lucide="circle-alert"></i></span><span><strong>2 条任务等待执行</strong><small>优先完成司机和车辆匹配</small></span><em>去处理</em></button>
    <button class="focus-row" data-open-module="reminder" type="button"><span class="focus-symbol blue"><i data-lucide="shield-alert"></i></span><span><strong>2 项车辆证件预警</strong><small>包含 1 项已过期记录</small></span><em>查看</em></button>`;
  const loads = [["北仑港至江北仓", "2 单", 67], ["洋山港至昆山保税区", "1 单", 50], ["萧山仓至梅山码头", "1 单", 50]];
  $("#mobileRouteLoad").innerHTML = loads.map(([name, count, load]) => `<div class="route-load-item"><div><strong>${name}</strong><small>今日 ${count}</small></div><div class="route-progress ${load >= 80 ? "warning" : ""}"><i><b style="width:${load}%"></b></i><span>${load}% 饱和度</span></div></div>`).join("");
  refreshIcons();
}

function moduleStatusMatches(item, filter) {
  if (filter === "全部") return true;
  if (filter === "空闲") return item.fields.some(([, value]) => value === "已完工") || item.status === "空闲";
  if (filter === "保险即将到期" || filter === "审验即将到期" || filter === "已过期") return item.status === filter;
  return item.status === filter;
}

function renderModule() {
  const meta = moduleCatalog[state.currentModule];
  if (!meta) return;
  const query = state.search.trim().toLowerCase();
  const items = meta.items.filter((item) => moduleStatusMatches(item, state.moduleFilter) && (!query || JSON.stringify(item).toLowerCase().includes(query)));
  $("#moduleFilters").innerHTML = meta.filters.map((filter) => `<button class="${filter === state.moduleFilter ? "active" : ""}" data-module-filter="${h(filter)}" type="button">${h(filter)}</button>`).join("");
  $("#moduleSummary").innerHTML = `<span>当前结果</span><strong>${items.length} 条</strong>`;
  $("#moduleList").innerHTML = items.length ? items.map((item) => `
    <article class="manager-list-card">
      <div class="list-card-top"><div><strong>${h(item.title)}</strong><small>${h(item.id)} · ${h(item.subtitle)}</small></div><span class="status-tag ${h(item.statusClass)}">${h(item.status)}</span></div>
      <div class="list-card-grid">${item.fields.slice(0, 4).map(([label, value]) => `<div class="list-field"><span>${h(label)}</span><strong>${h(value)}</strong></div>`).join("")}</div>
      <div class="list-card-footer"><span>${h(item.note || "资料已同步")}</span><button class="${item.status === "待派单" || item.status === "待处理" ? "primary" : ""}" data-module-detail="${h(item.id)}" type="button">${item.status === "待派单" ? "去派单" : item.status === "待处理" ? "去处理" : "查看详情"}</button></div>
    </article>`).join("") : `<div class="module-empty"><span><i data-lucide="inbox"></i></span><strong>暂无匹配数据</strong><small>调整搜索或筛选条件后重试</small></div>`;
  refreshIcons();
}

function openModule(moduleName, filter = "全部") {
  const meta = moduleCatalog[moduleName];
  if (!meta) return;
  state.currentModule = moduleName;
  state.moduleFilter = meta.filters.includes(filter) ? filter : "全部";
  state.search = "";
  $("#moduleSearch").value = "";
  $("#clearModuleSearch").classList.remove("visible");
  $("#moduleEyebrow").textContent = meta.eyebrow;
  $("#moduleTitle").textContent = meta.title;
  $("#modulePrimaryButton").setAttribute("aria-label", meta.primary);
  $("#moduleView").classList.add("open");
  $("#moduleView").setAttribute("aria-hidden", "false");
  $(".manager-shell").classList.add("subpage-open");
  renderModule();
}

function closeModule() {
  $("#moduleView").classList.remove("open");
  $("#moduleView").setAttribute("aria-hidden", "true");
  $("#managerDetailView").classList.remove("open");
  $("#managerDetailView").setAttribute("aria-hidden", "true");
  $(".manager-shell").classList.remove("subpage-open");
}

function openDetail(item) {
  state.detailItem = item;
  $("#detailTitle").textContent = item.title;
  $("#managerDetailContent").innerHTML = `
    <section class="detail-hero"><span>${h(item.id)}</span><h2>${h(item.title)}</h2><p>${h(item.subtitle)}</p></section>
    <section class="detail-section"><h3>基础信息</h3>${item.fields.map(([label, value]) => `<div class="detail-row"><span>${h(label)}</span><strong>${h(value)}</strong></div>`).join("")}</section>
    <section class="detail-section"><h3>备注</h3><div class="detail-row"><span>业务说明</span><strong>${h(item.note || "暂无备注")}</strong></div><div class="detail-row"><span>当前状态</span><strong>${h(item.status)}</strong></div></section>`;
  $("#managerDetailView").classList.add("open");
  $("#managerDetailView").setAttribute("aria-hidden", "false");
  refreshIcons();
}

function renderMessages() {
  const list = messages.filter((item) => state.messageFilter === "all" || item.type === state.messageFilter);
  $("#messageList").innerHTML = list.map((item) => `<button class="message-item ${item.unread ? "unread" : ""}" data-message-id="${item.id}" type="button"><span class="message-icon ${item.style}"><i data-lucide="${item.icon}"></i></span><span class="message-copy"><strong>${h(item.title)}</strong><p>${h(item.desc)}</p><time>${h(item.time)}</time></span></button>`).join("");
  refreshIcons();
}

function openAutoControl() {
  openModule("auto");
  $("#moduleList").insertAdjacentHTML("afterbegin", `<section class="auto-control"><span><i data-lucide="wand-sparkles"></i></span><div><strong>自动执行中</strong><small>每 10 分钟识别待派单任务</small></div><button data-auto-run type="button">立即执行</button></section>`);
  refreshIcons();
}

$("#managerBottomNav").addEventListener("click", (event) => {
  const button = event.target.closest("[data-view]");
  if (button) switchView(button.dataset.view);
});

document.addEventListener("click", (event) => {
  const moduleButton = event.target.closest("[data-open-module]");
  const tabTarget = event.target.closest("[data-tab-target]");
  const quickAction = event.target.closest("[data-quick-action]");
  const profileAction = event.target.closest("[data-profile-action]");
  if (moduleButton) {
    const name = moduleButton.dataset.openModule;
    if (name === "auto") openAutoControl(); else openModule(name, moduleButton.dataset.filter || "全部");
  }
  if (tabTarget) switchView(tabTarget.dataset.tabTarget);
  if (quickAction) {
    openModule(quickAction.dataset.quickAction);
    showToast(quickAction.dataset.quickAction === "waybill" ? "已进入运单管理，可点击右上角新增" : "已进入派单列表，可点击右上角新增");
  }
  if (profileAction) {
    if (profileAction.dataset.profileAction === "desktop") window.location.href = "index.html";
    else showToast({ profile: "个人资料编辑功能", role: "当前角色：调度管理员", notification: "消息设置已打开", security: "账号安全状态正常", about: "集卡物流管理端 1.0" }[profileAction.dataset.profileAction]);
  }
});

$("#headerMessageButton").addEventListener("click", () => switchView("messages"));
$("#manageModulesButton").addEventListener("click", () => $("#moduleGrid").scrollIntoView({ behavior: "smooth", block: "center" }));
$("#moduleBackButton").addEventListener("click", closeModule);
$("#detailBackButton").addEventListener("click", () => { $("#managerDetailView").classList.remove("open"); $("#managerDetailView").setAttribute("aria-hidden", "true"); });
$("#modulePrimaryButton").addEventListener("click", () => showToast(moduleCatalog[state.currentModule]?.primary || "新增业务"));
$("#detailActionButton").addEventListener("click", () => showToast("更多业务操作"));

$("#moduleSearch").addEventListener("input", (event) => {
  state.search = event.target.value;
  $("#clearModuleSearch").classList.toggle("visible", Boolean(state.search));
  renderModule();
});
$("#clearModuleSearch").addEventListener("click", () => { state.search = ""; $("#moduleSearch").value = ""; $("#clearModuleSearch").classList.remove("visible"); renderModule(); });
$("#moduleFilters").addEventListener("click", (event) => { const button = event.target.closest("[data-module-filter]"); if (!button) return; state.moduleFilter = button.dataset.moduleFilter; renderModule(); });
$("#moduleList").addEventListener("click", (event) => {
  const autoRun = event.target.closest("[data-auto-run]");
  if (autoRun) { showToast("自动派单任务已提交执行"); return; }
  const button = event.target.closest("[data-module-detail]");
  if (!button) return;
  const item = moduleCatalog[state.currentModule].items.find((entry) => entry.id === button.dataset.moduleDetail);
  if (item) openDetail(item);
});

$("#messageTabs").addEventListener("click", (event) => {
  const button = event.target.closest("[data-message-filter]");
  if (!button) return;
  state.messageFilter = button.dataset.messageFilter;
  $$("#messageTabs button").forEach((item) => item.classList.toggle("active", item === button));
  renderMessages();
});
$("#messageList").addEventListener("click", (event) => {
  const button = event.target.closest("[data-message-id]");
  if (!button) return;
  const message = messages.find((item) => item.id === button.dataset.messageId);
  if (!message) return;
  message.unread = false;
  if (message.module === "auto") openAutoControl(); else openModule(message.module);
  renderMessages();
});
$("#readAllButton").addEventListener("click", () => { messages.forEach((item) => { item.unread = false; }); renderMessages(); showToast("消息已全部标记为已读"); });

renderWorkbench();
renderMessages();
refreshIcons();
