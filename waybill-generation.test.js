const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const html = fs.readFileSync("index.html", "utf8");
const form = html.slice(html.indexOf('id="waybillForm"'), html.indexOf("</form>", html.indexOf('id="waybillForm"')));
assert.match(form, /id="generatedWaybillNo"/);
assert.match(form, /id="generatedOrderDate"/);
assert.match(form, /name="waybillNo" type="hidden"/);
assert.match(form, /name="orderDate" type="hidden"/);
assert.doesNotMatch(form, /name="waybillNo" required/);
assert.doesNotMatch(form, /name="orderDate" type="date"/);

const source = fs.readFileSync("app.js", "utf8");
const start = source.indexOf("function getCurrentOrderDate()");
const end = source.indexOf("function createFeeRow(", start);
assert.ok(start >= 0 && end > start);
const waybills = [
  { waybillNo: "WB20260916003" },
  { waybillNo: "WB20260916009" },
  { waybillNo: "WB20260920021" },
  { waybillNo: "WB20260921001" },
];
const fields = { waybillNo: { value: "" }, orderDate: { value: "" } };
const nodes = new Map();
const context = vm.createContext({
  Date: class extends Date { constructor(...args) { super(...(args.length ? args : ["2026-09-21T10:00:00"])); } },
  waybills,
  waybillForm: { elements: fields },
  document: { querySelector(selector) {
    if (!nodes.has(selector)) nodes.set(selector, { textContent: "" });
    return nodes.get(selector);
  } },
});
vm.runInContext(source.slice(start, end), context);

assert.equal(context.getNextWaybillNo("2026-09-16"), "WB20260916010");
assert.equal(context.getNextWaybillNo("2026-09-21"), "WB20260921002");
assert.equal(context.getNextWaybillNo("2026-09-22"), "WB20260922001");
assert.equal(context.setGeneratedWaybillFields("2026-09-21"), "WB20260921002");
assert.equal(fields.waybillNo.value, nodes.get("#generatedWaybillNo").textContent);
assert.equal(fields.orderDate.value, nodes.get("#generatedOrderDate").textContent);
waybills.push({ waybillNo: fields.waybillNo.value });
assert.equal(context.setGeneratedWaybillFields("2026-09-21"), "WB20260921003");
assert.match(source, /const orderDate = getCurrentOrderDate\(\);\s*const waybillNo = setGeneratedWaybillFields\(orderDate\);\s*const formData = new FormData\(waybillForm\)/);
console.log("Waybill auto-number and order date test passed");
