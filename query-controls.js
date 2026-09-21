document.querySelectorAll(".query-panel").forEach((form) => {
  const toggle = form.querySelector(".query-toggle");
  const clear = form.querySelector(".query-clear");
  if (!toggle || !clear) return;

  toggle.addEventListener("click", () => {
    const collapsed = form.classList.toggle("query-collapsed");
    toggle.textContent = collapsed ? "展开" : "收起";
    toggle.setAttribute("aria-expanded", String(!collapsed));
  });

  clear.addEventListener("click", () => {
    form.reset();
    form.requestSubmit();
  });
});
