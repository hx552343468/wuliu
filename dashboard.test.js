const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const app = fs.readFileSync("app.js", "utf8");
const css = fs.readFileSync("styles.css", "utf8");

if (!html.includes("首页看板") || html.includes('data-page="vehicle-dashboard" type="button">调度看板')) {
  throw new Error("Dashboard must be presented as 首页看板");
}

for (const id of [
  "dashboardPage",
  "dashboardWelcomeTaskCount",
  "dashboardWelcomeVehicleCount",
  "dashboardWelcomePendingCount",
  "dashboardVehicleStats",
  "dashboardWorkbenchVehicle",
  "dashboardWorkbenchDispatch",
  "dashboardWorkbenchRoute",
  "dashboardTaskMetrics",
  "dashboardRouteLoads",
  "dashboardIdleVehicles",
  "dashboardPendingTasks",
  "refreshDashboardBtn",
  "dashboardCreateDispatchBtn",
]) {
  if (!html.includes(`id="${id}"`)) throw new Error(`Missing dashboard element: ${id}`);
}

for (const label of ["闲置可派车", "正在运输", "已完工", "维修停用", "今日任务进度", "固定线路今日负荷", "待执行任务"]) {
  if (!html.includes(label) && !app.includes(label)) throw new Error(`Missing dashboard label: ${label}`);
}

for (const token of ["dashboardToday", "getDashboardVehicleState", "dashboardRouteCapacity", "renderDashboard", "openDashboardTarget"]) {
  if (!app.includes(token)) throw new Error(`Missing dashboard logic: ${token}`);
}

for (const selector of [".dashboard-welcome-grid", ".quick-entry-grid", ".dashboard-workbench-grid", ".dashboard-vehicle-stats", ".dashboard-main-grid", ".route-load-row", ".dashboard-bottom-grid"]) {
  if (!css.includes(selector)) throw new Error(`Missing dashboard style: ${selector}`);
}

if (!fs.existsSync("vendor/lucide.min.js") || !html.includes('src="vendor/lucide.min.js"')) {
  throw new Error("Missing local Lucide icon runtime");
}

for (const icon of ["truck", "clipboard-list", "clock-3", "route", "refresh-cw", "chevron-right", "arrow-right"]) {
  if (!html.includes(`data-lucide="${icon}"`) && !app.includes(`data-lucide="${icon}"`)) throw new Error(`Missing dashboard icon: ${icon}`);
}

console.log("Vehicle dispatch dashboard structure test passed");
