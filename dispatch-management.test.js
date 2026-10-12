const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

function createElement() {
  return {
    listeners: {},
    dataset: {},
    className: "",
    innerHTML: "",
    textContent: "",
    value: "",
    hidden: false,
    disabled: false,
    open: false,
    addEventListener(name, callback) { this.listeners[name] = callback; },
    showModal() { this.open = true; },
    close() { this.open = false; },
  };
}

const html = fs.readFileSync("index.html", "utf8");
assert.match(html, /data-page="dispatch-management"[^>]*>派单管理</);
assert.match(html, /id="dispatchManagementTaskStats"/);
assert.match(html, /id="dispatchManagementCapacityStats"/);
assert.match(html, /task-lane-column[\s\S]*dispatchManagementTaskStats[\s\S]*<section class="dispatch-management-lane task-lane"/);
assert.match(html, /capacity-lane-column[\s\S]*dispatchManagementCapacityStats[\s\S]*<section class="dispatch-management-lane capacity-lane"/);
assert.doesNotMatch(html, /<section class="dispatch-management-stats"/);
assert.match(html, /id="dispatchManagementAutoBtn"/);
assert.match(html, /id="dispatchManagementManualBtn"/);
assert.match(html, /id="dispatchManagementTaskSelectAll"/);
assert.match(html, /id="dispatchManagementCapacitySelectAll"/);
assert.match(html, /id="dispatchManagementTaskCustomerSearch"/);
assert.match(html, /id="dispatchManagementTaskTypeFilter"/);
assert.match(html, /id="dispatchManagementTaskDateFilter"/);
assert.match(html, /id="dispatchManagementTaskNumberSearch"/);
assert.match(html, /id="dispatchManagementCapacityDriverSearch"/);
assert.match(html, /id="dispatchManagementResultDialog"/);
assert.match(html, /id="dispatchManagementConfirmDialog"/);
assert.doesNotMatch(html, /id="dispatchManagementFeedback"/);
assert.match(html, /id="dispatchManagementTaskPageSize"[^>]*>[\s\S]*value="10" selected>10 条\/页/);
assert.doesNotMatch(html, /dispatch-management-selection/);
assert.doesNotMatch(html, /dispatchManagementRefreshBtn/);
const dispatchTaskHead = html.match(/<table class="dispatch-management-task-table">[\s\S]*?<\/thead>/)?.[0] || "";
assert.doesNotMatch(dispatchTaskHead, /匹配状态/);
assert.doesNotMatch(dispatchTaskHead, /操作/);
assert.match(html, /司机 \/ 电话[\s\S]*车辆 \/ 挂车[\s\S]*当前进度[\s\S]*匹配值/);

const financeDialogEnd = html.indexOf("</dialog>", html.indexOf('id="financeExpenseDialog"'));
const financePageEnd = html.indexOf("</section>", financeDialogEnd);
const customerPageStart = html.indexOf('id="customerPage"');
assert.ok(financeDialogEnd > 0 && financePageEnd > financeDialogEnd && financePageEnd < customerPageStart,
  "finance page must close before the following workspace pages");

const elements = new Map();
const getElement = (selector) => {
  if (!elements.has(selector)) elements.set(selector, createElement());
  return elements.get(selector);
};
getElement("#dispatchManagementTaskPageSize").value = "10";
getElement("#dispatchManagementCapacityFilter").value = "";

const page = createElement();
page.querySelector = getElement;

const dispatches = [
  { id: "PD-1", waybillNo: "WB-1", routeId: "R-1", routeName: "北仑港至园区", status: "待派单", orderDate: "2026-10-10" },
  { id: "PD-2", waybillNo: "WB-2", routeId: "R-2", routeName: "港区短驳", status: "待派单", orderDate: "2026-10-10" },
  { id: "PD-3", waybillNo: "WB-3", vehicleId: "浙B20002", driverId: "D-2", status: "运输中", dispatchTime: "2026-10-10 10:00" },
  { id: "PD-4", waybillNo: "WB-4", status: "已完成" },
];
const waybills = [
  { waybillNo: "WB-1", customerName: "港航客户", projectName: "进口箱项目", taskType: "提空装货" },
  { waybillNo: "WB-2", customerName: "海运客户", projectName: "出口箱项目", taskType: "重箱进港" },
];
const drivers = [
  { id: "D-1", name: "王海", phone: "13800000001", driverState: "空闲", certificationStatus: "verified", qualificationExpiry: "2028-10-10" },
  { id: "D-2", name: "赵亮", phone: "13800000002", driverState: "运输中", certificationStatus: "verified", qualificationExpiry: "2028-10-10" },
  { id: "D-3", name: "陈涛", phone: "13800000003", driverState: "空闲", certificationStatus: "verified", qualificationExpiry: "2028-10-10" },
  { id: "D-4", name: "周明", phone: "13800000004", driverState: "空闲", certificationStatus: "verified", qualificationExpiry: "2028-10-10" },
];
const vehicles = [
  { plateNo: "浙B20001", driver: "王海 / 13800000001", trailerId: "T-1", vehicleState: "在用", vehicleType: "集装箱牵引车", ratedLoad: 31.5, energyType: "燃油", currentLocation: "宁波北仑" },
  { plateNo: "浙B20002", driver: "赵亮 / 13800000002", trailerId: "T-2", vehicleState: "在用", vehicleType: "集装箱牵引车", ratedLoad: 32, energyType: "新能源", currentLocation: "宁波港区" },
  { plateNo: "浙B20003", driver: "陈涛 / 13800000003", trailerId: "T-3", vehicleState: "在用", vehicleType: "集装箱牵引车", ratedLoad: 31, energyType: "天然气", currentLocation: "宁波北仑" },
  { plateNo: "沪B20004", driver: "周明 / 13800000004", trailerId: "T-4", vehicleState: "在用", dispatchState: "即将完成", vehicleType: "普通货车", ratedLoad: 12, energyType: "新能源", currentLocation: "上海临港" },
];
const trailers = [
  { id: "T-1", plateNo: "挂001", trailerType: "集装箱骨架车", trailerState: "在用" },
  { id: "T-2", plateNo: "挂002", trailerType: "集装箱骨架车", trailerState: "在用" },
  { id: "T-3", plateNo: "挂003", trailerType: "集装箱骨架车", trailerState: "在用" },
  { id: "T-4", plateNo: "挂004", trailerType: "普通栏板车", trailerState: "在用" },
];
const fixedRoutes = [
  { id: "R-1", routeName: "北仑港至园区", origin: "宁波北仑港", defaultVehicle: "浙B20001", defaultDriver: "王海" },
  { id: "R-2", routeName: "港区短驳", origin: "宁波北仑港" },
];

let savedWaybills = 0;
let savedDispatches = 0;
let renderedAutoDispatch = 0;
let navigatedPage = "";
const windowMock = {
  DispatchStore: { nowText: () => "2026-10-10 15:00", save() {} },
  AutoDispatchManager: { render() { renderedAutoDispatch += 1; } },
  addEventListener() {},
};
const context = vm.createContext({
  window: windowMock,
  document: { querySelector: (selector) => selector === "#dispatchManagementPage" ? page : null },
  dispatches,
  waybills,
  drivers,
  vehicles,
  trailers,
  fixedRoutes,
  saveWaybills() { savedWaybills += 1; },
  saveDispatches() { savedDispatches += 1; },
  getDashboardTaskMeta: (dispatch) => dispatch.id === "PD-3" ? { progress: 55, stage: "干线运输" } : null,
  Intl,
  Date,
  String,
  Number,
  Math,
  switchPage(pageName) { navigatedPage = pageName; },
});
vm.runInContext(fs.readFileSync("dispatch-management.js", "utf8"), context);

assert.match(getElement("#dispatchManagementTaskStats").innerHTML, /待派单/);
assert.doesNotMatch(getElement("#dispatchManagementTaskStats").innerHTML, /已派单|运输中|已完成/);
assert.match(html, /dispatch-stat-group task-only/);
assert.match(getElement("#dispatchManagementCapacityStats").innerHTML, /空闲/);
assert.equal(windowMock.DispatchManagement.getDemoState().tasks.length, 15);
assert.equal(windowMock.DispatchManagement.getDemoState().tasks.filter((task) => task.status === "待派单").length, 15);
assert.equal(getElement("#dispatchManagementTaskCount").textContent, "15 条待匹配");
assert.match(getElement("#dispatchManagementTaskBody").innerHTML, /东方港联/);
assert.match(getElement("#dispatchManagementTaskBody").innerHTML, /WB20261010030/);
assert.doesNotMatch(getElement("#dispatchManagementTaskBody").innerHTML, /WB20261010031/);
assert.doesNotMatch(getElement("#dispatchManagementCapacityList").innerHTML, /司机资质|核载 \/ 容积|dispatch-capacity-node-progress/);
assert.match(getElement("#dispatchManagementCapacityList").innerHTML, /dispatch-capacity-progress-track/);
assert.match(getElement("#dispatchManagementCapacityList").innerHTML, /匹配值/);
assert.match(getElement("#dispatchManagementCapacityList").innerHTML, />100<\/strong>/);
assert.doesNotMatch(getElement("#dispatchManagementCapacityList").innerHTML, /待开始/);
assert.equal((getElement("#dispatchManagementCapacityList").innerHTML.match(/dispatch-capacity-row/g) || []).length, 4,
  "all capacity resources should render as list rows");
assert.match(getElement("#dispatchManagementTaskBody").innerHTML, /type="checkbox"/);
assert.match(getElement("#dispatchManagementCapacityList").innerHTML, /type="checkbox"/);
assert.equal(getElement("#dispatchManagementManualBtn").disabled, true);

const taskSearch = getElement("#dispatchManagementTaskCustomerSearch");
taskSearch.value = "海晟";
taskSearch.listeners.input();
assert.equal(getElement("#dispatchManagementTaskCount").textContent, "1 条待匹配");
assert.match(getElement("#dispatchManagementTaskBody").innerHTML, /海晟供应链/);
assert.doesNotMatch(getElement("#dispatchManagementTaskBody").innerHTML, /东方港联/);
taskSearch.value = "";
taskSearch.listeners.input();
const taskNumberSearch = getElement("#dispatchManagementTaskNumberSearch");
taskNumberSearch.value = "JH2026101003";
taskNumberSearch.listeners.input();
assert.equal(getElement("#dispatchManagementTaskCount").textContent, "1 条待匹配");
assert.match(getElement("#dispatchManagementTaskBody").innerHTML, /WB20261010023/);
taskNumberSearch.value = "";
taskNumberSearch.listeners.input();
const taskTypeFilter = getElement("#dispatchManagementTaskTypeFilter");
taskTypeFilter.value = "排重箱（A→B）";
taskTypeFilter.listeners.change();
assert.equal(getElement("#dispatchManagementTaskCount").textContent, "2 条待匹配");
assert.match(getElement("#dispatchManagementTaskBody").innerHTML, /DM-004/);
taskTypeFilter.value = "";
taskTypeFilter.listeners.change();
const taskDateFilter = getElement("#dispatchManagementTaskDateFilter");
taskDateFilter.value = "2026-10-11";
taskDateFilter.listeners.change();
assert.equal(getElement("#dispatchManagementTaskCount").textContent, "0 条待匹配");
assert.match(getElement("#dispatchManagementTaskBody").innerHTML, /没有符合条件的任务/);
taskDateFilter.value = "2026-10-10";
taskDateFilter.listeners.change();
assert.equal(getElement("#dispatchManagementTaskCount").textContent, "15 条待匹配");
taskDateFilter.value = "";
taskDateFilter.listeners.change();
const capacityDriverSearch = getElement("#dispatchManagementCapacityDriverSearch");
capacityDriverSearch.value = "赵亮";
capacityDriverSearch.listeners.input();
assert.equal(getElement("#dispatchManagementCapacityCount").textContent, "1 组运力");
assert.match(getElement("#dispatchManagementCapacityList").innerHTML, /赵亮/);
assert.doesNotMatch(getElement("#dispatchManagementCapacityList").innerHTML, /王海/);
capacityDriverSearch.value = "";
capacityDriverSearch.listeners.input();

getElement("#dispatchManagementCapacityList").listeners.click({
  target: {
    closest: (selector) => selector === "[data-capacity-plate]" ? { dataset: { capacityPlate: "沪B20004" } } : null,
  },
});
assert.match(getElement("#dispatchManagementCapacityList").innerHTML, /dispatch-capacity-item[^>]*focused/);

const changeSelection = (elementSelector, inputName, value, checked = true) => {
  getElement(elementSelector).listeners.change({
    target: { closest: (selector) => selector.includes(inputName) ? { value, checked } : null },
  });
};
changeSelection("#dispatchManagementTaskBody", "dispatchManagementTask", "DM-001");
changeSelection("#dispatchManagementTaskBody", "dispatchManagementTask", "DM-002");
changeSelection("#dispatchManagementCapacityList", "dispatchManagementCapacity", "浙B20001");
assert.equal(getElement("#dispatchManagementManualBtn").disabled, true, "one vehicle is not enough for two selected tasks");
changeSelection("#dispatchManagementCapacityList", "dispatchManagementCapacity", "浙B20003");
assert.equal(getElement("#dispatchManagementManualBtn").disabled, false);
assert.equal(getElement("#dispatchManagementManualLabel").textContent, "批量派单 (2)");
getElement("#dispatchManagementManualBtn").listeners.click();

assert.equal(getElement("#dispatchManagementConfirmDialog").open, true, "manual dispatch should require confirmation");
assert.equal(windowMock.DispatchManagement.getDemoState().assignmentCount, 0, "manual dispatch must not execute before confirmation");
assert.equal((getElement("#dispatchManagementConfirmMatches").innerHTML.match(/<tr>/g) || []).length, 2);
assert.match(getElement("#dispatchManagementConfirmMatches").innerHTML, /王海[\s\S]*浙B20001/);
assert.equal(windowMock.DispatchManagement.getPendingPlan().assignments.length, 2);
getElement("#dispatchManagementConfirmCancel").listeners.click();
assert.equal(getElement("#dispatchManagementConfirmDialog").open, false);
assert.equal(windowMock.DispatchManagement.getDemoState().assignmentCount, 0, "cancel should leave tasks and vehicles unchanged");
getElement("#dispatchManagementManualBtn").listeners.click();
getElement("#dispatchManagementConfirmSubmit").listeners.click();

const manualState = windowMock.DispatchManagement.getDemoState();
assert.equal(manualState.assignmentCount, 2);
assert.equal(manualState.tasks.find((task) => task.id === "DM-001").status, "已派单");
assert.equal(manualState.tasks.find((task) => task.id === "DM-002").status, "已派单");
assert.equal(dispatches[0].status, "待派单", "demo dispatch must not mutate the global dispatch store");
assert.equal(dispatches[1].status, "待派单", "demo dispatch must not mutate the global dispatch store");
assert.equal(waybills[0].plateNo, undefined, "demo dispatch must not mutate waybills");
assert.equal(drivers[0].driverState, "空闲", "demo dispatch must not mutate driver state");
assert.equal(drivers[2].driverState, "空闲", "demo dispatch must not mutate driver state");
assert.equal(getElement("#dispatchManagementResultDialog").open, true);
assert.equal(getElement("#dispatchManagementResultTitle").textContent, "批量派单成功");
assert.equal(getElement("#dispatchManagementResultTotal").textContent, "2");
assert.equal(getElement("#dispatchManagementResultSuccess").textContent, "2");
assert.equal(getElement("#dispatchManagementResultUnassigned").textContent, "0");
assert.equal(getElement("#dispatchManagementResultView").hidden, false);
getElement("#dispatchManagementResultView").listeners.click();
assert.equal(navigatedPage, "dispatch-list");
assert.equal(getElement("#dispatchManagementResultDialog").open, false);
assert.equal(savedWaybills, 0);
assert.equal(savedDispatches, 0);
assert.equal(renderedAutoDispatch, 0);

windowMock.DispatchManagement.reset();
const resetState = windowMock.DispatchManagement.getDemoState();
assert.equal(resetState.assignmentCount, 0);
assert.equal(resetState.tasks.filter((task) => task.status === "待派单").length, 15);

getElement("#dispatchManagementAutoBtn").listeners.click();
assert.equal(getElement("#dispatchManagementConfirmDialog").open, true, "automatic dispatch should require confirmation");
assert.equal(windowMock.DispatchManagement.getDemoState().assignmentCount, 0, "automatic dispatch must not execute before confirmation");
assert.equal((getElement("#dispatchManagementConfirmMatches").innerHTML.match(/<tr>/g) || []).length, 3);
assert.equal(getElement("#dispatchManagementConfirmUnassigned").hidden, false);
assert.equal(windowMock.DispatchManagement.getPendingPlan().unassignedTaskIds.length, 12);
getElement("#dispatchManagementConfirmSubmit").listeners.click();
const autoState = windowMock.DispatchManagement.getDemoState();
assert.equal(autoState.assignmentCount, 3);
assert.equal(autoState.tasks.filter((task) => task.status === "已派单").length, 3);
assert.equal(autoState.tasks.filter((task) => task.status === "待派单").length, 12);
assert.equal(getElement("#dispatchManagementResultTitle").textContent, "自动派单部分完成");
assert.equal(getElement("#dispatchManagementResultTotal").textContent, "15");
assert.equal(getElement("#dispatchManagementResultSuccess").textContent, "3");
assert.equal(getElement("#dispatchManagementResultUnassigned").textContent, "12");
assert.match(getElement("#dispatchManagementResultMessage").textContent, /未派任务将继续保留在当前列表/);

windowMock.DispatchManagement.reset();
assert.equal(windowMock.DispatchManagement.getDemoState().assignmentCount, 0);
assert.equal(windowMock.DispatchManagement.getDemoState().tasks.filter((task) => task.status === "待派单").length, 15);

windowMock.DispatchManagement.setPermissions({ auto: false, manual: true });
assert.equal(getElement("#dispatchManagementAutoBtn").hidden, true);
assert.equal(getElement("#dispatchManagementManualBtn").hidden, false);

console.log("Dispatch management workbench test passed");
