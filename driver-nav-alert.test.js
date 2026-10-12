const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const html = fs.readFileSync("index.html", "utf8");
const source = fs.readFileSync("app.js", "utf8");
const styles = fs.readFileSync("styles.css", "utf8");

assert.match(html, /data-page="driver-archives"[^>]*id="driverArchiveNav"/);
assert.match(html, /id="driverCredentialExpiredBadge"[^>]*hidden>0<\/span>/);
assert.match(html, /id="driverCredentialExpiredTooltip"[^>]*role="tooltip"[^>]*hidden/);
assert.match(styles, /\.nav-alert-count\s*\{[\s\S]*?background:\s*#dc3545;/);
assert.match(styles, /\.nav-child-alert:hover \.nav-alert-tooltip/);

const start = source.indexOf("function countExpiredDriverCredentials(");
const end = source.indexOf("function renderDriverSummaryCards(", start);
assert.ok(start >= 0 && end > start, "driver credential navigation alert helpers must exist");

const nodes = new Map([
  ["#driverCredentialExpiredBadge", { textContent: "", hidden: true }],
  ["#driverCredentialExpiredTooltip", { textContent: "", hidden: true }],
]);
const context = vm.createContext({
  drivers: [
    { name: "王海", licenseExpiry: "2027-05-18", qualificationExpiry: "2026-10-08" },
    { name: "赵亮", licenseExpiry: "2026-09-28", qualificationExpiry: "2026-12-18" },
    { name: "刘军", licenseExpiry: "2026-08-30", qualificationExpiry: "2026-09-10" },
    { name: "陈涛", licenseExpiry: "2028-03-15", qualificationExpiry: "2027-12-20" },
  ],
  document: { querySelector: (selector) => nodes.get(selector) },
});
vm.runInContext(`${source.slice(start, end)}\nthis.api = { countExpiredDriverCredentials, renderDriverCredentialNavAlert };`, context);

assert.equal(context.api.countExpiredDriverCredentials(context.drivers, new Date("2026-10-12T00:00:00")), 3);
context.api.renderDriverCredentialNavAlert(new Date("2026-10-12T00:00:00"));
const badge = nodes.get("#driverCredentialExpiredBadge");
const tooltip = nodes.get("#driverCredentialExpiredTooltip");
assert.equal(badge.textContent, "3");
assert.equal(badge.hidden, false);
assert.equal(tooltip.textContent, "3个证件已过期，请及时处理");
assert.equal(tooltip.hidden, false);

context.drivers.forEach((driver) => {
  driver.licenseExpiry = "2099-12-31";
  driver.qualificationExpiry = "2099-12-31";
});
context.api.renderDriverCredentialNavAlert(new Date("2026-10-12T00:00:00"));
assert.equal(badge.hidden, true);
assert.equal(tooltip.hidden, true);

console.log("Driver navigation credential alert tests passed");
