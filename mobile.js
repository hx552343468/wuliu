const dispatchSeed = [
  { id: "PD-1001", waybillNo: "WB20260916001", orderDate: "2026-09-16", routeId: "XL-001", routeName: "北仑港至江北仓", origin: "宁波北仑港区二期", destination: "宁波江北物流园", dispatchTime: "2026-09-16 08:35", driverId: "SJ-1001", driverName: "王海", phone: "13800008881", vehicleId: "浙B·K7812", status: "运输中", currentNode: "在途", boxes: "TCLU8374621 / 40HQ", estimatedRevenue: 2860, commission: 420, note: "上午装柜", pushed: true, timeline: [{ node: "已派单", time: "2026-09-16 08:35", desc: "派单已推送至司机微信小程序", photos: [] }, { node: "已提货", time: "2026-09-16 10:12", desc: "司机已完成提货，上传装柜现场照片", photos: ["装柜现场-001.jpg"] }, { node: "在途", time: "2026-09-16 11:05", desc: "车辆驶离装货地，运输中", photos: ["运输途中-001.jpg"] }] },
  { id: "PD-1002", waybillNo: "WB20260916002", orderDate: "2026-09-16", routeId: "XL-002", routeName: "洋山港至昆山保税区", origin: "上海洋山港", destination: "昆山综合保税区", dispatchTime: "2026-09-16 09:10", driverId: "SJ-1002", driverName: "赵亮", phone: "13900006662", vehicleId: "沪D·A9021", status: "已派单", currentNode: "待提货", boxes: "MSKU4920183 / MSKU4920184", estimatedRevenue: 3520, commission: 563.2, note: "双拖作业，按现场指引进港", pushed: true, timeline: [{ node: "已派单", time: "2026-09-16 09:10", desc: "派单已推送至司机微信小程序", photos: [] }] },
  { id: "PD-1003", waybillNo: "WB20260916003", orderDate: "2026-09-15", routeId: "XL-003", routeName: "萧山仓至梅山码头", origin: "杭州萧山仓", destination: "宁波梅山码头", dispatchTime: "2026-09-15 16:40", driverId: "SJ-1004", driverName: "陈涛", phone: "13600002228", vehicleId: "浙A·F2190", status: "已完成", currentNode: "已送达", boxes: "CMAU6502739 / 40GP", estimatedRevenue: 2550, commission: 350, note: "夜间进港", pushed: true, timeline: [{ node: "已派单", time: "2026-09-15 16:40", desc: "派单已推送至司机微信小程序", photos: [] }, { node: "已提货", time: "2026-09-15 18:22", desc: "完成提货", photos: ["提货现场-003.jpg"] }, { node: "已送达", time: "2026-09-16 06:55", desc: "货柜已送达梅山码头", photos: ["送达凭证-003.jpg"] }] },
  { id: "PD-1004", waybillNo: "WB20260916004", orderDate: "2026-09-14", routeId: "XL-004", routeName: "苏州园区至外高桥", origin: "苏州工业园区", destination: "上海外高桥五期", dispatchTime: "2026-09-14 14:20", driverId: "SJ-1003", driverName: "刘军", phone: "13700003335", vehicleId: "苏E·T5568", status: "取消", currentNode: "待派单", boxes: "OOLU3087642 / 20GP", estimatedRevenue: 1980, commission: 297, note: "线路价格调整，原派单取消", pushed: true, timeline: [{ node: "已派单", time: "2026-09-14 14:20", desc: "派单已推送至司机微信小程序", photos: [] }, { node: "取消", time: "2026-09-14 15:05", desc: "未开始提货，后台撤销派单", photos: [] }] },
  { id: "PD-1005", waybillNo: "WB20260916005", orderDate: "2026-09-16", routeId: "XL-001", routeName: "北仑港至江北仓", origin: "宁波北仑港区二期", destination: "宁波江北物流园", dispatchTime: "", driverId: "", driverName: "待分配", phone: "-", vehicleId: "", status: "待派单", currentNode: "待派单", boxes: "待装箱", estimatedRevenue: 2860, commission: 420, note: "等待调度", pushed: false, timeline: [] },
  { id: "PD-1006", waybillNo: "WB20260921006", orderDate: "2026-09-21", routeId: "XL-005", routeName: "外高桥至太仓港", origin: "上海外高桥港区六期", destination: "太仓港综合保税区", dispatchTime: "2026-09-21 07:45", driverId: "SJ-1002", driverName: "赵亮", phone: "13900006662", vehicleId: "沪D·A9021", status: "已派单", currentNode: "待提货", boxes: "TEMU7631058 / 40HQ", estimatedRevenue: 3180, commission: 480, note: "10:30 前完成提箱，进港需提前预约", pushed: true, timeline: [{ node: "已派单", time: "2026-09-21 07:45", desc: "派单已推送至司机微信小程序", photos: [] }] },
  { id: "PD-1007", waybillNo: "WB20260921007", orderDate: "2026-09-21", routeId: "XL-006", routeName: "临港新片区至洋山港", origin: "上海临港新片区物流园", destination: "洋山深水港四期码头", dispatchTime: "2026-09-21 08:20", driverId: "SJ-1002", driverName: "赵亮", phone: "13900006662", vehicleId: "沪D·A9021", status: "已派单", currentNode: "待提货", boxes: "FSCU9214670 / 20GP", estimatedRevenue: 2260, commission: 360, note: "重箱进港，请核对封号后发车", pushed: true, timeline: [{ node: "已派单", time: "2026-09-21 08:20", desc: "派单已推送至司机微信小程序", photos: [] }] },
  { id: "PD-1008", waybillNo: "WB20260920008", orderDate: "2026-09-20", routeId: "XL-007", routeName: "芦潮港至嘉兴综保区", origin: "上海芦潮港集装箱中心", destination: "嘉兴综合保税区", dispatchTime: "2026-09-20 13:30", driverId: "SJ-1002", driverName: "赵亮", phone: "13900006662", vehicleId: "沪D·A9021", status: "运输中", currentNode: "在途", boxes: "CAIU8172054 / 40HQ", estimatedRevenue: 2980, commission: 450, note: "预计 17:30 前送达", pushed: true, acceptedAt: "2026-09-20 13:42", timeline: [{ node: "已派单", time: "2026-09-20 13:30", desc: "派单已推送至司机微信小程序", photos: [] }, { node: "已接单", time: "2026-09-20 13:42", desc: "司机已确认接单", photos: [] }, { node: "已提货", time: "2026-09-20 14:25", desc: "已完成提货并核对箱封", photos: ["提货现场-008.jpg"] }, { node: "在途", time: "2026-09-20 14:48", desc: "车辆已发车，运输途中", photos: [] }] },
  { id: "PD-1009", waybillNo: "WB20260919009", orderDate: "2026-09-19", routeId: "XL-008", routeName: "洋山港至松江仓", origin: "洋山深水港三期码头", destination: "上海松江出口加工区", dispatchTime: "2026-09-19 08:10", driverId: "SJ-1002", driverName: "赵亮", phone: "13900006662", vehicleId: "沪D·A9021", status: "已完成", currentNode: "已送达", boxes: "TRHU6721843 / 20GP", estimatedRevenue: 2450, commission: 380, note: "凭预约号入仓", pushed: true, acceptedAt: "2026-09-19 08:16", timeline: [{ node: "已派单", time: "2026-09-19 08:10", desc: "派单已推送至司机微信小程序", photos: [] }, { node: "已接单", time: "2026-09-19 08:16", desc: "司机已确认接单", photos: [] }, { node: "已提货", time: "2026-09-19 09:02", desc: "已完成提货", photos: ["提货现场-009.jpg"] }, { node: "已送达", time: "2026-09-19 11:46", desc: "货物已安全送达目的地", photos: ["送达凭证-009.jpg"] }] },
  { id: "PD-1010", waybillNo: "WB20260918010", orderDate: "2026-09-18", routeId: "XL-009", routeName: "外高桥至昆山陆家仓", origin: "上海外高桥港区五期", destination: "昆山陆家物流园", dispatchTime: "2026-09-18 15:20", driverId: "SJ-1002", driverName: "赵亮", phone: "13900006662", vehicleId: "沪D·A9021", status: "取消", currentNode: "取消", boxes: "GESU5091872 / 40GP", estimatedRevenue: 2760, commission: 410, note: "客户调整装货计划，调度取消", pushed: true, acceptedAt: "2026-09-18 15:28", timeline: [{ node: "已派单", time: "2026-09-18 15:20", desc: "派单已推送至司机微信小程序", photos: [] }, { node: "已接单", time: "2026-09-18 15:28", desc: "司机已确认接单", photos: [] }, { node: "取消", time: "2026-09-18 15:50", desc: "客户调整计划，调度取消运单", photos: [] }] },
];

const drivers = {
  "SJ-1001": { id: "SJ-1001", name: "王海", phone: "13800008881", idCard: "330206198805182418", licenseNo: "330206198805182418", qualificationNo: "330206002891", type: "自有司机", fleet: "宁波一队", licenseClass: "A2", licenseExpiry: "2028-03-12", qualificationExpiry: "2027-08-20" },
  "SJ-1002": { id: "SJ-1002", name: "赵亮", phone: "13900006662", idCard: "310115198912093617", licenseNo: "310115198912093617", qualificationNo: "310115006720", type: "自有司机", fleet: "临港车队", licenseClass: "A2", licenseExpiry: "2027-11-06", qualificationExpiry: "2027-05-18" },
  "SJ-1003": { id: "SJ-1003", name: "刘军", phone: "13700003335", idCard: "320500198706263011", licenseNo: "320500198706263011", qualificationNo: "320500003109", type: "自有司机", fleet: "苏州二队", licenseClass: "A2", licenseExpiry: "2026-10-06", qualificationExpiry: "2026-09-28" },
  "SJ-1004": { id: "SJ-1004", name: "陈涛", phone: "13600002228", idCard: "330109199003154812", licenseNo: "330109199003154812", qualificationNo: "330109007721", type: "自有司机", fleet: "杭州车队", licenseClass: "A2", licenseExpiry: "2029-02-15", qualificationExpiry: "2028-01-22" },
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
  WB20260921006: { customer: "上海盛达国际货运有限公司", billNo: "BL-SH-26092106", containerType: "40HQ", sealNo: "SEAL763105", loadAddress: "上海市浦东新区外高桥港区海通路 88 号" },
  WB20260921007: { customer: "临港海运供应链有限公司", billNo: "BL-SH-26092107", containerType: "20GP", sealNo: "SEAL921467", loadAddress: "上海市浦东新区临港大道 1555 号" },
  WB20260920008: { customer: "嘉兴联运供应链有限公司", billNo: "BL-SH-26092008", containerType: "40HQ", sealNo: "SEAL817205", loadAddress: "上海市浦东新区芦潮港路 1588 号" },
  WB20260919009: { customer: "上海松江国际物流有限公司", billNo: "BL-SH-26091909", containerType: "20GP", sealNo: "SEAL672184", loadAddress: "上海市浦东新区洋山港同汇路 66 号" },
  WB20260918010: { customer: "昆山陆港供应链有限公司", billNo: "BL-SH-26091810", containerType: "40GP", sealNo: "SEAL509187", loadAddress: "上海市浦东新区外高桥港区洲海路 999 号" },
};

const DEFAULT_DRIVER_ID = "SJ-1002";
const DEFAULT_PENDING_IDS = ["PD-1002", "PD-1006", "PD-1007"];
const DEFAULT_ORDER_IDS = ["PD-1008", "PD-1009", "PD-1010"];
const DEFAULT_DEMO_IDS = new Set([...DEFAULT_PENDING_IDS, ...DEFAULT_ORDER_IDS]);
const CERTIFICATION_STORAGE_KEY = "container-logistics-driver-certifications-v1";
const certificationDefaults = {
  "SJ-1001": { status: "verified", submittedAt: "2026-08-12 09:20", reviewedAt: "2026-08-12 11:05" },
  "SJ-1002": { status: "verified", submittedAt: "2026-08-12 09:20", reviewedAt: "2026-08-12 11:05" },
  "SJ-1003": { status: "pending", submittedAt: "2026-09-20 15:36", reviewedAt: "" },
  "SJ-1004": { status: "verified", submittedAt: "2026-08-12 09:20", reviewedAt: "2026-08-12 11:05" },
};
const certificationMigrations = {
  "SJ-1002": { from: "unverified", to: "verified" },
  "SJ-1004": { from: "rejected", to: "verified", legacyReason: "身份证背面照片模糊，请重新上传" },
};

function loadCertifications() {
  try {
    const stored = JSON.parse(localStorage.getItem(CERTIFICATION_STORAGE_KEY) || "{}");
    Object.entries(certificationMigrations).forEach(([driverId, migration]) => {
      const record = stored[driverId];
      if (!record || record.status !== migration.from || (migration.legacyReason && record.reason !== migration.legacyReason)) return;
      stored[driverId] = {
        ...record,
        status: migration.to,
        submittedAt: record.submittedAt || "2026-08-12 09:20",
        reviewedAt: "2026-08-12 11:05",
        reason: "",
      };
    });
    const merged = { ...certificationDefaults, ...stored };
    localStorage.setItem(CERTIFICATION_STORAGE_KEY, JSON.stringify(merged));
    return merged;
  } catch {
    return { ...certificationDefaults };
  }
}

function saveCertifications(certifications) {
  localStorage.setItem(CERTIFICATION_STORAGE_KEY, JSON.stringify(certifications));
}

function normalizeDemoDispatches(dispatches) {
  const result = dispatches.map((item) => ({ ...item }));
  const seedById = new Map(dispatchSeed.map((item) => [item.id, item]));
  const existingIds = new Set(result.map((item) => item.id));

  dispatchSeed.forEach((item) => {
    if (!existingIds.has(item.id)) result.push({ ...item });
  });

  const restoreSeed = (id) => {
    const seed = seedById.get(id);
    const index = result.findIndex((item) => item.id === id);
    if (!seed) return;
    if (index === -1) result.push({ ...seed });
    else result[index] = { ...seed };
  };

  let pendingCount = result.filter((item) => item.driverId === DEFAULT_DRIVER_ID && item.status === "已派单").length;
  for (const id of DEFAULT_PENDING_IDS) {
    if (pendingCount >= 3) break;
    const current = result.find((item) => item.id === id);
    if (current?.status === "已派单") continue;
    restoreSeed(id);
    pendingCount += 1;
  }

  let orderCount = result.filter((item) => item.driverId === DEFAULT_DRIVER_ID && item.status !== "已派单" && item.currentNode !== "已拒绝").length;
  for (const id of DEFAULT_ORDER_IDS) {
    if (orderCount >= 3) break;
    const current = result.find((item) => item.id === id);
    if (current?.status !== "已派单" && current?.currentNode !== "已拒绝") continue;
    restoreSeed(id);
    orderCount += 1;
  }

  return result;
}

function loadDispatches() {
  const stored = window.DispatchStore.load(dispatchSeed);
  const normalized = normalizeDemoDispatches(stored);
  if (JSON.stringify(stored) !== JSON.stringify(normalized)) window.DispatchStore.save(normalized);
  return normalized;
}

function mergeDefaultExamples(incoming, current) {
  const incomingIds = new Set(incoming.map((item) => item.id));
  const missingExamples = current.filter((item) => DEFAULT_DEMO_IDS.has(item.id) && !incomingIds.has(item.id));
  return [...incoming, ...missingExamples];
}

const state = {
  dispatches: loadDispatches(),
  currentDriverId: DEFAULT_DRIVER_ID,
  orderFilter: "all",
  orderStage: "all",
  orderSearch: "",
  activeDispatchId: "",
  activeProfilePage: "",
  certifications: loadCertifications(),
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
  profileSubpage: document.querySelector("#profileSubpage"),
  subpageTitle: document.querySelector("#subpageTitle"),
  subpageContent: document.querySelector("#subpageContent"),
  toast: document.querySelector("#toast"),
};

function h(value) {
  return String(value ?? "").replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);
}

function maskPhone(phone) {
  return String(phone).replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
}

function maskIdCard(idCard) {
  return String(idCard || "").replace(/^(\d{6})\d+(\w{4})$/, "$1********$2");
}

function currentDriver() {
  return drivers[state.currentDriverId] || drivers["SJ-1002"];
}

function currentCertification() {
  return state.certifications[state.currentDriverId] || { status: "unverified" };
}

function certificationMeta(status) {
  return {
    unverified: { label: "未认证", className: "unverified" },
    pending: { label: "审核中", className: "pending" },
    verified: { label: "已认证", className: "verified" },
    rejected: { label: "未通过", className: "rejected" },
  }[status] || { label: "未认证", className: "unverified" };
}

function driverDispatches() {
  return state.dispatches.filter((item) => item.driverId === state.currentDriverId);
}

function acceptedOrders() {
  return driverDispatches().filter((item) => item.status !== "已派单" && item.currentNode !== "已拒绝");
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
        <div class="task-title-group">
          <strong class="task-route-name">${h(dispatch.routeName)}</strong>
          <span class="task-number">运单号 ${h(dispatch.waybillNo)}</span>
        </div>
        <span class="status-badge ${category}">${h(statusLabel(dispatch))}</span>
      </div>
      <div class="dispatch-time"><span>派单时间</span><strong>${h(dispatch.dispatchTime || "-")}</strong></div>
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

function renderTasks() {
  const rows = driverDispatches().filter((item) => dispatchCategory(item) === "pending");
  elements.taskList.innerHTML = rows.length ? rows.map(taskCard).join("") : emptyState("暂无待接订单", "新派单到达后会在这里显示");
}

function orderCard(dispatch) {
  const category = dispatchCategory(dispatch);
  return `
    <article class="order-card" data-action="detail" data-id="${h(dispatch.id)}">
      <div class="order-card-top"><strong>${h(dispatch.waybillNo)}</strong><span class="status-badge ${category}">${h(statusLabel(dispatch))}</span></div>
      <div class="order-route">${h(dispatch.origin)}<span>→</span>${h(dispatch.destination)}</div>
      <div class="order-info"><span>派单时间　<b>${h(dispatch.dispatchTime || "-")}</b></span><span>车辆　<b>${h(dispatch.vehicleId || "-")}</b></span><span>箱信息　<b>${h(dispatch.boxes)}</b></span></div>
    </article>`;
}

function renderOrders() {
  const keyword = state.orderSearch.toLowerCase();
  const rows = driverDispatches().filter((item) => {
    const isAcceptedOrder = item.status !== "已派单" && item.currentNode !== "已拒绝";
    const matchedStatus = state.orderFilter === "all" || dispatchCategory(item) === state.orderFilter;
    const matchedStage = state.orderStage === "all"
      || (state.orderStage === "pickup" && item.status === "运输中" && ["已接单", "待提货"].includes(item.currentNode))
      || (state.orderStage === "transit" && item.status === "运输中" && ["已提货", "在途"].includes(item.currentNode))
      || (state.orderStage === "completed" && item.status === "已完成");
    const searchText = `${item.waybillNo} ${item.routeName} ${item.boxes} ${item.origin} ${item.destination}`.toLowerCase();
    return isAcceptedOrder && matchedStatus && matchedStage && searchText.includes(keyword);
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
  const certification = currentCertification();
  const certificationView = certificationMeta(certification.status);
  const orders = acceptedOrders();
  const pickup = orders.filter((item) => item.status === "运输中" && ["已接单", "待提货"].includes(item.currentNode)).length;
  const transit = orders.filter((item) => item.status === "运输中" && ["已提货", "在途"].includes(item.currentNode)).length;
  const completed = orders.filter((item) => item.status === "已完成").length;
  document.querySelector("#profileAvatar").textContent = driver.name.slice(0, 1);
  document.querySelector("#profileName").textContent = driver.name;
  document.querySelector("#profileMeta").textContent = `${driver.type} · ${driver.fleet}`;
  document.querySelector("#profilePhone").textContent = maskPhone(driver.phone);
  const profileBadge = document.querySelector("#profileCertificationBadge");
  profileBadge.textContent = certificationView.label;
  profileBadge.className = certificationView.className;
  const menuStatus = document.querySelector("#certificationMenuStatus");
  menuStatus.textContent = certificationView.label;
  menuStatus.className = `certification-state ${certificationView.className}`;
  document.querySelector("#profileOrderStats").innerHTML = `
    <button data-order-stage="all" type="button"><strong>${orders.length}</strong><span>全部运单</span></button>
    <button data-order-stage="pickup" type="button"><strong>${pickup}</strong><span>待提货</span></button>
    <button data-order-stage="transit" type="button"><strong>${transit}</strong><span>运输中</span></button>
    <button data-order-stage="completed" type="button"><strong>${completed}</strong><span>已完成</span></button>`;
}

function infoRows(rows) {
  return rows.map((row) => `
    <div class="info-row ${row.action ? "action-row" : ""}" ${row.action ? `data-subpage-action="${h(row.action)}"` : ""}>
      <span>${h(row.label)}</span><strong>${h(row.value)}</strong>${row.status ? `<em class="status-pill ${row.warning ? "warning" : ""}">${h(row.status)}</em>` : ""}${row.action ? "<b>›</b>" : ""}
    </div>`).join("");
}

function documentStatus(date) {
  const remaining = daysUntil(date);
  if (remaining < 0) return { text: "已过期", warning: true };
  if (remaining <= 30) return { text: `${remaining}天到期`, warning: true };
  return { text: "有效", warning: false };
}

function renderSubpage(page) {
  const driver = currentDriver();
  const certification = currentCertification();
  const certificationView = certificationMeta(certification.status);
  const current = driverDispatches().find((item) => item.status === "运输中" && item.vehicleId)
    || driverDispatches().find((item) => item.vehicleId);
  const plateNo = current?.vehicleId || "暂未分配";
  const vehicle = vehicles[plateNo];
  const titles = {
    certification: "司机认证",
    personal: "个人信息",
    documents: "证件管理",
    security: "账户安全",
    vehicle: "车辆信息",
    insurance: "车辆保险",
    messages: "消息通知",
    service: "联系调度",
    settings: "系统设置",
  };
  elements.subpageTitle.textContent = titles[page] || "个人中心";

  if (page === "certification") {
    const status = certificationMeta(certification.status);
    if (certification.status === "verified") {
      elements.subpageContent.innerHTML = `
        <div class="subpage-summary"><span class="subpage-summary-icon">✓</span><div><strong>司机认证已通过</strong><span>审核时间 ${h(certification.reviewedAt || "-")}</span></div></div>
        <section class="info-section"><h2>认证资料</h2>${infoRows([
          { label: "真实姓名", value: driver.name }, { label: "身份证号", value: maskIdCard(driver.idCard) },
          { label: "驾驶证", value: `${driver.licenseClass} · ${maskIdCard(driver.licenseNo)}` }, { label: "从业资格证", value: driver.qualificationNo },
          { label: "认证状态", value: "", status: status.label },
        ])}</section>`;
      return;
    }
    if (certification.status === "pending") {
      elements.subpageContent.innerHTML = `
        <div class="subpage-summary"><span class="subpage-summary-icon">审</span><div><strong>认证资料审核中</strong><span>提交时间 ${h(certification.submittedAt || "-")}</span></div></div>
        <div class="certification-notice">认证结果将通过消息通知同步。审核通过前暂时无法接单，请耐心等待。</div>
        <section class="info-section"><h2>已提交资料</h2>${infoRows([
          { label: "真实姓名", value: driver.name }, { label: "身份证号", value: maskIdCard(driver.idCard) },
          { label: "驾驶证", value: certification.licenseAttachment || "驾驶证照片" }, { label: "从业资格证", value: certification.qualificationAttachment || "资格证照片" },
        ])}</section>`;
      return;
    }
    const rejectedNotice = certification.status === "rejected"
      ? `<div class="certification-notice rejected"><strong>审核未通过</strong><br>${h(certification.reason || "认证资料不完整，请重新提交")}</div>`
      : `<div class="certification-notice">完成实名认证后才能接单，请确保上传的证件清晰、完整且在有效期内。</div>`;
    elements.subpageContent.innerHTML = `
      <div class="subpage-summary"><span class="subpage-summary-icon">认</span><div><strong>${h(status.label)}</strong><span>提交司机身份及从业资质</span></div></div>
      ${rejectedNotice}
      <form class="certification-form" id="certificationForm">
        <section class="info-section"><h2>身份与证件信息</h2>
          <label class="certification-field">真实姓名<input name="name" value="${h(driver.name)}" readonly /></label>
          <label class="certification-field">身份证号码<input name="idCard" value="${h(driver.idCard)}" required /></label>
          <label class="certification-field">手机号码<input name="phone" value="${h(driver.phone)}" required /></label>
          <label class="certification-field">驾驶证号<input name="licenseNo" value="${h(driver.licenseNo)}" required /></label>
          <label class="certification-field">准驾车型<input name="licenseClass" value="${h(driver.licenseClass)}" required /></label>
          <label class="certification-field">从业资格证号<input name="qualificationNo" value="${h(driver.qualificationNo)}" required /></label>
          <div class="certification-upload-grid">
            <label class="certification-upload"><input name="idCardFront" type="file" accept="image/*" required /><strong>身份证人像面</strong><span>点击上传照片</span></label>
            <label class="certification-upload"><input name="idCardBack" type="file" accept="image/*" required /><strong>身份证国徽面</strong><span>点击上传照片</span></label>
            <label class="certification-upload"><input name="licenseAttachment" type="file" accept="image/*" required /><strong>驾驶证照片</strong><span>点击上传照片</span></label>
            <label class="certification-upload"><input name="qualificationAttachment" type="file" accept="image/*" required /><strong>从业资格证</strong><span>点击上传照片</span></label>
          </div>
        </section>
        <button class="subpage-primary" type="submit">提交认证审核</button>
      </form>`;
    return;
  }

  if (page === "personal") {
    elements.subpageContent.innerHTML = `
      <div class="subpage-summary"><span class="subpage-summary-icon">${h(driver.name.slice(0, 1))}</span><div><strong>${h(driver.name)}</strong><span>${h(driver.type)} · ${h(driver.fleet)}</span></div></div>
      <section class="info-section"><h2>基础资料</h2>${infoRows([
        { label: "司机编号", value: driver.id }, { label: "姓名", value: driver.name }, { label: "联系电话", value: maskPhone(driver.phone) },
        { label: "司机类型", value: driver.type }, { label: "所属车队", value: driver.fleet }, { label: "司机状态", value: "在职" },
      ])}</section>
      <section class="info-section"><h2>联系信息</h2>${infoRows([{ label: "住址", value: "上海市浦东新区临港大道 688 号" }, { label: "紧急联系人", value: "赵敏  138****2166" }])}</section>
      <button class="subpage-primary" data-subpage-action="edit-personal" type="button">编辑个人信息</button>`;
    return;
  }

  if (page === "documents") {
    const licenseStatus = documentStatus(driver.licenseExpiry);
    const qualificationStatus = documentStatus(driver.qualificationExpiry);
    elements.subpageContent.innerHTML = `
      <div class="subpage-summary"><span class="subpage-summary-icon">证</span><div><strong>司机证件档案</strong><span>证件到期前 30 天自动提醒</span></div></div>
      <section class="info-section"><h2>证件列表</h2>
        <div class="document-record"><header><strong>机动车驾驶证（${h(driver.licenseClass)}）</strong><em class="status-pill ${licenseStatus.warning ? "warning" : ""}">${licenseStatus.text}</em></header><p>证号：310***********381<br>有效期至：${h(driver.licenseExpiry)}</p></div>
        <div class="document-record"><header><strong>道路运输从业资格证</strong><em class="status-pill ${qualificationStatus.warning ? "warning" : ""}">${qualificationStatus.text}</em></header><p>证号：沪交运管从业字 20260182<br>有效期至：${h(driver.qualificationExpiry)}</p></div>
      </section>
      <button class="subpage-primary" data-subpage-action="update-documents" type="button">更新证件资料</button>`;
    return;
  }

  if (page === "security") {
    elements.subpageContent.innerHTML = `
      <div class="subpage-summary"><span class="subpage-summary-icon">安</span><div><strong>账户安全正常</strong><span>最近登录：今天 08:32 · 上海</span></div></div>
      <section class="info-section"><h2>安全设置</h2>${infoRows([
        { label: "绑定手机", value: maskPhone(driver.phone), action: "change-phone" },
        { label: "登录密码", value: "已设置", action: "change-password" },
        { label: "实名认证", value: certification.status === "verified" ? "身份资料已核验" : "认证流程未完成", status: certificationView.label, warning: certification.status !== "verified" },
        { label: "登录设备", value: "1 台设备", action: "devices" },
      ])}</section>`;
    return;
  }

  if (page === "vehicle") {
    elements.subpageContent.innerHTML = `
      <div class="subpage-summary"><span class="subpage-summary-icon">车</span><div><strong>${h(plateNo)}</strong><span>${h(vehicle?.type || "暂无车辆信息")}</span></div></div>
      <section class="info-section"><h2>车辆档案</h2>${infoRows([
        { label: "车牌号码", value: plateNo }, { label: "车辆类型", value: vehicle?.type || "-" },
        { label: "所属车队", value: vehicle?.fleet || driver.fleet }, { label: "车辆状态", value: vehicle?.state || "待分配", status: vehicle?.state || "待分配" },
        { label: "营运证号", value: "沪交运管字 330206-889" }, { label: "下次审验", value: "2027-03-18" },
      ])}</section>`;
    return;
  }

  if (page === "insurance") {
    elements.subpageContent.innerHTML = `
      <div class="subpage-summary"><span class="subpage-summary-icon">保</span><div><strong>${h(plateNo)} 保险档案</strong><span>当前保单状态正常</span></div></div>
      <section class="info-section"><h2>有效保单</h2>
        <div class="document-record"><header><strong>机动车交通事故责任强制保险</strong><em class="status-pill">有效</em></header><p>承保公司：中国人民财产保险<br>保单号：PDAA20263101002819<br>有效期至：2027-08-31</p></div>
        <div class="document-record"><header><strong>商业车辆保险</strong><em class="status-pill">有效</em></header><p>承保公司：中国太平洋财产保险<br>保单号：ASH2026091800366<br>有效期至：2027-09-18</p></div>
      </section>`;
    return;
  }

  if (page === "messages") {
    elements.subpageContent.innerHTML = `
      <section class="info-section"><h2>最新消息</h2>
        <div class="message-record"><strong>新派单提醒</strong><p>您有新的运输任务，请进入接单页面及时处理。</p><time>今天 08:20</time></div>
        <div class="message-record"><strong>证件到期提醒</strong><p>系统将持续监控驾驶证和从业资格证有效期。</p><time>昨天 16:40</time></div>
        <div class="message-record"><strong>运输节点同步成功</strong><p>运单 WB20260920008 的在途节点已同步至调度后台。</p><time>09月20日 14:48</time></div>
      </section>`;
    return;
  }

  if (page === "service") {
    elements.subpageContent.innerHTML = `
      <div class="subpage-summary"><span class="subpage-summary-icon">调</span><div><strong>调度服务中心</strong><span>工作时间 07:00 - 22:00</span></div></div>
      <section class="info-section"><h2>联系信息</h2>${infoRows([{ label: "调度热线", value: "400-800-6688" }, { label: "值班调度", value: "周调度" }, { label: "服务车队", value: driver.fleet }])}</section>
      <a class="subpage-primary" href="tel:4008006688">拨打调度热线</a>`;
    return;
  }

  elements.subpageContent.innerHTML = `
    <section class="info-section"><h2>系统设置</h2>${infoRows([
      { label: "消息提醒", value: "已开启", action: "notifications" }, { label: "清理缓存", value: "12.6 MB", action: "clear-cache" },
      { label: "隐私政策", value: "", action: "privacy" }, { label: "当前版本", value: "1.0.0" },
    ])}</section>
    <button class="subpage-primary" data-subpage-action="logout" type="button">退出当前账号</button>`;
}

function openProfileSubpage(page) {
  state.activeProfilePage = page;
  renderSubpage(page);
  elements.profileSubpage.classList.add("open");
  elements.profileSubpage.setAttribute("aria-hidden", "false");
  document.querySelector(".phone-shell").classList.add("subpage-open");
  elements.subpageContent.scrollTop = 0;
}

function closeProfileSubpage() {
  elements.profileSubpage.classList.remove("open");
  elements.profileSubpage.setAttribute("aria-hidden", "true");
  document.querySelector(".phone-shell").classList.remove("subpage-open");
  state.activeProfilePage = "";
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
    <section class="detail-card"><strong class="detail-card-title">运单信息</strong><div class="detail-grid"><div class="detail-field"><span>客户名称</span><strong>${h(meta.customer || "待补充")}</strong></div><div class="detail-field"><span>提单号</span><strong>${h(meta.billNo || "-")}</strong></div><div class="detail-field"><span>箱信息</span><strong>${h(dispatch.boxes)}</strong></div><div class="detail-field"><span>封号</span><strong>${h(meta.sealNo || "-")}</strong></div><div class="detail-field"><span>车辆</span><strong>${h(dispatch.vehicleId || "待分配")}</strong></div><div class="detail-field full"><span>装卸地址</span><strong>${h(dispatch.loadAddress || meta.loadAddress || dispatch.origin)}</strong></div><div class="detail-field full"><span>调度备注</span><strong>${h(dispatch.note || "无")}</strong></div>${dispatch.rejectionReason ? `<div class="detail-field full"><span>拒单原因</span><strong>${h(dispatch.rejectionReason)}</strong></div>` : ""}</div></section>
    <section class="detail-card"><strong class="detail-card-title">节点记录</strong><div class="timeline-list">${timeline || `<div class="empty-state"><p>暂无节点记录</p></div>`}</div></section>`;

  if (category === "pending") {
    elements.detailActionBar.innerHTML = `<button class="danger" data-detail-action="reject" type="button">拒绝</button><button class="primary" data-detail-action="accept" type="button">确认接单</button>`;
  } else if (category === "active") {
    elements.detailActionBar.innerHTML = `<button data-detail-action="contact" type="button">联系调度</button><button class="primary" data-detail-action="progress" type="button">更新运输进度</button>`;
  } else {
    elements.detailActionBar.innerHTML = `<button data-detail-action="copy" type="button">复制运单号</button><button class="primary" data-detail-action="back" type="button">返回运单列表</button>`;
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
  if (elements.profileSubpage.classList.contains("open") && state.activeProfilePage) renderSubpage(state.activeProfilePage);
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
  if (!dispatch || dispatch.status !== "已派单") return false;
  dispatch.status = "运输中";
  dispatch.currentNode = "已接单";
  dispatch.acceptedAt = window.DispatchStore.nowText();
  dispatch.timeline = dispatch.timeline || [];
  dispatch.timeline.push({ node: "已接单", time: dispatch.acceptedAt, desc: "司机已确认接单，任务开始执行", photos: [] });
  persist("接单成功，已同步至调度后台");
  return true;
}

function acceptAndOpenOrders(dispatchId) {
  const certification = currentCertification();
  if (certification.status !== "verified") {
    if (elements.detailView.classList.contains("open")) closeDetail();
    openProfileSubpage("certification");
    const message = certification.status === "pending" ? "认证资料正在审核，通过后即可接单" : "请先完成司机认证后再接单";
    showToast(message);
    return;
  }
  if (!acceptDispatch(dispatchId)) return;
  state.orderFilter = "active";
  state.orderStage = "all";
  state.orderSearch = "";
  document.querySelector("#orderSearch").value = "";
  document.querySelectorAll("#orderStatusTabs button").forEach((button) => button.classList.toggle("active", button.dataset.status === "active"));
  renderOrders();
  closeDetail();
  switchView("orders");
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
  state.dispatches = mergeDefaultExamples(window.DispatchStore.load(dispatchSeed), state.dispatches);
  renderAll();
}

elements.bottomNav.addEventListener("click", (event) => {
  const button = event.target.closest("[data-view]");
  if (button) switchView(button.dataset.view);
});

function handleDispatchAction(event) {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const { action, id } = button.dataset;
  if (action === "detail") openDetail(id);
  if (action === "accept") acceptAndOpenOrders(id);
  if (action === "progress") openProgress(id);
}

elements.taskList.addEventListener("click", handleDispatchAction);
elements.orderList.addEventListener("click", handleDispatchAction);

function openOrdersForStage(stage) {
  const filterByStage = { all: "all", pickup: "active", transit: "active", completed: "completed" };
  const titleByStage = { all: "我的运单", pickup: "待提货运单", transit: "运输中运单", completed: "已完成运单" };
  state.orderStage = stage;
  state.orderFilter = filterByStage[stage] || "all";
  state.orderSearch = "";
  document.querySelector("#orderSearch").value = "";
  document.querySelectorAll("#orderStatusTabs button").forEach((button) => button.classList.toggle("active", button.dataset.status === state.orderFilter));
  renderOrders();
  switchView("orders");
  elements.title.textContent = titleByStage[stage] || "我的运单";
}

elements.profileView.addEventListener("click", (event) => {
  const stageButton = event.target.closest("[data-order-stage]");
  if (stageButton) {
    openOrdersForStage(stageButton.dataset.orderStage);
    return;
  }
  const pageButton = event.target.closest("[data-profile-page]");
  if (pageButton) openProfileSubpage(pageButton.dataset.profilePage);
});

document.querySelector("#orderStatusTabs").addEventListener("click", (event) => {
  const button = event.target.closest("[data-status]");
  if (!button) return;
  state.orderFilter = button.dataset.status;
  state.orderStage = "all";
  elements.title.textContent = "我的运单";
  document.querySelectorAll("#orderStatusTabs button").forEach((item) => item.classList.toggle("active", item === button));
  renderOrders();
});

document.querySelector("#orderSearch").addEventListener("input", (event) => {
  state.orderSearch = event.target.value.trim();
  renderOrders();
});

document.querySelector("#backFromDetail").addEventListener("click", closeDetail);
document.querySelector("#detailMoreButton").addEventListener("click", () => showToast("运单信息已是最新状态"));
document.querySelector("#backFromSubpage").addEventListener("click", closeProfileSubpage);

elements.subpageContent.addEventListener("submit", (event) => {
  if (event.target.id !== "certificationForm") return;
  event.preventDefault();
  const formData = new FormData(event.target);
  const driver = currentDriver();
  driver.idCard = String(formData.get("idCard") || "").trim();
  driver.phone = String(formData.get("phone") || "").trim();
  driver.licenseNo = String(formData.get("licenseNo") || "").trim();
  driver.licenseClass = String(formData.get("licenseClass") || "").trim();
  driver.qualificationNo = String(formData.get("qualificationNo") || "").trim();
  state.certifications[state.currentDriverId] = {
    status: "pending",
    submittedAt: window.DispatchStore.nowText(),
    reviewedAt: "",
    reason: "",
    idCardFront: formData.get("idCardFront")?.name || "身份证人像面.jpg",
    idCardBack: formData.get("idCardBack")?.name || "身份证国徽面.jpg",
    licenseAttachment: formData.get("licenseAttachment")?.name || "驾驶证照片.jpg",
    qualificationAttachment: formData.get("qualificationAttachment")?.name || "从业资格证.jpg",
  };
  saveCertifications(state.certifications);
  renderProfile();
  renderSubpage("certification");
  showToast("认证资料已提交，请等待后台审核");
});

elements.subpageContent.addEventListener("change", (event) => {
  const input = event.target.closest(".certification-upload input[type='file']");
  if (!input) return;
  const label = input.closest(".certification-upload");
  label.querySelector("span").textContent = input.files[0]?.name || "点击上传照片";
  label.classList.toggle("selected", Boolean(input.files.length));
});

elements.subpageContent.addEventListener("click", (event) => {
  const actionTarget = event.target.closest("[data-subpage-action]");
  if (!actionTarget) return;
  const messages = {
    "edit-personal": "个人信息编辑功能将在正式版开放",
    "update-documents": "证件上传功能将在正式版开放",
    "change-phone": "更换手机号功能将在正式版开放",
    "change-password": "密码修改验证已启动",
    devices: "当前仅有本机登录",
    notifications: "消息提醒设置已更新",
    "clear-cache": "缓存已清理",
    privacy: "隐私政策已是最新版本",
    logout: "当前为演示账号，暂不支持退出",
  };
  showToast(messages[actionTarget.dataset.subpageAction] || "操作已记录");
});

elements.detailActionBar.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-detail-action]");
  if (!button) return;
  const action = button.dataset.detailAction;
  const id = state.activeDispatchId;
  const dispatch = state.dispatches.find((item) => item.id === id);
  if (action === "accept") acceptAndOpenOrders(id);
  if (action === "reject") openReject(id);
  if (action === "progress") openProgress(id);
  if (action === "contact") showToast("调度中心电话：400-800-6688");
  if (action === "back") { closeDetail(); switchView("orders"); }
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
  elements.driverDialog.close();
  renderAll();
  showToast(`已切换为 ${currentDriver().name}`);
});

document.querySelector("#notificationButton").addEventListener("click", () => {
  showToast("您有 1 条新派单和 1 条证件提醒");
  document.querySelector(".notification-dot").style.display = "none";
});

window.addEventListener("storage", (event) => {
  if (event.key === CERTIFICATION_STORAGE_KEY) {
    state.certifications = loadCertifications();
    renderProfile();
    if (state.activeProfilePage === "certification") renderSubpage("certification");
    return;
  }
  if (event.key === window.DispatchStore.STORAGE_KEY) syncFromStore();
});

window.addEventListener("message", (event) => {
  const message = event.data;
  if (message?.type !== "dispatch-sync-data" || !Array.isArray(message.dispatches)) return;
  state.dispatches = mergeDefaultExamples(message.dispatches, state.dispatches);
  window.DispatchStore.save(state.dispatches);
  renderAll();
});

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") syncFromStore();
});

renderAll();
switchView("tasks");
if (window.opener && !window.opener.closed) {
  window.opener.postMessage({ type: "dispatch-sync-request" }, "*");
}
