const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  });
  const page = await browser.newPage({ viewport: { width: 1180, height: 820 }, deviceScaleFactor: 1 });
  await page.goto("http://127.0.0.1:4173/index.html", { waitUntil: "networkidle" });

  const targets = [
    ["fixed-routes", "route"],
    ["dispatch-list", "dispatch"],
    ["auto-dispatch", "auto"],
    ["customer-archives", "customer"],
    ["vehicle", "vehicle"],
    ["driver", "driver"],
  ];
  const results = [];

  for (const [pageName, fileName] of targets) {
    await page.locator(`[data-page="${pageName}"]`).first().click();
    await page.waitForTimeout(100);
    const wrap = page.locator(".page-view.active .fixed-action-table").first().locator("xpath=..");
    const table = page.locator(".page-view.active .fixed-action-table").first();
    await table.waitFor({ state: "visible" });
    await wrap.evaluate((element) => { element.scrollLeft = element.scrollWidth; });
    await page.waitForTimeout(100);
    const metrics = await table.evaluate((element) => {
      const wrapper = element.parentElement;
      const header = element.querySelector("thead .fixed-action-column");
      const cell = element.querySelector("tbody .fixed-action-column");
      const wrapperRect = wrapper.getBoundingClientRect();
      const headerRect = header?.getBoundingClientRect();
      const cellRect = cell?.getBoundingClientRect();
      return {
        page: document.querySelector(".page-view.active")?.id,
        scrollLeft: wrapper.scrollLeft,
        maxScroll: wrapper.scrollWidth - wrapper.clientWidth,
        headerRightGap: headerRect ? Math.round(wrapperRect.right - headerRect.right) : null,
        cellRightGap: cellRect ? Math.round(wrapperRect.right - cellRect.right) : null,
        headerWidth: headerRect ? Math.round(headerRect.width) : null,
        cellWidth: cellRect ? Math.round(cellRect.width) : null,
        headerPosition: header ? getComputedStyle(header).position : null,
        cellPosition: cell ? getComputedStyle(cell).position : null,
        actionVisible: Boolean(cell && cellRect && cellRect.left >= wrapperRect.left && cellRect.right <= wrapperRect.right + 1),
      };
    });
    results.push(metrics);
    await page.screenshot({ path: `qa-${fileName}-fixed-action.png`, fullPage: false });
  }

  console.log(JSON.stringify(results, null, 2));
  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
