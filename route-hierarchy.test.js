const assert = require("node:assert/strict");
const fs = require("node:fs");

const html = fs.readFileSync("index.html", "utf8");
const app = fs.readFileSync("app.js", "utf8");
const styles = fs.readFileSync("styles.css", "utf8");

assert.match(html, /class="route-tree-panel"[\s\S]*客户 \/ 项目/);
assert.match(html, /id="routeTreeContent"/);
assert.match(html, /id="routeScopeTitle"/);
assert.doesNotMatch(html, /id="routeHierarchyDetail"/);
assert.doesNotMatch(app, /data-route-tree-id/);
assert.match(app, /data-route-project-id/);
assert.match(app, /routeHierarchyScope = \{ type: "project", id: projectButton\.dataset\.routeProjectId \}/);
assert.match(app, /renderRoutePage\(getFilteredRoutes\(\)\)/);
assert.match(styles, /\.route-hierarchy-card \{[\s\S]*grid-template-columns:270px minmax\(0,1fr\)/);
assert.match(styles, /\.route-tree-project-label\.active/);

console.log("Route hierarchy layout test passed");
