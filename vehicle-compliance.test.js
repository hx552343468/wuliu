const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const source = fs.readFileSync("app.js", "utf8");
const html = fs.readFileSync("index.html", "utf8");

assert.match(html, /id="inspectionModule"[\s\S]*?id="addInspectionRecordBtn"[\s\S]*?id="inspectionBody"/);
assert.match(html, /id="insuranceModule"[\s\S]*?id="addInsurancePolicyBtn"[\s\S]*?id="insuranceBody"/);
assert.match(html, /id="inspectionRecordDialog"[\s\S]*?id="inspectionRecordForm"/);
assert.match(html, /id="insurancePolicyDialog"[\s\S]*?id="insurancePolicyForm"/);
assert.doesNotMatch(html.slice(html.indexOf('id="inspectionModule"'), html.indexOf('id="insuranceModule"')), /审验信息登记/);
assert.doesNotMatch(html.slice(html.indexOf('id="insuranceModule"'), html.indexOf('id="remindersModule"')), /保险保单录入/);

const start = source.indexOf("function complianceRecordValue(");
const end = source.indexOf("function renderReminderRows(", start);
assert.ok(start >= 0 && end > start, "compliance record renderers and creation helpers must exist");

const context = vm.createContext({
  selectedVehicle: { plateNo: "浙B·K7812", inspectionDue: "2026-10-18", insuranceDue: "2026-10-05", mandatoryInsuranceExpiry: "2026-10-05" },
  vehicles: [],
  inspectionRecords: [],
  insurancePolicies: [],
  inspectionRecordFields: ["plateNo", "inspectionType", "inspectionDate", "nextInspectionDue", "inspectionAgency", "inspectionFee", "inspectionResult", "remark"],
  insurancePolicyFields: ["plateNo", "insuranceType", "insuranceCompany", "policyNo", "insuredAmount", "policyExpiry", "premium", "policyPeriod", "attachment", "policyStart", "remark"],
  daysUntil: (date) => Math.ceil((new Date(`${date}T00:00:00`) - new Date("2026-10-12T00:00:00")) / 86400000),
  dashboardEscape: (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])),
  formatMoney: (value) => `¥${Number(value).toFixed(2)}`,
  document: { querySelector: () => ({ innerHTML: "" }) },
  saveVehicleComplianceRecords() {},
});
vm.runInContext(`${source.slice(start, end)}\nthis.api = { renderInspectionRows, renderInsuranceRows, addInspectionRecord, addInsurancePolicy };`, context);

context.vehicles.push(context.selectedVehicle);
context.inspectionRecords.push(["浙B·K7812", "车辆年检", "2025-10-18", "2026-10-18", "宁波检测中心", 680, "通过"]);
context.insurancePolicies.push(["浙B·K7812", "交强险", "太平洋财险", "OLD-001", 1000000, "2026-10-05", 8600, "2025-10-06 至 2026-10-05", "电子保单"]);
context.api.addInspectionRecord({ plateNo: "浙B·K7812", inspectionType: "车辆年检", inspectionDate: "2026-10-12", nextInspectionDue: "2027-10-12", inspectionAgency: "宁波检测中心", inspectionFee: "700", inspectionResult: "通过", remark: "续审" });
context.api.addInsurancePolicy({ plateNo: "浙B·K7812", insuranceType: "交强险", insuranceCompany: "太平洋财险", policyNo: "NEW-001", insuredAmount: "1000000", policyStart: "2026-10-06", policyExpiry: "2027-10-05", premium: "8700", attachment: "新保单.pdf" });

assert.equal(context.inspectionRecords.length, 2, "new inspection should preserve historical record");
assert.equal(context.insurancePolicies.length, 2, "new policy should preserve historical policy");
assert.equal(context.selectedVehicle.inspectionDue, "2027-10-12");
assert.equal(context.selectedVehicle.mandatoryInsuranceExpiry, "2027-10-05");
assert.equal(context.selectedVehicle.insuranceDue, "2027-10-05");
console.log("Vehicle compliance record tests passed");
