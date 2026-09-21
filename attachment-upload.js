(() => {
  const MAX_FILE_SIZE = 10 * 1024 * 1024;

  function formatFileSize(bytes) {
    if (!Number.isFinite(bytes) || bytes <= 0) return "";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${Math.ceil(bytes / 1024)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  }

  function getFieldLabel(field, input) {
    if (input.dataset.uploadLabel) return input.dataset.uploadLabel;
    const textNode = [...field.childNodes].find((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
    return textNode?.textContent.trim() || "附件";
  }

  function initialize(input) {
    if (input.dataset.attachmentReady === "true") return;
    const field = input.closest(".file-field");
    if (!field) return;
    const label = getFieldLabel(field, input);
    const picker = document.createElement("span");
    picker.className = "attachment-picker";
    picker.tabIndex = 0;
    picker.setAttribute("role", "button");
    picker.setAttribute("aria-label", `选择${label}`);
    picker.innerHTML = `
      <span class="attachment-picker-icon" aria-hidden="true">↑</span>
      <span class="attachment-picker-copy"><strong>点击选择附件</strong><small>${input.dataset.uploadHint || "支持图片或 PDF，单个文件不超过 10 MB"}</small></span>
      <button class="attachment-picker-remove" type="button" aria-label="移除${label}" title="移除附件">×</button>`;
    input.insertAdjacentElement("afterend", picker);
    input.dataset.attachmentReady = "true";
    field.classList.add("attachment-ready");

    const title = picker.querySelector("strong");
    const meta = picker.querySelector("small");
    const remove = picker.querySelector(".attachment-picker-remove");

    function render() {
      const file = input.files?.[0];
      const existing = input.dataset.existingFile || "";
      const selectedName = file?.name || existing;
      field.classList.toggle("has-file", Boolean(selectedName));
      field.classList.remove("file-error");
      if (selectedName) {
        title.textContent = selectedName;
        meta.textContent = file ? `${formatFileSize(file.size)} · 点击可重新选择` : "已归档 · 点击可重新选择";
      } else {
        title.textContent = "点击选择附件";
        meta.textContent = input.dataset.uploadHint || "支持图片或 PDF，单个文件不超过 10 MB";
      }
    }

    input.addEventListener("change", () => {
      const file = input.files?.[0];
      if (file && file.size > MAX_FILE_SIZE) {
        input.value = "";
        field.classList.remove("has-file");
        field.classList.add("file-error");
        title.textContent = "文件超过 10 MB";
        meta.textContent = "请压缩文件后重新选择";
        return;
      }
      if (file) {
        input.dataset.existingFile = "";
        input.dataset.removed = "false";
      }
      render();
    });

    picker.addEventListener("keydown", (event) => {
      if (!["Enter", " "].includes(event.key)) return;
      event.preventDefault();
      input.click();
    });

    remove.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      input.value = "";
      input.dataset.existingFile = "";
      input.dataset.removed = "true";
      render();
      picker.focus();
    });

    input.form?.addEventListener("reset", () => window.setTimeout(render));
    input._renderAttachmentPicker = render;
    render();
  }

  function setExisting(input, fileName = "") {
    if (!input) return;
    input.value = "";
    input.dataset.existingFile = fileName;
    input.dataset.removed = "false";
    input._renderAttachmentPicker?.();
  }

  function getValue(input) {
    return input?.files?.[0]?.name || input?.dataset.existingFile || "";
  }

  document.querySelectorAll(".file-field input[type='file']").forEach(initialize);
  window.AttachmentPicker = { initialize, setExisting, getValue, formatFileSize };
})();
