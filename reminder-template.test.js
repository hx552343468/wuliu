const assert = require("node:assert/strict");
const fs = require("node:fs");

const html = fs.readFileSync("index.html", "utf8");
const app = fs.readFileSync("app.js", "utf8");
const styles = fs.readFileSync("styles.css", "utf8");

assert.match(html, /data-page="reminder-templates"[^>]*>消息提醒模板/);
assert.match(html, /id="reminderTemplatePage"/);
assert.match(html, /id="reminderTemplateQueryForm"/);
assert.match(html, /id="reminderTemplateDialog"/);
for (const event of ["车辆到达", "节点拍照", "证照临期", "证照过期", "照片上传失败"]) {
  assert.match(html, new RegExp(`>${event}<`), event);
}
for (const field of ["triggerTiming", "offsetMinutes", "sendTime", "forceLogic", "repeatInterval", "recipients", "channels", "content"]) {
  assert.match(html, new RegExp(`name="${field}"`), field);
}
assert.match(app, /REMINDER_TEMPLATE_STORAGE_KEY/);
assert.match(app, /function renderReminderTemplatePage/);
assert.match(app, /function updateReminderTemplatePreview/);
assert.match(styles, /\.reminder-template-table \{ width: 100%; min-width: 1260px; table-layout: fixed; \}/);
assert.match(styles, /\.reminder-template-dialog form,\s*\.reminder-template-dialog \.vehicle-dialog-header,\s*\.reminder-template-dialog \.admin-form-scroll \{ background: #f3f6fa; \}/);
assert.match(styles, /\.reminder-template-dialog \.driver-form-section \{ margin: 0 0 14px;[^}]*background: #fff;[^}]*box-shadow:/);
console.log("Reminder template page structure test passed");
