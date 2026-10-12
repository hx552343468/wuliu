const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const html = fs.readFileSync("index.html", "utf8");
const source = fs.readFileSync("app.js", "utf8");
const styles = fs.readFileSync("styles.css", "utf8");

assert.match(html, /id="vehicleReminderCards"[^>]*aria-labelledby="vehicleInsuranceSummaryTitle"/);
assert.match(source, /id="vehicleInsuranceSummaryTitle">车辆保险情况<\/h2>/);
for (const status of ["expired", "insurance", "inspection", "normal"]) {
  assert.match(source, new RegExp(`renderCard\\("${status}"`));
}
assert.match(source, /data-vehicle-due-status="\$\{status\}"/);
assert.match(source, /vehicleQueryForm\.elements\.dueStatus\.value = status/);
assert.match(styles, /#vehicleReminderCards \.reminder-card\.is-active/);

const start = source.indexOf("function applyVehicleDueStatusFilter(");
const end = source.indexOf("function renderVehicleDetailBase(", start);
assert.ok(start >= 0 && end > start, "vehicle summary filter helper must exist");

let renderArgs = null;
const context = vm.createContext({
  vehicleQueryForm: { elements: { dueStatus: { value: "" } } },
  vehicleCurrentPage: 4,
  getFilteredVehicles: () => ["filtered"],
  getWarningDays: () => 30,
  renderVehiclePage: (...args) => { renderArgs = args; },
});
vm.runInContext(`${source.slice(start, end)}\nthis.applyFilter = applyVehicleDueStatusFilter;`, context);
context.applyFilter("insurance");
assert.equal(context.vehicleQueryForm.elements.dueStatus.value, "insurance");
assert.equal(context.vehicleCurrentPage, 1);
assert.deepEqual(renderArgs, [["filtered"], 30]);

console.log("Vehicle summary card filtering test passed");
