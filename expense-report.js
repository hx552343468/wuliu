(function initExpenseReport(root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.ExpenseReport = api;
})(typeof window !== "undefined" ? window : globalThis, () => {
  function sortByRecency(left, right) {
    const leftTime = String(left.dispatchTime || left.orderDate || "");
    const rightTime = String(right.dispatchTime || right.orderDate || "");
    return rightTime.localeCompare(leftTime);
  }

  function getSelectableDispatches(dispatches, driverId) {
    const driverDispatches = dispatches.filter((item) => item.driverId === driverId);
    const active = driverDispatches.filter((item) => item.status === "运输中").sort(sortByRecency);
    const completed = driverDispatches.filter((item) => item.status === "已完成").sort(sortByRecency);
    return [...active, ...completed];
  }

  function getDefaultDispatch(dispatches, driverId) {
    return getSelectableDispatches(dispatches, driverId)[0] || null;
  }

  function filterRecords(records, filters = {}) {
    const keyword = String(filters.keyword || "").trim().toLowerCase();
    return records.filter((item) => {
      const searchableText = [item.id, item.driverName, item.waybillNo, item.vehicleId, item.typeLabel, item.remark]
        .join(" ")
        .toLowerCase();
      return (!filters.driverId || item.driverId === filters.driverId) &&
        (!filters.type || item.type === filters.type) &&
        (!filters.status || item.status === filters.status) &&
        (!filters.startDate || String(item.date || "") >= filters.startDate) &&
        (!filters.endDate || String(item.date || "") <= filters.endDate) &&
        (!keyword || searchableText.includes(keyword));
    });
  }

  function applyReview(records, recordIds, result, review = {}) {
    const ids = new Set(recordIds);
    if (!["approved", "rejected"].includes(result) || !ids.size) return records.slice();
    return records.map((item) => {
      if (!ids.has(item.id) || item.status !== "pending") return item;
      return {
        ...item,
        status: result,
        reviewedAt: review.reviewedAt || "",
        reviewedBy: review.reviewedBy || "",
        rejectionReason: result === "rejected" ? String(review.rejectionReason || "").trim() : "",
      };
    });
  }

  return { getSelectableDispatches, getDefaultDispatch, filterRecords, applyReview };
});
