const assert = require("node:assert/strict");
const fs = require("node:fs");

const html = fs.readFileSync("admin-mobile.html", "utf8");
const script = fs.readFileSync("admin-mobile.js", "utf8");
const desktop = fs.readFileSync("index.html", "utf8");

assert.match(desktop, /href="admin-mobile\.html"[^>]*>管理移动端<\/a>\s*<a class="mobile-entry" href="mobile\.html"/);
assert.match(html, /data-view="workbench"[\s\S]*data-view="messages"[\s\S]*data-view="profile"/);

for (const label of ["运单管理", "固定线路", "派单列表", "自动派单", "车辆档案", "司机档案", "客户管理", "到期提醒"]) {
  assert.ok(html.includes(label), `工作台缺少 ${label} 入口`);
}

for (const moduleName of ["waybill", "route", "dispatch", "auto", "vehicle", "driver", "customer", "reminder"]) {
  assert.match(script, new RegExp(`\\b${moduleName}: \\{`), `缺少 ${moduleName} 移动业务数据`);
}

assert.match(script, /function openModule\(/);
assert.match(script, /function openDetail\(/);
assert.match(script, /moduleSearch.*addEventListener\("input"/);
assert.match(script, /classList\.add\("subpage-open"\)/);
assert.match(html, /vendor\/lucide\.min\.js/);

console.log("admin mobile tests passed");
