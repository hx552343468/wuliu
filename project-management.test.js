const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const html = fs.readFileSync("index.html", "utf8");
const app = fs.readFileSync("app.js", "utf8");
const styles = fs.readFileSync("styles.css", "utf8");

assert.match(html, /id="addProjectBtn"/);
assert.match(html, /id="projectDialog"/);
assert.match(html, /id="projectForm"/);
assert.match(html, /name="projectName" required/);
assert.match(app, /routeAccountCatalog\.push\(project\)/);
assert.match(app, /同一客户下已存在同名项目/);
assert.match(app, /routeHierarchyScope = \{ type: "project", id: project\.projectId \}/);
assert.match(styles, /\.route-tree-panel-actions/);

const functionStart = app.indexOf("function getNextProjectId(");
const functionEnd = app.indexOf("\n}\n", functionStart) + 2;
const context = vm.createContext({
  routeAccountCatalog: [
    { customerId: "KH-HM", projectId: "PR-HM-BYD", projectName: "比亚迪" },
    { customerId: "KH-HM", projectId: "PR-HM-001", projectName: "旧项目" },
  ],
});
vm.runInContext(app.slice(functionStart, functionEnd), context);
assert.equal(context.getNextProjectId("KH-HM"), "PR-HM-002");
assert.equal(context.getNextProjectId("KH-LG"), "PR-LG-001");

console.log("Project management UI test passed");
