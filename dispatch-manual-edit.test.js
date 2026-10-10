const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const source = fs.readFileSync("app.js", "utf8");
const start = source.indexOf('dispatchForm.addEventListener("submit"');
const end = source.indexOf('dispatchBody.addEventListener("change"', start);
assert.ok(start >= 0 && end > start);

const route = { id: "XL-001", routeName: "港区线路", origin: "港区", destination: "仓库", estimatedRevenue: 2900 };
const waybill = { waybillNo: "WB-EDIT", orderDate: "2026-09-27", loadAddress: "港区 / 仓库" };
const dispatch = {
  id: "PD-EDIT", waybillNo: "WB-EDIT", status: "已派单", dispatchMode: "auto", dispatchTime: "2026-09-27 08:00",
  currentNode: "待提货", driverId: "SJ-OLD", driverName: "原司机", vehicleId: "浙B-001", note: "原备注", pushed: true,
  timeline: [{ node: "已派单", time: "2026-09-27 08:00", desc: "原派单", photos: [] }],
};
const nextDriver = { id: "SJ-NEW", name: "新司机", phone: "13800000000", driverState: "空闲" };
const form = {
  dispatchMode: "edit",
  editingDispatchId: dispatch.id,
  elements: { waybillId: { value: waybill.waybillNo }, driverId: { value: nextDriver.id }, vehicleId: { value: "浙B-002" }, note: { value: " 变更后备注 " } },
  addEventListener(name, handler) { this[name] = handler; },
};
const context = vm.createContext({
  dispatchForm: form,
  dispatches: [dispatch],
  waybills: [waybill],
  drivers: [nextDriver],
  vehicles: [{ plateNo: "浙B-002", vehicleState: "在用" }],
  availableOwnDrivers: () => [nextDriver],
  getRouteForWaybill: () => route,
  formatWaybillBoxes: () => "箱 / 40HQ",
  calculateRouteCommission: () => 420,
  window: { DispatchStore: { nowText: () => "2026-09-27 09:30" }, AutoDispatchManager: { refresh() {} } },
  saveWaybills() {}, saveDispatches() {}, syncDriverOperationalStates() {},
  renderRows() {}, renderDispatchPage() {}, renderDriverPage() {}, renderDashboard() {}, getFilteredDispatches: () => [], filterRows: () => [], getFilteredDrivers: () => [],
  closeDispatchForm() {}, dispatchQueryForm: { reset() {}, elements: { dispatchMode: { value: "" } } }, queryForm: {},
  FormData: class { get() { return ""; } },
});
vm.runInContext(source.slice(start, end), context);
form.submit({ preventDefault() {} });
assert.equal(dispatch.dispatchMode, "manual");
assert.equal(dispatch.driverId, "SJ-NEW");
assert.equal(dispatch.vehicleId, "浙B-002");
assert.equal(dispatch.note, "变更后备注");
assert.equal(dispatch.timeline.at(-1).node, "派单调整");
assert.equal(waybill.driverId, "SJ-NEW");
assert.equal(waybill.plateNo, "浙B-002");
console.log("Manual dispatch edit test passed");
