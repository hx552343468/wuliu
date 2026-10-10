const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const source = fs.readFileSync("app.js", "utf8");
const start = source.indexOf("const dashboardTaskNodeSequences =");
const end = source.indexOf("function taskMatchesCapacityFilter", start);
assert.ok(start >= 0 && end > start, "dashboard task progress functions must exist");

const context = vm.createContext({
  PLAN_TASK_TYPES: ["提空装货", "提重送货", "排空箱（A→B）", "排重箱（A→B）"],
  waybills: [],
  document: { querySelector: () => ({ value: "70" }) },
});
vm.runInContext(source.slice(start, end), context);

const cases = [
  ["提空装货", "完成装货", 4, 57],
  ["提重送货", "空箱在途", 5, 71],
  ["排空箱（A→B）", "完成落空", 3, 100],
  ["排重箱（A→B）", "重箱在途", 2, 50],
];
for (const [taskType, currentNode, completedCount, progress] of cases) {
  const meta = context.getDashboardTaskMeta({ taskType, currentNode, status: "运输中", timeline: [] });
  assert.equal(meta.taskType, taskType);
  assert.equal(meta.stage, currentNode);
  assert.equal(meta.completedCount, completedCount);
  assert.equal(meta.progress, progress);
}

const legacy = context.getDashboardTaskMeta({ taskType: "提空装货", currentNode: "在途", status: "运输中", timeline: [] });
assert.equal(legacy.stage, "空箱在途");
assert.equal(legacy.completedCount, 2);

const secondTransit = context.getDashboardTaskMeta({
  taskType: "提空装货",
  currentNode: "在途",
  status: "运输中",
  timeline: [{ node: "已提空" }, { node: "空箱在途" }, { node: "到达仓库" }, { node: "完成装货" }],
});
assert.equal(secondTransit.stage, "重箱在途");
assert.equal(secondTransit.completedCount, 5);

const legacyTransit = context.getDashboardTaskMeta({
  taskType: "提空装货",
  currentNode: "在途",
  status: "运输中",
  timeline: [{ node: "已提空" }, { node: "空箱在途" }],
});
assert.equal(legacyTransit.stage, "空箱在途");
assert.equal(legacyTransit.completedCount, 2);

const completed = context.getDashboardTaskMeta({ taskType: "排重箱（A→B）", currentNode: "完成落重", status: "已完成", timeline: [] });
assert.equal(completed.progress, 100);
assert.equal(completed.currentIndex, 3);

console.log("Dashboard task progress test passed");
