const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const html = fs.readFileSync("index.html", "utf8");
const source = fs.readFileSync("app.js", "utf8");
const styles = fs.readFileSync("styles.css", "utf8");

assert.match(html, /data-page="vehicle-archives"[^>]*id="vehicleArchiveNav"/);
assert.match(html, /id="vehicleInsuranceExpiredBadge"[^>]*hidden>0<\/span>/);
assert.match(html, /id="vehicleInsuranceExpiredTooltip"[^>]*role="tooltip"[^>]*hidden/);
assert.match(styles, /\.nav-alert-count\s*\{[\s\S]*?background:\s*#dc3545;/);
assert.match(styles, /\.nav-child-alert:hover \.nav-alert-tooltip/);

const start = source.indexOf("function countExpiredVehicleInsurances(");
const end = source.indexOf("function renderVehiclePagination(", start);
assert.ok(start >= 0 && end > start, "vehicle insurance navigation alert helpers must exist");

const nodes = new Map([
  ["#vehicleInsuranceExpiredBadge", { textContent: "", hidden: true }],
  ["#vehicleInsuranceExpiredTooltip", { textContent: "", hidden: true }],
]);
const context = vm.createContext({
  vehicles: [
    { plateNo: "浙B·K7812", insuranceDue: "2026-10-05" },
    { plateNo: "沪D·A9021", insuranceDue: "2026-11-12" },
    { plateNo: "苏E·T5568", insuranceDue: "2026-09-10" },
    { plateNo: "浙A·F2190", insuranceDue: "2026-09-30" },
  ],
  document: { querySelector: (selector) => nodes.get(selector) },
});
vm.runInContext(`${source.slice(start, end)}\nthis.api = { countExpiredVehicleInsurances, renderVehicleInsuranceNavAlert };`, context);

assert.equal(context.api.countExpiredVehicleInsurances(context.vehicles, new Date("2026-10-12T00:00:00")), 3);
context.api.renderVehicleInsuranceNavAlert(new Date("2026-10-12T00:00:00"));
const badge = nodes.get("#vehicleInsuranceExpiredBadge");
const tooltip = nodes.get("#vehicleInsuranceExpiredTooltip");
assert.equal(badge.textContent, "3");
assert.equal(badge.hidden, false);
assert.equal(tooltip.textContent, "3个保险已过期，请及时处理");
assert.equal(tooltip.hidden, false);

context.vehicles.forEach((vehicle) => { vehicle.insuranceDue = "2099-12-31"; });
context.api.renderVehicleInsuranceNavAlert(new Date("2026-10-12T00:00:00"));
assert.equal(badge.hidden, true);
assert.equal(tooltip.hidden, true);

console.log("Vehicle navigation insurance alert tests passed");
