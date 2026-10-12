const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const source = fs.readFileSync("mobile.js", "utf8");
const html = fs.readFileSync("mobile.html", "utf8");
const styles = fs.readFileSync("mobile.css", "utf8");
const storeSource = fs.readFileSync("dispatch-store.js", "utf8");
const taskNodesSource = fs.readFileSync("dispatch-task-nodes.js", "utf8");
const constantsStart = source.indexOf("const DEFAULT_TASK_TYPE");
const constantsEnd = source.indexOf("const dispatchSeed", constantsStart);
const helpersStart = source.indexOf("function dispatchTaskType(");
const helpersEnd = source.indexOf("function isTaskAwaitingStart(", helpersStart);
assert.ok(constantsStart >= 0 && constantsEnd > constantsStart, "photo rule map must exist");
assert.ok(helpersStart >= 0 && helpersEnd > helpersStart, "photo upload helpers must exist");

const nodes = {
  photoRequirements: { hidden: false },
  photoSlotList: { innerHTML: "" },
  photoRequirementsHint: { textContent: "" },
  photoRequirementsCount: { textContent: "" },
  photoRequirementsTitle: { textContent: "" },
};
const context = vm.createContext({
  window: {},
  waybillMeta: {},
  h: (value) => String(value),
  document: { querySelector: (selector) => nodes[selector.slice(1)] },
});
vm.runInContext(taskNodesSource, context);
vm.runInContext(`${source.slice(constantsStart, constantsEnd)}\n${source.slice(helpersStart, helpersEnd)}`, context);

const rules = [
  { type: "提空装货", node: "已提空", labels: ["左侧箱体", "右侧箱体", "前侧箱体", "后侧箱体", "空箱全开门", "临封照片"] },
  { type: "提空装货", node: "完成装货", labels: ["装货进度 1/4", "装货进度 1/2", "装货进度 3/4", "装货完成全开门", "装货完成半关门", "全关门及签封号"] },
  { type: "提空装货", node: "重箱进站", labels: ["铁路临封照片 1/3", "铁路临封照片 2/3", "铁路临封照片 3/3"] },
  { type: "提重送货", node: "已提重", labels: ["全关门箱门照片", "封号照片"] },
  { type: "提重送货", node: "完成卸货", labels: ["卸货过程照片 1/3", "卸货过程照片 2/3", "卸货过程照片 3/3"] },
  { type: "提重送货", node: "空箱进站", labels: ["空箱照片 1/5", "空箱照片 2/5", "空箱照片 3/5", "空箱照片 4/5", "空箱照片 5/5"] },
  { type: "排空箱（A→B）", node: "已提空", labels: ["左侧箱体", "右侧箱体", "前侧箱体", "后侧箱体", "空箱全开门", "临封照片"] },
  { type: "排重箱（A→B）", node: "已提重", labels: ["全关门箱门照片", "封条照片"] },
  { type: "排重箱（A→B）", node: "箱进站", labels: ["铁路临封照片 1/3", "铁路临封照片 2/3", "铁路临封照片 3/3"] },
];

for (const rule of rules) {
  const dispatch = { taskType: rule.type };
  assert.deepEqual([...context.photoRequirementsForNode(dispatch, rule.node)], rule.labels);
  context.renderProgressPhotoRequirements(dispatch, rule.node);
  assert.equal(nodes.photoRequirements.hidden, false);
  assert.equal((nodes.photoSlotList.innerHTML.match(/data-photo-slot/g) || []).length, rule.labels.length);
  for (const label of rule.labels) assert.ok(nodes.photoSlotList.innerHTML.includes(label));
  assert.equal(nodes.photoRequirementsCount.textContent, `0/${rule.labels.length}`);
}

assert.deepEqual([...context.photoRequirementsForNode({ taskType: "提重送货" }, "重箱在途")], [], "unlisted nodes must not require photos");
context.renderProgressPhotoRequirements({ taskType: "提重送货" }, "重箱在途");
assert.equal(nodes.photoRequirements.hidden, true);
assert.equal(nodes.photoSlotList.innerHTML, "");

assert.equal(context.missingPhotoCount([{ files: [] }, { files: [{}] }, { files: [] }]), 2);
assert.equal(context.missingPhotoCount([]), 0, "nodes without photo rules can be submitted without photos");

const submitStart = source.indexOf('document.querySelector("#progressForm").addEventListener("submit"');
const submitEnd = source.indexOf('document.querySelector("#progressForm").addEventListener("change"', submitStart);
const submitHandler = source.slice(submitStart, submitEnd);
assert.ok(submitStart >= 0 && submitEnd > submitStart, "progress submission handler must exist");
assert.match(submitHandler, /const missingCount = missingPhotoCount\(photoInputs\)/);
assert.match(submitHandler, /if \(missingCount\) \{[\s\S]*return;/);
assert.match(submitHandler, /label: input\.dataset\.photoLabel[\s\S]*name: input\.files\[0\]\.name/);
assert.match(submitHandler, /await window\.DispatchStore\.savePhotos/);
assert.ok(submitHandler.indexOf("if (missingCount)") < submitHandler.indexOf("dispatch.currentNode = node"), "missing required photos must block node progress");
assert.ok(submitHandler.indexOf("await window.DispatchStore.savePhotos") < submitHandler.indexOf("dispatch.currentNode = node"), "photos must be persisted before node completion");
assert.match(html, /id="photoRequirements"[\s\S]*id="photoSlotList"/);
assert.match(html, /id="photoViewerDialog"[\s\S]*id="photoViewerGrid"/);
assert.match(source, /accept="image\/\*" capture="environment"/);
assert.match(source, /data-photo-label="\$\{h\(label\)\}"/);
assert.match(source, /data-view-photo data-photo-id=/);
assert.match(source, /nodePhotoAttachments\(dispatch, node\)/);
assert.match(source, /data-photo-name="\$\{h\(photo\)\}"/);
assert.match(source, /photoLabels\.map\(\(label, index\) => \(\{ id: `placeholder-\$\{index\}`, label, placeholder: true \}\)\)/);
assert.match(source, /photo\.placeholder \? null : await window\.DispatchStore\.getPhoto/);
assert.match(storeSource, /function savePhotos\(photos\)/);
assert.match(storeSource, /function getPhoto\(id\)/);
assert.match(storeSource, /window\.DispatchStore = \{[^}]*savePhotos, getPhoto/);
assert.match(styles, /\.photo-slot-list \{ display: grid; grid-template-columns: 1fr 1fr/);
assert.match(styles, /\.photo-viewer-item img/);
assert.match(styles, /\.photo-viewer-grid \{ display: grid; grid-template-columns: repeat\(2, minmax\(0, 1fr\)\)/);
assert.match(styles, /\.photo-viewer-placeholder \{[^}]*flex-direction: column/);
assert.match(styles, /@media \(max-width: 360px\)[\s\S]*\.photo-viewer-placeholder \{ min-height: 116px/);

const renderTagsStart = source.indexOf("function renderTimelinePhotoTags(");
const renderTagsEnd = source.indexOf("function nextNode(", renderTagsStart);
const placeholderStart = source.indexOf("function renderPhotoPlaceholder(");
const placeholderEnd = source.indexOf("async function openPhotoViewer(", placeholderStart);
const viewContext = vm.createContext({ h: (value) => String(value) });
vm.runInContext(`${source.slice(renderTagsStart, renderTagsEnd)}\n${source.slice(placeholderStart, placeholderEnd)}`, viewContext);
assert.match(viewContext.renderTimelinePhotoTags({ node: "已提空", photos: ["左侧箱体"] }), /<button[^>]*data-view-photo[^>]*data-photo-name="左侧箱体"/);
const timelineAttachment = viewContext.renderTimelinePhotoTags({ node: "已提空", photoAttachments: [{ id: "photo-1", label: "左侧箱体" }] });
assert.match(timelineAttachment, /class="timeline-photo"[^>]*data-photo-id="photo-1"[^>]*data-timeline-photo/);
assert.match(timelineAttachment, /class="timeline-photo-frame"[\s\S]*class="timeline-photo-label">左侧箱体/);
assert.match(source, /async function renderTimelinePhotoImages\(\)/);
assert.match(source, /window\.DispatchStore\.getPhoto\(button\.dataset\.photoId\)/);
assert.match(source, /renderTimelinePhotoImages\(\);/);
assert.doesNotMatch(source, /renderDetailTaskNodes/);
assert.match(styles, /\.photo-tags \{ display: grid; grid-template-columns: repeat\(auto-fill, minmax\(64px, 1fr\)\)/);
assert.match(styles, /\.timeline-photo-frame img \{ display: block; width: 100%; height: 100%; object-fit: cover/);
assert.match(viewContext.renderPhotoPlaceholder({ label: "左侧箱体" }), /演示占位照片[\s\S]*左侧箱体/);

const positionStart = source.indexOf("function positionPhotoViewer(");
const positionEnd = source.indexOf("function renderPhotoPlaceholder(", positionStart);
const viewerStyle = new Map();
const viewerDialog = { style: { setProperty: (name, value) => viewerStyle.set(name, value) } };
const phoneShell = { getBoundingClientRect: () => ({ left: 818, bottom: 1004, width: 410, height: 820 }) };
const positionContext = vm.createContext({
  document: { querySelector: (selector) => selector === ".phone-shell" ? phoneShell : viewerDialog },
  window: { innerHeight: 1024 },
});
vm.runInContext(source.slice(positionStart, positionEnd), positionContext);
positionContext.positionPhotoViewer();
assert.equal(viewerStyle.get("--viewer-left"), "818px");
assert.equal(viewerStyle.get("--viewer-bottom"), "20px");
assert.equal(viewerStyle.get("--viewer-width"), "410px");
assert.equal(viewerStyle.get("--viewer-height"), "820px");
assert.match(styles, /\.photo-viewer-dialog \{ position: fixed; inset: auto auto var\(--viewer-bottom, 0px\) var\(--viewer-left, 0px\)/);
assert.match(source, /window\.addEventListener\("resize", \(\) => \{[\s\S]*positionPhotoViewer\(\)/);

console.log("Mobile node photo requirement test passed");
