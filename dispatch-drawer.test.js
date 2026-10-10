const assert = require("node:assert/strict");
const fs = require("node:fs");

const html = fs.readFileSync("index.html", "utf8");
const app = fs.readFileSync("app.js", "utf8");
const css = fs.readFileSync("styles.css", "utf8");

assert.match(html, /id="dispatchDialog"[^>]*data-presentation="page"/);
assert.match(app, /function openDispatchForm\(\)[\s\S]*?dispatchDialog\.dataset\.presentation = "page"/);
assert.match(app, /function openDispatchEdit\(dispatchId\)[\s\S]*?dispatchDialog\.dataset\.presentation = "drawer"/);
assert.match(app, /function closeDispatchForm\(\)[\s\S]*?dispatchDialog\.dataset\.presentation = "page"/);
assert.match(css, /dialog\.dispatch-dialog\[data-presentation="drawer"\]\[open\][\s\S]*?inset:\s*0 0 0 auto[\s\S]*?max-width:\s*760px/);
assert.match(css, /dispatch-dialog\[data-presentation="drawer"\][\s\S]*?vehicle-dialog-header \.icon-btn[\s\S]*?display:\s*grid/);
assert.match(css, /dispatch-dialog\[data-presentation="drawer"\][\s\S]*?driver-form-body[\s\S]*?overflow-y:\s*auto|admin-form-dialog \.driver-form-body[\s\S]*?overflow-y:\s*auto/);

console.log("Dispatch drawer presentation test passed");
