const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const html = fs.readFileSync("index.html", "utf8");
const app = fs.readFileSync("app.js", "utf8");
const auto = fs.readFileSync("auto-dispatch.js", "utf8");
assert.match(html, /data-page="waybill"[^>]*>计划管理/);
for (const id of ["planTaskDialog", "planTaskForm", "planTaskBatchInput", "planRouteSelect", "planExecutionTime", "planBoxType", "batchPlanTaskBtn", "planTaskQuantity", "generatePlanTaskBtn", "planTaskList", "planTaskListToggleBtn"]) {
  assert.ok(html.includes(`id="${id}"`), `缺少计划任务控件 ${id}`);
}
const planDialogMarkup = html.slice(html.indexOf('id="planTaskDialog"'), html.indexOf('</dialog>', html.indexOf('id="planTaskDialog"')));
assert.doesNotMatch(planDialogMarkup, /派发策略|name="dispatchMode"|name="batchDispatchMode"|planAdvanceMinutes|planBatchAdvanceMinutes/);
assert.match(planDialogMarkup, /统一进入待派发池/);
for (const id of ["planTaskTextInput", "planTaskTextRecognizeBtn"]) assert.ok(html.includes(`id="${id}"`), `缺少文字识别控件 ${id}`);
assert.ok(!html.includes('id="planRoutePreview"'), "不应再展示已选线路模块");
assert.match(app, /function renderPlanTaskList\(/);
assert.match(app, /function resizePlanTaskList\(/);
assert.match(app, /data-plan-task-row-route/);
assert.match(app, /data-plan-task-row-box/);
assert.match(app, /data-plan-task-delete/);
assert.match(app, /planTaskListItems\.splice\(index, 1\)/);
assert.match(app, /generatePlanTaskBtn/);
assert.match(app, /请先点击“生成派单任务”生成任务清单/);
const routeOptionsStart = app.indexOf("function getPlanTaskRouteOptions(");
const routeOptionsEnd = app.indexOf("function getPlanTaskBoxOptions(", routeOptionsStart);
assert.ok(routeOptionsStart >= 0 && routeOptionsEnd > routeOptionsStart, "缺少计划任务线路选项生成器");
assert.doesNotMatch(app.slice(routeOptionsStart, routeOptionsEnd), /routeCode/);
assert.match(html, /<th>计划任务<\/th><th>客户<\/th><th>项目<\/th><th>线路<\/th><th>线路节点<\/th>/);
const planTableMarkup = html.slice(html.indexOf('class="fixed-action-table plan-task-table"'), html.indexOf("</table>", html.indexOf('class="fixed-action-table plan-task-table"')));
assert.doesNotMatch(planTableMarkup, /派发模式/);
const renderRowsStart = app.indexOf("function renderRows(");
const renderRowsEnd = app.indexOf("function normalize(", renderRowsStart);
assert.doesNotMatch(app.slice(renderRowsStart, renderRowsEnd), /dispatch-mode|const mode = auto/);
assert.match(app.slice(renderRowsStart, renderRowsEnd), /colspan="11"/);
assert.equal((html.match(/id="planTaskDetailPage"/g) || []).length, 1, "计划详情使用独立二级页面");
assert.ok(html.includes('id="planTaskDetailBackBtn"'), "计划详情页应提供返回计划任务列表入口");
assert.ok(html.includes('id="planTaskDetailPageContent"'), "计划详情页应有独立内容容器");
assert.doesNotMatch(html, /id="planDispatchDetailDialog"|id="planDispatchDetailContent"/, "计划详情不应继续使用弹窗");
assert.doesNotMatch(html, /id="planWaybillDetailDialog"|id="planWaybillDetailContent"|<strong>运单详情<\/strong>/, "计划详情中不应再有运单详情页面");
assert.match(app, /data-view-plan-dispatch=.*?type="button">查看详情/);
assert.match(html, /id="cancelPlanDialog"/);
assert.match(app, /data-cancel-plan=/);
assert.match(app, /function requestCancelPlan\(/);
assert.match(app, /function cancelPlan\(/);
assert.doesNotMatch(app, /const hasException = dispatchList\.some/);
assert.match(app, /planStatus = "已取消"/);
assert.match(app, /switchPage\("plan-task-detail"\)/);
assert.match(app, /planTaskDetailBackBtn\?\.addEventListener\("click", \(\) => switchPage\("waybill"\)\)/);
assert.doesNotMatch(app, /data-view-plan-waybills|data-view-waybill-detail|查看运单/);
assert.match(app, /<strong>计划信息<\/strong>[\s\S]*<strong>派单情况<\/strong>/);
assert.match(app, /<span>计划编号<\/span>[\s\S]*<span>客户<\/span>[\s\S]*<span>项目<\/span>[\s\S]*<span>任务类型<\/span>[\s\S]*<span>执行时间<\/span>[\s\S]*<span>运输线路<\/span>/);
for (const type of ["提空装货", "提重送货", "排空箱（A→B）", "排重箱（A→B）"]) assert.ok(html.includes(type), `缺少任务类型 ${type}`);
for (const customer of ["华贸", "陆港多联", "中铁联集项目"]) assert.ok(app.includes(`customerName: "${customer}"`), `缺少客户 ${customer}`);
for (const project of ["比亚迪", "提箱装货", "X387", "X8588", "X8786", "捷运通BYD", "聚丙烯"]) assert.ok(app.includes(`projectName: "${project}"`), `缺少项目 ${project}`);
for (const field of ["pickupPoint", "loadingPoint", "unloadingPoint", "dropoffPoint"]) assert.match(app, new RegExp(`${field}:`), `缺少线路节点字段 ${field}`);
assert.match(app, /function parsePlanTaskCsv\(/);
assert.match(app, /function createPlanTaskRecords\(/);
assert.match(app, /renderRouteStops\(route/);
assert.doesNotMatch(app, /isPlanTaskAutoDispatch|input\[name="batchDispatchMode"\]|input\[name="dispatchMode"\]/);
assert.match(auto, /function isAutoDispatchDue\(/);

const start = app.indexOf("function resolvePlanTaskRoute(");
const end = app.indexOf("function refreshAfterPlanTaskCreate(", start);
const waybills = [];
const dispatches = [];
const context = vm.createContext({
  waybills,
  dispatches,
  fixedRoutes: [{ id: "XL-001", routeCode: "XL-NB-001", routeName: "北仑港至江北仓", customerId: "KH-ZT", projectId: "PR-ZT-X8786", projectName: "X8786", origin: "港区", destination: "仓库", routeState: "启用", estimatedRevenue: 2860, baseFreight: 2600 }, { id: "XL-002", routeCode: "XL-NB-002", routeName: "梅山港至金华南站", customerId: "KH-ZT", projectId: "PR-ZT-X387", projectName: "X387", origin: "梅山港", destination: "金华南站", routeState: "启用", estimatedRevenue: 2550, baseFreight: 2380 }],
  routeAccountCatalog: [{ customerId: "KH-ZT", projectId: "PR-ZT-X387", projectName: "X387" }, { customerId: "KH-ZT", projectId: "PR-ZT-X8786", projectName: "X8786" }],
  getRouteAccount: (customerId, projectId) => ({ customerId, projectId, projectName: "X8786" }),
  waybillRouteMap: {},
  PLAN_TASK_TYPES: ["提空装货", "提重送货", "排空箱（A→B）", "排重箱（A→B）"],
  normalize: (value) => String(value || "").trim().toLowerCase(),
  getNextWaybillNo: () => `WB20260928001`,
  createPendingDispatch(waybill, route) { dispatches.push({ waybillNo: waybill.waybillNo, status: "待派单", routeId: route.id, autoDispatch: waybill.autoDispatch }); },
  saveWaybills() {},
  window: { CustomerManager: { getActiveCustomerByName: () => ({ customerNo: "KH-1008" }) } },
});
vm.runInContext(app.slice(start, end), context);
const result = context.createPlanTaskRecords([{ executionTime: "2026-09-28 08:00", routeValue: "北仑港至江北仓", boxType: "40HQ", customerName: "宁波远海供应链有限公司", projectName: "进口柜日配", taskType: "提空装货", autoDispatch: true, dispatchAdvanceMinutes: 30 }]);
assert.equal(result.created.length, 1);
assert.equal(waybills[0].taskType, "提空装货");
assert.equal(waybills[0].projectId, "PR-ZT-X8786");
assert.equal(waybills[0].autoDispatch, false, "new plan tasks enter the pending pool without an auto-dispatch choice");
assert.equal(waybills[0].dispatchAdvanceMinutes, 0);
assert.equal(dispatches[0].status, "待派单");
const varied = context.createPlanTaskRecords([{ executionTime: "2026-09-28 09:00", routeId: "XL-001", boxType: "40HQ", customerName: "宁波远海供应链有限公司", projectName: "进口柜日配", taskType: "提空装货", taskItems: [{ routeId: "XL-001", boxType: "20GP" }, { routeId: "XL-002", boxType: "40GP" }], quantity: 2 }]);
assert.equal(varied.created.length, 2);
assert.equal(varied.created[0].planTaskId, varied.created[1].planTaskId);
assert.deepEqual(new Set(varied.created.map((item) => item.routeId)), new Set(["XL-001", "XL-002"]));
assert.deepEqual(new Set(varied.created.map((item) => item.boxType)), new Set(["20GP", "40GP"]));
console.log("Plan task creation test passed");
