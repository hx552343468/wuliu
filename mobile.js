const dispatchSeed = [
  { id: "PD-1001", waybillNo: "WB20260916001", orderDate: "2026-09-16", routeId: "XL-001", routeName: "北仑港至江北仓", origin: "宁波北仑港区二期", destination: "宁波江北物流园", dispatchTime: "2026-09-16 08:35", driverId: "SJ-1001", driverName: "王海", phone: "13800008881", vehicleId: "浙B·K7812", status: "运输中", currentNode: "在途", boxes: "TCLU8374621 / 40HQ", estimatedRevenue: 2860, commission: 420, note: "上午装柜", pushed: true, timeline: [{ node: "已派单", time: "2026-09-16 08:35", desc: "派单已推送至司机微信小程序", photos: [] }, { node: "已提货", time: "2026-09-16 10:12", desc: "司机已完成提货，上传装柜现场照片", photos: ["装柜现场-001.jpg"] }, { node: "在途", time: "2026-09-16 11:05", desc: "车辆驶离装货地，运输中", photos: ["运输途中-001.jpg"] }] },
  { id: "PD-1002", waybillNo: "WB20260916002", orderDate: "2026-09-16", routeId: "XL-002", routeName: "洋山港至昆山保税区", origin: "上海洋山港", destination: "昆山综合保税区", dispatchTime: "2026-09-16 09:10", driverId: "SJ-1002", driverName: "赵亮", phone: "13900006662", vehicleId: "沪D·A9021", status: "已派单", currentNode: "待提货", boxes: "MSKU4920183 / MSKU4920184", estimatedRevenue: 3520, commission: 563.2, note: "双拖作业，按现场指引进港", pushed: true, timeline: [{ node: "已派单", time: "2026-09-16 09:10", desc: "派单已推送至司机微信小程序", photos: [] }] },
  { id: "PD-1003", waybillNo: "WB20260916003", orderDate: "2026-09-15", routeId: "XL-003", routeName: "萧山仓至梅山码头", origin: "杭州萧山仓", destination: "宁波梅山码头", dispatchTime: "2026-09-15 16:40", driverId: "SJ-1004", driverName: "陈涛", phone: "13600002228", vehicleId: "浙A·F2190", status: "已完成", currentNode: "已送达", boxes: "CMAU6502739 / 40GP", estimatedRevenue: 2550, commission: 350, note: "夜间进港", pushed: true, timeline: [{ node: "已派单", time: "2026-09-15 16:40", desc: "派单已推送至司机微信小程序", photos: [] }, { node: "已提货", time: "2026-09-15 18:22", desc: "完成提货", photos: ["提货现场-003.jpg"] }, { node: "已送达", time: "2026-09-16 06:55", desc: "货柜已送达梅山码头", photos: ["送达凭证-003.jpg"] }] },
  { id: "PD-1004", waybillNo: "WB20260916004", orderDate: "2026-09-14", routeId: "XL-004", routeName: "苏州园区至外高桥", origin: "苏州工业园区", destination: "上海外高桥五期", dispatchTime: "2026-09-14 14:20", driverId: "SJ-1003", driverName: "刘军", phone: "13700003335", vehicleId: "苏E·T5568", status: "取消", currentNode: "待派单", boxes: "OOLU3087642 / 20GP", estimatedRevenue: 1980, commission: 297, note: "线路价格调整，原派单取消", pushed: true, timeline: [{ node: "已派单", time: "2026-09-14 14:20", desc: "派单已推送至司机微信小程序", photos: [] }, { node: "取消", time: "2026-09-14 15:05", desc: "未开始提货，后台撤销派单", photos: [] }] },
  { id: "PD-1005", waybillNo: "WB20260916005", orderDate: "2026-09-16", routeId: "XL-001", routeName: "北仑港至江北仓", origin: "宁波北仑港区二期", destination: "宁波江北物流园", dispatchTime: "", driverId: "", driverName: "待分配", phone: "-", vehicleId: "", status: "待派单", currentNode: "待派单", boxes: "待装箱", estimatedRevenue: 2860, commission: 420, note: "等待调度", pushed: false, timeline: [] },
];

const drivers = {
  "SJ-1001": { id: "SJ-1001", name: "王海", phone: "13800008881", type: "自有司机", fleet: "宁波一队", licenseClass: "A2", licenseExpiry: "2028-03-12", qualificationExpiry: "2027-08-20" },
  "SJ-1002": { id: "SJ-1002", name: "赵亮", phone: "13900006662", type: "外协司机", fleet: "临港协作车队", licenseClass: "A2", licenseExpiry: "2027-11-06", qualificationExpiry: "2027-05-18" },
  "SJ-1003": { id: "SJ-1003", name: "刘军", phone: "13700003335", type: "自有司机", fleet: "苏州二队", licenseClass: "A2", licenseExpiry: "2026-10-06", qualificationExpiry: "2026-09-28" },
  "SJ-1004": { id: "SJ-1004", name: "陈涛", phone: "13600002228", type: "外协司机", fleet: "杭州协作车队", licenseClass: "A2", licenseExpiry: "2029-02-15", qualificationExpiry: "2028-01-22" },
};

const vehicles = {
  "浙B·K7812": { type: "集装箱牵引车", fleet: "宁波港区集卡车队", state: "在用" },
  "沪D·A9021": { type: "重型半挂牵引车", fleet: "临港外协集卡车队", state: "在用" },
  "苏E·T5568": { type: "集装箱骨架车", fleet: "苏州园区集卡车队", state: "停用" },
  "浙A·F2190": { type: "危险品牵引车", fleet: "杭州危险品运输车队", state: "在用" },
};

const waybillMeta = {
  WB20260916001: { customer: "宁波海拓供应链有限公司", billNo: "BL-NB-26091601", containerType: "40HQ", sealNo: "SEAL831942", loadAddress: "宁波市北仑区港兴路 88 号" },
  WB20260916002: { customer: "上海临港国际物流有限公司", billNo: "BL-SH-26091622", containerType: "双拖", sealNo: "SEAL440182 / SEAL440183", loadAddress: "上海洋山深水港四期码头" },
  WB20260916003: { customer: "杭州华远进出口有限公司", billNo: "BL-HZ-26091508", containerType: "40GP", sealNo: "SEAL650273", loadAddress: "杭州市萧山区临浦物流园 6 号库" },
  WB20260916004: { customer: "苏州园区保税物流中心", billNo: "BL-SZ-26091411", containerType: "20GP", sealNo: "SEAL308764", loadAddress: "苏州工业园区现代大道 168 号" },
};

const state = {
  dispatches: window.DispatchStore.load(dispatchSeed),
  currentDriverId: localStorage.getItem("mobile-demo-driver") || "SJ-1002",
  taskFilter: "pending",
  orderFilter: "all",
  orderSearch: "",
  activeDispatchId: "",
  incomeVisible: false,
};

const elements = {
  header: document.querySelector("#mobileHeader"),
  title: document.querySelector("#mobileTitle"),
  tasksView: document.querySelector("#tasksView"),
  ordersView: document.querySelector("#ordersView"),
  profileView: document.querySelector("#profileView"),
  bottomNav: document.querySelector("#bottomNav"),
  taskList: document.querySelector("#taskList"),
  orderList: document.querySelector("#orderList"),
  detailView: document.querySelector("#detailView"),
  detailContent: document.querySelector("#detailContent"),
  detailActionBar: document.querySelector("#detailActionBar"),
  rejectDialog: document.querySelector("#rejectDialog"),
  progressDialog: document.querySelector("#progressDialog"),
  driverDialog: document.querySelector("#driverDialog"),
  toast: document.querySelector("#toast"),
};

function h(value) {
  return String(value ?? "").replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);
}

function money(value) {
  return `¥${Number(value || 0).toLocaleString("zh-CN", { minimumFractionDigits: Number(value) % 1 ? 1 : 0, maximumFractionDigits: 1 })}`;
}

function maskPhone(phone) {
  return String(phone).replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
}

function currentDriver() {
  return drivers[state.currentDriverId] || drivers["SJ-1002"];
}

function driverDispatches() {
  return state.dispatches.filter((item) => item.driverId === state.currentDriverId);
}

function dispatchCategory(dispatch) {
  if (dispatch.status === "已派单") return "pending";
  if (dispatch.status === "运输中") return "active";
  if (dispatch.status === "已完成") return "completed";
  return "cancelled";
}

function statusLabel(dispatch) {
  if (dispatch.status === "运输中") return dispatch.currentNode || "运输中";
  if (dispatch.status === "取消" && dispatch.currentNode === "已拒绝") return "已拒绝";
  return dispatch.status;
}

function statusDescription(dispatch) {
  const descriptions = {
    已派单: "调度已派单，请及时确认任务",
    已接单: "已确认接单，请前往提货地点",
    待提货: "请前往提货地点并按要求装柜",
    已提货: "货物已提取，请确认发车",
    在途: "运输进行中，请注意行车安全",
    已送达: "本次运输任务已顺利完成",
    已拒绝: "已将拒单原因同步给调度员",
    待派单: "派单已被取消",
  };
  return descriptions[dispatch.currentNode] || descriptions[dispatch.status] || "任务状态已同步";
}

function taskCard(dispatch) {
  const category = dispatchCategory(dispatch);
  return `
    <article class="task-card" data-dispatch-card="${h(dispatch.id)}">
      <div class="task-card-header">
        <span class="task-number">运单<strong>${h(dispatch.waybillNo)}</strong></span>
        <span class="status-badge ${category}">${h(statusLabel(dispatch))}</span>
      </div>
      <div class="route-block">
        <div class="route-track"><i class="route-dot"></i><i class="route-dot end"></i></div>
        <div class="route-points">
          <div class="route-point"><span>起运地</span><strong>${h(dispatch.origin)}</strong></div>
          <div class="route-point"><span>目的地</span><strong>${h(dispatch.destination)}</strong></div>
        </div>
      </div>
      <div class="task-meta">
        <span class="meta-chip">车 ${h(dispatch.vehicleId || "待分配")}</span>
        <span class="meta-chip">箱 ${h(dispatch.boxes)}</span>
        <span class="meta-chip commission-chip">提成 ${money(dispatch.commission)}</span>
      </div>
      ${dispatch.note ? `<p class="task-note">调度备注：${h(dispatch.note)}</p>` : ""}
      <div class="task-card-actions">
        <button class="card-button" data-action="detail" data-id="${h(dispatch.id)}" type="button">查看详情</button>
        ${category === "pending" ? `<button class="card-button primary" data-action="accept" data-id="${h(dispatch.id)}" type="button">立即接单</button>` : ""}
        ${category === "active" ? `<button class="card-button soft" data-action="progress" data-id="${h(dispatch.id)}" type="button">更新进度</button>` : ""}
      </div>
    </article>`;
}

function emptyState(title, description) {
  return `<div class="empty-state"><div class="empty-illustration">✓</div><strong>${h(title)}</strong><p>${h(description)}</p></div>`;
}

function renderOverview() {
  const mine = driverDispatches();
  const pending = mine.filter((item) => dispatchCategory(item) === "pending").length;
  const active = mine.filter((item) => dispatchCategory(item) === "active").length;
  const completed = mine.filter((item) => dispatchCategory(item) === "completed").length;
  document.querySelector("#taskOverview").innerHTML = `
    <div class="overview-item"><strong>${pending}</strong><span>待接单</span></div>
    <div class="overview-item"><strong>${active}</strong><span>进行中</span></div>
    <div class="overview-item"><strong>${completed}</strong><span>已完成</span></div>`;
  document.querySelector("#pendingCount").textContent = pending;
  document.querySelector("#activeCount").textContent = active;
  document.querySelector("#welcomeName").textContent = `${currentDriver().name.slice(0, 1)}师傅`;
}

function renderTasks() {
  renderOverview();
  const rows = driverDispatches().filter((item) => state.taskFilter === "all" || dispatchCategory(item) === state.taskFilter);
  elements.taskList.innerHTML = rows.length ? rows.map(taskCard).join("") : emptyState("当前没有相关任务", "新派单到达后会在这里显示");
  document.querySelector("#taskSummary").textContent = `共 ${driverDispatches().length} 条任务，状态已与调度后台同步`;
}

function orderCard(dispatch) {
  const category = dispatchCategory(dispatch);
  return `
    <article class="order-card" data-action="detail" data-id="${h(dispatch.id)}">
      <div class="order-card-top"><strong>${h(dispatch.waybillNo)}</strong><span class="status-badge ${category}">${h(statusLabel(dispatch))}</span></div>
      <div class="order-route">${h(dispatch.origin)}<span>→</span>${h(dispatch.destination)}</div>
      <div class="order-info"><span>派单时间　<b>${h(dispatch.dispatchTime || "-")}</b></span><span>车辆　<b>${h(dispatch.vehicleId || "-")}</b></span><span>箱信息　<b>${h(dispatch.boxes)}</b></span><span>司机提成　<b>${money(dispatch.commission)}</b></span></div>
    </article>`;
}

function renderOrders() {
  const keyword = state.orderSearch.toLowerCase();
  const rows = driverDispatches().filter((item) => {
    const matchedStatus = state.orderFilter === "all" || dispatchCategory(item) === state.orderFilter;
    const searchText = `${item.waybillNo} ${item.routeName} ${item.boxes} ${item.origin} ${item.destination}`.toLowerCase();
    return matchedStatus && searchText.includes(keyword);
  });
  elements.orderList.innerHTML = rows.length ? rows.map(orderCard).join("") : emptyState("没有找到运单", "请调整状态筛选或搜索关键词");
}

function daysUntil(dateText) {
  const today = new Date();
  const date = new Date(`${dateText}T00:00:00`);
  return Math.ceil((date - today) / 86400000);
}

function renderProfile() {
  const driver = currentDriver();
  const mine = driverDispatches();
  const completed = mine.filter((item) => item.status === "已完成");
  const current = mine.find((item) => item.status === "运输中") || mine.find((item) => item.status === "已派单") || mine[0];
  const plateNo = current?.vehicleId || "暂未分配";
  const vehicle = vehicles[plateNo];
  const income = completed.reduce((sum, item) => sum + Number(item.commission || 0), 0);
  document.querySelector("#profileAvatar").textContent = driver.name.slice(0, 1);
  document.querySelector("#profileName").textContent = driver.name;
  document.querySelector("#profileMeta").textContent = `${driver.type} · ${driver.fleet}`;
  document.querySelector("#profilePhone").textContent = maskPhone(driver.phone);
  document.querySelector("#incomeAmount").textContent = state.incomeVisible ? money(income) : "¥ ****";
  document.querySelector("#toggleIncomeButton").textContent = state.incomeVisible ? "隐藏" : "显示";
  document.querySelector("#profileStats").innerHTML = `
    <div class="income-stat"><strong>${mine.length}</strong><span>累计任务</span></div>
    <div class="income-stat"><strong>${completed.length}</strong><span>完成运单</span></div>
    <div class="income-stat"><strong>${mine.filter((item) => item.status === "运输中").length}</strong><span>进行中</span></div>`;
  document.querySelector("#profileVehicle").innerHTML = vehicle
    ? `<div class="vehicle-icon">车</div><div class="vehicle-copy"><strong>${h(plateNo)}</strong><span>${h(vehicle.type)} · ${h(vehicle.fleet)}</span></div><span class="vehicle-state">${h(vehicle.state)}</span>`
    : `<div class="vehicle-icon">车</div><div class="vehicle-copy"><strong>暂未分配车辆</strong><span>接单后由调度分配</span></div>`;

  const docs = [
    { name: `驾驶证（${driver.licenseClass}）`, date: driver.licenseExpiry },
    { name: "道路运输从业资格证", date: driver.qualificationExpiry },
  ];
  document.querySelector("#documentList").innerHTML = docs.map((doc) => {
    const remaining = daysUntil(doc.date);
    const warning = remaining <= 30;
    return `<div class="document-item"><span class="doc-icon">证件</span><div class="doc-copy"><strong>${h(doc.name)}</strong><span>有效期至 ${h(doc.date)}</span></div><span class="doc-status ${warning ? "warning" : ""}">${warning ? `${remaining}天到期` : "有效"}</span></div>`;
  }).join("");
}

function progressIndex(dispatch) {
  const indexMap = { 已派单: 0, 待提货: 0, 已接单: 1, 已提货: 2, 在途: 3, 已送达: 4 };
  return indexMap[dispatch.currentNode] ?? (dispatch.status === "已完成" ? 4 : 0);
}

function renderDetail() {
  const dispatch = state.dispatches.find((item) => item.id === state.activeDispatchId);
  if (!dispatch) return closeDetail();
  const meta = waybillMeta[dispatch.waybillNo] || {};
  const category = dispatchCategory(dispatch);
  const steps = ["已派单", "已接单", "已提货", "在途", "已送达"];
  const currentIndex = progressIndex(dispatch);
  const progress = steps.map((step, index) => `<div class="progress-step ${index < currentIndex ? "done" : ""} ${index === currentIndex ? "current" : ""}"><i></i><span>${step}</span></div>`).join("");
  const timeline = [...(dispatch.timeline || [])].reverse().map((item) => `
    <div class="timeline-row"><time>${h(item.time.split(" ")[1] || item.time)}<br>${h(item.time.split(" ")[0] || "")}</time><span class="timeline-axis"><i></i></span><div class="timeline-copy"><strong>${h(item.node)}</strong><p>${h(item.desc)}</p>${item.photos?.length ? `<div class="photo-tags">${item.photos.map((photo) => `<span>${h(photo)}</span>`).join("")}</div>` : ""}</div></div>`).join("");
  elements.detailContent.innerHTML = `
    <section class="detail-status-card"><div class="detail-status-top"><span>${h(dispatch.waybillNo)}</span><strong>${h(statusLabel(dispatch))}</strong></div><h2>${h(statusDescription(dispatch))}</h2><p>派单时间 ${h(dispatch.dispatchTime || "-")}</p></section>
    <section class="detail-route-card"><div class="detail-route-title"><strong>${h(dispatch.routeName)}</strong><span>${h(dispatch.vehicleId || "待分配")}</span></div><div class="route-block"><div class="route-track"><i class="route-dot"></i><i class="route-dot end"></i></div><div class="route-points"><div class="route-point"><span>起运地</span><strong>${h(dispatch.origin)}</strong></div><div class="route-point"><span>目的地</span><strong>${h(dispatch.destination)}</strong></div></div></div><div class="address-action"><button data-detail-action="navigate" type="button">导航至目的地</button><a href="tel:4008006688">联系调度</a></div></section>
    <section class="detail-card"><strong class="detail-card-title">运输进度</strong><div class="progress-track">${progress}</div></section>
    <section class="detail-card"><strong class="detail-card-title">运单信息</strong><div class="detail-grid"><div class="detail-field"><span>客户名称</span><strong>${h(meta.customer || "待补充")}</strong></div><div class="detail-field"><span>提单号</span><strong>${h(meta.billNo || "-")}</strong></div><div class="detail-field"><span>箱信息</span><strong>${h(dispatch.boxes)}</strong></div><div class="detail-field"><span>封号</span><strong>${h(meta.sealNo || "-")}</strong></div><div class="detail-field"><span>车辆</span><strong>${h(dispatch.vehicleId || "待分配")}</strong></div><div class="detail-field"><span>司机提成</span><strong>${money(dispatch.commission)}</strong></div><div class="detail-field full"><span>装卸地址</span><strong>${h(dispatch.loadAddress || meta.loadAddress || dispatch.origin)}</strong></div><div class="detail-field full"><span>调度备注</span><strong>${h(dispatch.note || "无")}</strong></div>${dispatch.rejectionReason ? `<div class="detail-field full"><span>拒单原因</span><strong>${h(dispatch.rejectionReason)}</strong></div>` : ""}</div></section>
    <section class="detail-card"><strong class="detail-card-title">节点记录</strong><div class="timeline-list">${timeline || `<div class="empty-state"><p>暂无节点记录</p></div>`}</div></section>`;

  if (category === "pending") {
    elements.detailActionBar.innerHTML = `<button class="danger" data-detail-action="reject" type="button">拒绝</button><button class="primary" data-detail-action="accept" type="button">确认接单</button>`;
  } else if (category === "active") {
    elements.detailActionBar.innerHTML = `<button data-detail-action="contact" type="button">联系调度</button><button class="primary" data-detail-action="progress" type="button">更新运输进度</button>`;
  } else {
    elements.detailActionBar.innerHTML = `<button data-detail-action="copy" type="button">复制运单号</button><button class="primary" data-detail-action="back" type="button">返回任务列表</button>`;
  }
}

function renderDriverOptions() {
  document.querySelector("#driverOptions").innerHTML = Object.values(drivers).map((driver) => `
    <button class="driver-option ${driver.id === state.currentDriverId ? "active" : ""}" data-driver-id="${driver.id}" type="button"><span class="avatar-mini">${h(driver.name.slice(0, 1))}</span><span><strong>${h(driver.name)}</strong><small>${h(driver.type)} · ${h(driver.fleet)}</small></span>${driver.id === state.currentDriverId ? "<em>当前</em>" : ""}</button>`).join("");
}

function renderAll() {
  renderTasks();
  renderOrders();
  renderProfile();
  if (elements.detailView.classList.contains("open")) renderDetail();
}

function switchView(viewName) {
  const target = document.querySelector(`#${viewName}View`);
  if (!target) return;
  document.querySelectorAll(".mobile-view").forEach((view) => view.classList.toggle("active", view === target));
  elements.bottomNav.querySelectorAll("button").forEach((button) => button.classList.toggle("active", button.dataset.view === viewName));
  elements.title.textContent = target.dataset.title;
  target.scrollTo({ top: 0, behavior: "smooth" });
  if (viewName === "profile") renderProfile();
}

function openDetail(dispatchId) {
  state.activeDispatchId = dispatchId;
  renderDetail();
  elements.detailView.classList.add("open");
  document.querySelector(".phone-shell").classList.add("detail-open");
  elements.detailView.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeDetail() {
  elements.detailView.classList.remove("open");
  document.querySelector(".phone-shell").classList.remove("detail-open");
  elements.detailView.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  state.activeDispatchId = "";
}

let toastTimer;
function showToast(message) {
  clearTimeout(toastTimer);
  elements.toast.textContent = message;
  elements.toast.classList.add("show");
  toastTimer = setTimeout(() => elements.toast.classList.remove("show"), 2200);
}

function persist(message) {
  window.DispatchStore.save(state.dispatches);
  if (window.opener && !window.opener.closed) {
    window.opener.postMessage({ type: "dispatch-update", dispatches: state.dispatches }, "*");
  }
  renderAll();
  if (message) showToast(message);
}

function acceptDispatch(dispatchId) {
  const dispatch = state.dispatches.find((item) => item.id === dispatchId);
  if (!dispatch || dispatch.status !== "已派单") return;
  dispatch.status = "运输中";
  dispatch.currentNode = "已接单";
  dispatch.acceptedAt = window.DispatchStore.nowText();
  dispatch.timeline = dispatch.timeline || [];
  dispatch.timeline.push({ node: "已接单", time: dispatch.acceptedAt, desc: "司机已确认接单，任务开始执行", photos: [] });
  state.taskFilter = "active";
  document.querySelectorAll("#taskFilters .filter-chip").forEach((button) => button.classList.toggle("active", button.dataset.filter === "active"));
  persist("接单成功，已同步至调度后台");
}

function openReject(dispatchId) {
  state.activeDispatchId = dispatchId;
  document.querySelector("#rejectForm").reset();
  elements.rejectDialog.showModal();
}

function nextNode(dispatch) {
  return ({ 已接单: "已提货", 待提货: "已提货", 已提货: "在途", 在途: "已送达" })[dispatch.currentNode] || "已提货";
}

function openProgress(dispatchId) {
  const dispatch = state.dispatches.find((item) => item.id === dispatchId);
  if (!dispatch || dispatch.status !== "运输中") return;
  state.activeDispatchId = dispatchId;
  document.querySelector("#progressForm").reset();
  document.querySelector("#uploadHint").textContent = "支持从相册选择或拍照";
  document.querySelector("#nextNodeText").textContent = nextNode(dispatch);
  elements.progressDialog.showModal();
}

function syncFromStore() {
  state.dispatches = window.DispatchStore.load(dispatchSeed);
  renderAll();
}

elements.bottomNav.addEventListener("click", (event) => {
  const button = event.target.closest("[data-view]");
  if (button) switchView(button.dataset.view);
});

document.querySelector("#taskFilters").addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  state.taskFilter = button.dataset.filter;
  document.querySelectorAll("#taskFilters .filter-chip").forEach((item) => item.classList.toggle("active", item === button));
  renderTasks();
});

function handleDispatchAction(event) {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const { action, id } = button.dataset;
  if (action === "detail") openDetail(id);
  if (action === "accept") { acceptDispatch(id); openDetail(id); }
  if (action === "progress") openProgress(id);
}

elements.taskList.addEventListener("click", handleDispatchAction);
elements.orderList.addEventListener("click", handleDispatchAction);

document.querySelector("#orderStatusTabs").addEventListener("click", (event) => {
  const button = event.target.closest("[data-status]");
  if (!button) return;
  state.orderFilter = button.dataset.status;
  document.querySelectorAll("#orderStatusTabs button").forEach((item) => item.classList.toggle("active", item === button));
  renderOrders();
});

document.querySelector("#orderSearch").addEventListener("input", (event) => {
  state.orderSearch = event.target.value.trim();
  renderOrders();
});

document.querySelector("#refreshTasksButton").addEventListener("click", () => {
  syncFromStore();
  showToast("任务状态已刷新");
});

document.querySelector("#backFromDetail").addEventListener("click", closeDetail);
document.querySelector("#detailMoreButton").addEventListener("click", () => showToast("运单信息已是最新状态"));

elements.detailActionBar.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-detail-action]");
  if (!button) return;
  const action = button.dataset.detailAction;
  const id = state.activeDispatchId;
  const dispatch = state.dispatches.find((item) => item.id === id);
  if (action === "accept") { acceptDispatch(id); renderDetail(); }
  if (action === "reject") openReject(id);
  if (action === "progress") openProgress(id);
  if (action === "contact") showToast("调度中心电话：400-800-6688");
  if (action === "back") { closeDetail(); switchView("tasks"); }
  if (action === "copy" && dispatch) {
    try { await navigator.clipboard.writeText(dispatch.waybillNo); showToast("运单号已复制"); }
    catch { showToast(`运单号：${dispatch.waybillNo}`); }
  }
});

elements.detailContent.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-detail-action='navigate']");
  if (!button) return;
  const dispatch = state.dispatches.find((item) => item.id === state.activeDispatchId);
  if (!dispatch) return;
  try { await navigator.clipboard.writeText(dispatch.destination); showToast("目的地已复制，可粘贴到导航软件"); }
  catch { showToast(`目的地：${dispatch.destination}`); }
});

document.querySelector("#rejectForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const dispatch = state.dispatches.find((item) => item.id === state.activeDispatchId);
  if (!dispatch) return;
  const formData = new FormData(event.currentTarget);
  const reason = formData.get("reason");
  if (!reason) return;
  const remark = String(formData.get("remark") || "").trim();
  dispatch.status = "取消";
  dispatch.currentNode = "已拒绝";
  dispatch.rejectionReason = remark ? `${reason}：${remark}` : reason;
  dispatch.timeline = dispatch.timeline || [];
  dispatch.timeline.push({ node: "已拒绝", time: window.DispatchStore.nowText(), desc: `司机拒绝派单，原因：${dispatch.rejectionReason}`, photos: [] });
  elements.rejectDialog.close();
  persist("已将拒单原因同步给调度员");
  renderDetail();
});

document.querySelector("#progressForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const dispatch = state.dispatches.find((item) => item.id === state.activeDispatchId);
  if (!dispatch) return;
  const formData = new FormData(event.currentTarget);
  const node = nextNode(dispatch);
  const remark = String(formData.get("remark") || "").trim();
  const files = [...event.currentTarget.elements.photos.files].map((file) => file.name);
  dispatch.currentNode = node;
  if (node === "已送达") dispatch.status = "已完成";
  dispatch.timeline = dispatch.timeline || [];
  dispatch.timeline.push({ node, time: window.DispatchStore.nowText(), desc: remark || ({ 已提货: "司机已完成提货", 在途: "车辆已发车，运输途中", 已送达: "货物已安全送达目的地" })[node], photos: files });
  elements.progressDialog.close();
  persist(node === "已送达" ? "任务已完成，状态已同步" : `已上报“${node}”节点`);
  renderDetail();
});

document.querySelector("#progressForm input[type='file']").addEventListener("change", (event) => {
  const count = event.target.files.length;
  document.querySelector("#uploadHint").textContent = count ? `已选择 ${count} 张照片` : "支持从相册选择或拍照";
});

document.querySelectorAll(".bottom-sheet .sheet-close").forEach((button) => {
  button.addEventListener("click", () => button.closest("dialog").close());
});

document.querySelector("#switchDriverButton").addEventListener("click", () => {
  renderDriverOptions();
  elements.driverDialog.showModal();
});

document.querySelector("#driverOptions").addEventListener("click", (event) => {
  const button = event.target.closest("[data-driver-id]");
  if (!button) return;
  state.currentDriverId = button.dataset.driverId;
  localStorage.setItem("mobile-demo-driver", state.currentDriverId);
  state.taskFilter = "all";
  document.querySelectorAll("#taskFilters .filter-chip").forEach((item) => item.classList.toggle("active", item.dataset.filter === "all"));
  elements.driverDialog.close();
  renderAll();
  showToast(`已切换为 ${currentDriver().name}`);
});

document.querySelector("#toggleIncomeButton").addEventListener("click", () => {
  state.incomeVisible = !state.incomeVisible;
  renderProfile();
});

document.querySelector("#notificationButton").addEventListener("click", () => {
  showToast("您有 1 条新派单和 1 条证件提醒");
  document.querySelector(".notification-dot").style.display = "none";
});

document.querySelector(".menu-card").addEventListener("click", (event) => {
  const button = event.target.closest("[data-menu-action]");
  if (!button) return;
  const messages = { messages: "暂无更多未读消息", service: "调度中心电话：400-800-6688", settings: "设置功能将在正式版开放" };
  showToast(messages[button.dataset.menuAction]);
});

window.addEventListener("storage", (event) => {
  if (event.key === window.DispatchStore.STORAGE_KEY) syncFromStore();
});

window.addEventListener("message", (event) => {
  const message = event.data;
  if (message?.type !== "dispatch-sync-data" || !Array.isArray(message.dispatches)) return;
  state.dispatches = message.dispatches;
  window.DispatchStore.save(state.dispatches);
  renderAll();
});

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") syncFromStore();
});

const currentDate = new Date();
document.querySelector("#todayText").textContent = `${currentDate.getMonth() + 1}月${currentDate.getDate()}日 · ${["周日", "周一", "周二", "周三", "周四", "周五", "周六"][currentDate.getDay()]}`;
renderAll();
if (window.opener && !window.opener.closed) {
  window.opener.postMessage({ type: "dispatch-sync-request" }, "*");
}
