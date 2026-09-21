const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const source = fs.readFileSync("app.js", "utf8");
const start = source.indexOf('let selectedWaybillCustomer = "";');
const end = source.indexOf("function loadRouteFee(type)", start);
assert.ok(start >= 0 && end > start);

const customers = [
  { customerNo: "KH-1008", customerName: "客户一", loadAddress: "港区", unloadAddress: "仓库", customerStatus: "启用" },
  { customerNo: "KH-1022", customerName: "客户二", loadAddress: "码头", unloadAddress: "园区", customerStatus: "启用" },
  { customerNo: "KH-1120", customerName: "停用客户", loadAddress: "旧址", unloadAddress: "旧仓", customerStatus: "停用" },
];
const fields = {
  customerName: { value: "" }, loadAddress: { value: "" }, routeId: { value: "R1" },
  returnPoint: { value: "" }, plateNo: { value: "" }, driverId: { value: "" },
};
const context = vm.createContext({
  waybillForm: { elements: fields },
  waybillContainerBody: { querySelectorAll() { return []; } },
  window: { CustomerManager: {
    getActiveCustomerByName(name) {
      return customers.find((customer) => customer.customerStatus === "启用" && customer.customerName === name.trim()) || null;
    },
  } },
  fixedRoutes: [
    { id: "R1", origin: "起点一", destination: "终点一" },
    { id: "R2", origin: "起点二", destination: "终点二" },
  ],
  activeOwnDrivers: () => [],
});
vm.runInContext(source.slice(start, end), context);

fields.customerName.value = "客户一";
context.fillWaybillFromCustomer();
assert.equal(fields.loadAddress.value, "港区 / 仓库");
context.fillWaybillFromRoute();
assert.equal(fields.loadAddress.value, "港区 / 仓库", "route must not replace the customer's address");
fields.loadAddress.value = "客户指定仓库";
context.fillWaybillFromCustomer();
context.fillWaybillFromRoute();
assert.equal(fields.loadAddress.value, "客户指定仓库", "manual edits must remain intact");

fields.customerName.value = "客户二";
context.fillWaybillFromCustomer();
assert.equal(fields.loadAddress.value, "码头 / 园区");
fields.customerName.value = "未登记客户";
context.fillWaybillFromCustomer();
assert.equal(fields.loadAddress.value, "", "a previous customer's autofilled address must not carry over");
context.fillWaybillFromRoute();
assert.equal(fields.loadAddress.value, "起点一 / 终点一");
fields.routeId.value = "R2";
context.fillWaybillFromRoute();
assert.equal(fields.loadAddress.value, "起点二 / 终点二");

fields.customerName.value = "停用客户";
context.fillWaybillFromCustomer();
assert.equal(fields.loadAddress.value, "起点二 / 终点二", "inactive customer must not autofill");
assert.match(source, /customerId: customer\?\.customerNo \|\| "-"/);
console.log("Customer address autofill test passed");
