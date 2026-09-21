const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const app = fs.readFileSync("app.js", "utf8");
const css = fs.readFileSync("styles.css", "utf8");

for (const id of [
  "dashboardPage",
  "dashboardVehicleStats",
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

for (const selector of [".dashboard-vehicle-stats", ".dashboard-main-grid", ".route-load-row", ".dashboard-bottom-grid"]) {
  if (!css.includes(selector)) throw new Error(`Missing dashboard style: ${selector}`);
}

console.log("Vehicle dispatch dashboard structure test passed");
