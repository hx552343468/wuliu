(function () {
  const STORAGE_KEY = "container-logistics-dispatches-v1";

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function load(seed = []) {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (Array.isArray(stored)) return stored;
    } catch (error) {
      console.warn("派单数据读取失败，将使用演示数据。", error);
    }
    const initial = clone(seed);
    if (initial.length) save(initial);
    return initial;
  }

  function save(dispatches) {
    const data = clone(dispatches);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent("dispatches-updated", { detail: data }));
  }

  function replace(target, source) {
    target.splice(0, target.length, ...clone(source));
    return target;
  }

  function nowText() {
    const date = new Date();
    const pad = (value) => String(value).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  window.DispatchStore = { STORAGE_KEY, load, save, replace, nowText };
})();
