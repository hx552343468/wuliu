const assert = require("node:assert/strict");
const fs = require("node:fs");

const source = fs.readFileSync("mobile.js", "utf8");
const html = fs.readFileSync("mobile.html", "utf8");
const styles = fs.readFileSync("mobile.css", "utf8");

assert.match(html, /data-profile-page="expenses"[^>]*>[\s\S]*费用申报/);
for (const label of ["燃油费", "电费", "燃气费", "路桥费", "停车费", "其他费用"]) {
  assert.match(source, new RegExp(`label: "${label}"`));
}
assert.match(source, /expenses: "费用申报"/);
assert.match(source, /id="expenseForm"/);
assert.match(source, /name="amount" type="number"/);
assert.match(source, /name="date" type="date"/);
assert.match(source, /name="receipt" type="file"/);
assert.match(source, /name="remark" rows="3"/);
assert.match(source, /state\.expenses\.unshift\(\{/);
assert.match(source, /saveExpenses\(state\.expenses\)/);
assert.match(source, /data-expense-type/);
assert.match(source, /back-expense-types/);
assert.match(source, /function openProfileSubpage[\s\S]*elements\.bottomNav\.hidden = true/);
assert.match(source, /function closeProfileSubpage[\s\S]*elements\.bottomNav\.hidden = false/);
assert.match(styles, /\.expense-type-grid \{ display: grid; grid-template-columns: repeat\(2/);
assert.match(styles, /\.expense-upload\.selected/);

console.log("Mobile expense report test passed");
