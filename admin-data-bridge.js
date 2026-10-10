(() => {
  const STORAGE_KEY = "container-logistics-admin-data-v1";
  const CUSTOMER_STORAGE_KEY = "container-logistics-customers-v1";

  function read() {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      return value && typeof value === "object" ? value : null;
    } catch (error) {
      return null;
    }
  }

  function write(snapshot) {
    if (!snapshot || typeof snapshot !== "object") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...snapshot, updatedAt: new Date().toISOString() }));
    } catch (error) {
      console.warn("管理端共享数据保存失败。", error);
    }
  }

  function readCustomers() {
    try {
      const value = JSON.parse(localStorage.getItem(CUSTOMER_STORAGE_KEY) || "null");
      return Array.isArray(value) ? value : [];
    } catch (error) {
      return [];
    }
  }

  window.AdminDataBridge = { STORAGE_KEY, CUSTOMER_STORAGE_KEY, read, write, readCustomers };
})();
