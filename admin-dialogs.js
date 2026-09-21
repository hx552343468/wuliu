document.querySelectorAll(".admin-form-dialog").forEach((dialog) => {
  const nav = dialog.querySelector(".admin-section-nav");
  const scroll = dialog.querySelector(".admin-form-scroll");
  if (!nav || !scroll) return;
  const sections = [...scroll.querySelectorAll(":scope > section:not(.profit-summary)")];
  const buttons = [...nav.querySelectorAll("button")];
  if (sections.length !== buttons.length) return;

  const activate = (index) => {
    buttons.forEach((button, position) => {
      button.classList.toggle("is-active", position === index);
      if (position === index) button.setAttribute("aria-current", "step");
      else button.removeAttribute("aria-current");
    });
  };
  activate(0);

  buttons.forEach((button, index) => button.addEventListener("click", () => {
    scroll.scrollTo({ top: sections[index].offsetTop - sections[0].offsetTop, behavior: "smooth" });
    activate(index);
  }));

  scroll.addEventListener("scroll", () => {
    if (scroll.scrollHeight - scroll.clientHeight - scroll.scrollTop < 8) {
      activate(sections.length - 1);
      return;
    }
    const edge = scroll.scrollTop + 65;
    let current = 0;
    sections.forEach((section, index) => {
      if (section.offsetTop - sections[0].offsetTop <= edge) current = index;
    });
    activate(current);
  }, { passive: true });

  dialog.addEventListener("close", () => {
    scroll.scrollTop = 0;
    activate(0);
  });

  dialog.querySelector("form")?.addEventListener("invalid", (event) => {
    const section = event.target.closest("section");
    const index = sections.indexOf(section);
    if (index !== -1) activate(index);
  }, true);
});
