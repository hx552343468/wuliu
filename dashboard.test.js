const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const app = fs.readFileSync("app.js", "utf8");
const css = fs.readFileSync("styles.css", "utf8");

if (!html.includes("首页看板") || html.includes('data-page="vehicle-dashboard" type="button">调度看板')) {
  throw new Error("Dashboard must be presented as 首页看板");
}

for (const id of [
  "dashboardPage",
  "dashboardFilters",
  "dashboardCustomerFilter",
  "dashboardProjectFilter",
  "dashboardRouteFilter",
  "dashboardNearCompleteThreshold",
  "dashboardVehicleStatus",
  "dashboardDriverStatus",
  "dashboardVehicleDonut",
  "dashboardDriverDonut",
  "dashboardCompletionGauge",
  "dashboardTaskMetrics",
  "dashboardCapacityTasks",
  "dashboardPlanCompletion",
  "dashboardAmountTotals",
  "dashboardAmountDistribution",
  "dashboardWarningSummary",
  "dashboardWarningStats",
  "dashboardCredentialWarnings",
  "refreshDashboardBtn",
]) {
  if (!html.includes(`id="${id}"`)) throw new Error(`Missing dashboard element: ${id}`);
}

const commandIndex = html.indexOf('class="dashboard-command-bar"');
const amountIndex = html.indexOf('class="dashboard-panel amount-panel"');
const overviewIndex = html.indexOf('class="dashboard-overview-grid"');
if (!(commandIndex < amountIndex && amountIndex < overviewIndex)) {
  throw new Error("Transportation amount must sit directly below the operations overview");
}

for (const label of ["今日运营全局", "运力状态", "今日任务", "实时运力任务", "计划完成统计", "运输金额", "证照预警", "快完成规则"]) {
  if (!html.includes(label) && !app.includes(label)) throw new Error(`Missing dashboard label: ${label}`);
}

for (const removedLabel of ["车辆调度工作台", "派单工作台", "线路运营工作台", "调度提醒", "固定线路今日负荷", "闲置可派车辆", "待执行任务"]) {
  if (html.includes(removedLabel) || app.includes(removedLabel)) throw new Error(`Removed dashboard label still present: ${removedLabel}`);
}

for (const removedId of ["dashboardWorkbenchVehicle", "dashboardWorkbenchDispatch", "dashboardWorkbenchRoute", "dashboardDispatchAlert", "dashboardRouteLoads", "dashboardIdleVehicles", "dashboardPendingTasks", "dashboardCreateDispatchBtn"]) {
  if (html.includes(removedId) || app.includes(removedId)) throw new Error(`Removed dashboard element still present: ${removedId}`);
}

for (const token of ["dashboardToday", "getDashboardVehicleState", "renderDashboard", "openDashboardTarget"]) {
  if (!app.includes(token)) throw new Error(`Missing dashboard logic: ${token}`);
}

for (const selector of [".dashboard-command-bar", ".dashboard-filters", ".dashboard-overview-grid", ".dashboard-detail-grid", ".capacity-donut", ".task-completion-gauge", ".capacity-status-item", ".capacity-task-row", ".plan-completion-row", ".amount-total", ".credential-warning-panel", ".credential-warning-item"]) {
  if (!css.includes(selector)) throw new Error(`Missing dashboard style: ${selector}`);
}

for (const removedSelector of [".dashboard-workbench-grid", ".dashboard-main-grid", ".dispatch-alert-content", ".dashboard-route-panel", ".route-load-row", ".dashboard-bottom-grid", ".dashboard-list-row", ".dashboard-welcome-grid"]) {
  if (css.includes(removedSelector)) throw new Error(`Removed dashboard style still present: ${removedSelector}`);
}

if (!fs.existsSync("vendor/lucide.min.js") || !html.includes('src="vendor/lucide.min.js"')) {
  throw new Error("Missing local Lucide icon runtime");
}

for (const icon of ["truck", "user-round", "triangle-alert", "refresh-cw", "chevron-right"]) {
  if (!html.includes(`data-lucide="${icon}"`) && !app.includes(`data-lucide="${icon}"`)) throw new Error(`Missing dashboard icon: ${icon}`);
}

console.log("Vehicle dispatch dashboard structure test passed");
