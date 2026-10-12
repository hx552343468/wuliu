const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const source = fs.readFileSync("app.js", "utf8");

function readDeclaration(startText, endText, exportText) {
  const start = source.indexOf(startText);
  const end = source.indexOf(endText, start);
  assert.ok(start >= 0 && end > start, `${startText} declaration must exist`);
  const context = vm.createContext({});
  vm.runInContext(`${source.slice(start, end)}\nthis.value = ${exportText};`, context);
  return context.value;
}

function assertBusinessFields(records, fields, label) {
  const invalid = new Set(["", "undefined", "null", "nan"]);
  records.forEach((record) => {
    fields.forEach((field) => {
      const value = String(record[field] ?? "").trim().toLowerCase();
      assert.ok(!invalid.has(value), `${label} ${record.id || record.plateNo || record.waybillNo} missing ${field}`);
    });
  });
}

const waybills = readDeclaration("const waybills = [", "const WAYBILL_STORAGE_KEY", "waybills");
const fleetRecords = readDeclaration("const trailers = [", "const inspectionRecords", "({ trailers, vehicles })");
const dispatchSeed = readDeclaration("const dispatchSeed = [", "const dispatches =", "dispatchSeed");

assertBusinessFields(waybills, ["waybillNo", "taskType", "executionTime", "dispatchMode", "customerName", "projectName", "routeId"], "waybill");
assertBusinessFields(fleetRecords.vehicles, ["plateNo", "driver", "fleetName", "trailerId", "vehicleType", "vin", "engineNo", "permitNo", "ownership", "vehicleState", "inspectionDue", "insuranceDue", "attachments"], "vehicle");
assertBusinessFields(dispatchSeed, ["id", "waybillNo", "planTaskNo", "taskType", "dispatchMode", "customerName", "projectName", "routeName", "driverName", "phone", "vehicleId", "trailerId", "vehicleType", "status", "currentNode"], "dispatch");

const renderStart = source.indexOf("function renderVehicleRows(");
const renderEnd = source.indexOf("function renderReminderCards(", renderStart);
const vehicleRenderer = source.slice(renderStart, renderEnd);
assert.match(vehicleRenderer, /businessCell\(vehicle\.vehicleType, "待维护车型"\)/);
assert.match(vehicleRenderer, /businessCell\(getVehicleDriverLabel\(vehicle\), "未绑定司机"\)/);
assert.doesNotMatch(vehicleRenderer, /<td>\$\{vehicle\.(?:vehicleType|vin|engineNo|permitNo|ownership|driver|inspectionDue|insuranceDue|attachments)\}<\/td>/);

console.log("Business demo data completeness test passed");
