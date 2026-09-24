const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const html = fs.readFileSync("index.html", "utf8");
const formStart = html.indexOf('id="waybillForm"');
const formEnd = html.indexOf("</form>", formStart);
const formHtml = html.slice(formStart, formEnd);
for (const field of ["boxNo1", "sealNo1", "boxNo2", "sealNo2", "boxQuantity", "pickupPoint1", "pickupPoint2", "returnPoint"]) {
  assert.doesNotMatch(formHtml, new RegExp(`name="${field}"`), `${field} should not remain a standalone field`);
}
assert.match(formHtml, /id="waybillContainerCount">1/);
assert.match(formHtml, /id="addContainerRowBtn"/);
assert.match(formHtml, /id="waybillContainerBody"/);
assert.match(formHtml, /<th class="required-column">箱号<\/th><th class="required-column">封号<\/th><th>箱型<\/th><th class="required-column">提箱点<\/th><th class="required-column">还箱点<\/th><th>操作<\/th>/);
assert.equal((formHtml.match(/name="remark"/g) || []).length, 1);
assert.doesNotMatch(formHtml, /name="remark1"/);

const source = fs.readFileSync("app.js", "utf8");
const helperStart = source.indexOf("function getWaybillContainers(");
const helperEnd = source.indexOf("function createPendingDispatch(", helperStart);
assert.ok(helperStart >= 0 && helperEnd > helperStart);
const context = vm.createContext({});
vm.runInContext(source.slice(helperStart, helperEnd), context);

const detailed = { containers: [
  { boxNo: "BOX-1", sealNo: "SEAL-1", boxType: "40HQ", pickupPoint: "港区", returnPoint: "堆场" },
  { boxNo: "BOX-2", sealNo: "SEAL-2", boxType: "20GP", pickupPoint: "码头", returnPoint: "园区" },
] };
assert.equal(context.getWaybillContainers(detailed).length, 2);
assert.equal(context.formatWaybillBoxes(detailed), "BOX-1 / 封号 SEAL-1 / 40HQ；BOX-2 / 封号 SEAL-2 / 20GP");
const legacy = { boxNo1: "OLD-1", sealNo1: "S-1", boxNo2: "OLD-2", sealNo2: "S-2", boxType: "20GP*2", pickupPoint1: "A", pickupPoint2: "B", returnPoint: "C" };
const converted = context.getWaybillContainers(legacy);
assert.equal(converted.length, 2);
assert.equal(converted[0].boxType, "20GP");
assert.equal(converted[1].pickupPoint, "B");

assert.match(source, /waybillContainerBody\.innerHTML = "";\s*receivableFeeBody\.innerHTML/);
assert.match(source, /createContainerRow\(\);\s*createFeeRow\("receivable"\)/);
for (const className of ["container-box-no", "container-seal-no", "container-pickup-point", "container-return-point", "fee-unit", "fee-kind", "fee-quantity", "fee-price"]) {
  assert.match(source, new RegExp(`class="${className}"[^>]*required`), `${className} should be required`);
}
assert.match(source, /if \(!waybillContainerBody\.querySelector\("tr"\)\) createContainerRow\(\)/);
assert.match(source, /boxQuantity: containers\.length/);
assert.match(source, /containers,\s*boxNo1: containers\[0\]\?\.boxNo \|\| "-"/);
assert.match(source, /boxes: formatWaybillBoxes\(waybill\)/);
assert.doesNotMatch(source, /formData\.get\("remark1"\)/);
const styles = fs.readFileSync("styles.css", "utf8");
assert.match(styles, /\.fee-table\.container-table\s*\{[^}]*width:\s*100%;[^}]*min-width:\s*860px;/s);
console.log("Dynamic container information test passed");
