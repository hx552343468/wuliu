const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const source = fs.readFileSync("dispatch-store.js", "utf8");
const photos = new Map();
const database = {
  createObjectStore() {},
  transaction() {
    const transaction = {};
    transaction.objectStore = () => ({
      put(record) {
        photos.set(record.id, record);
        queueMicrotask(() => transaction.oncomplete?.());
      },
      get(id) {
        const request = {};
        queueMicrotask(() => {
          request.result = photos.get(id);
          request.onsuccess?.();
        });
        return request;
      },
    });
    return transaction;
  },
  close() {},
};
const indexedDB = {
  open() {
    const request = { result: database };
    queueMicrotask(() => {
      request.onupgradeneeded?.();
      request.onsuccess?.();
    });
    return request;
  },
};
const window = { indexedDB };
vm.runInNewContext(source, { window, localStorage: {}, CustomEvent: class {} });

async function run() {
  const original = new Blob(["photo-bytes"], { type: "image/jpeg" });
  await window.DispatchStore.savePhotos([{ id: "photo-1", blob: original }]);
  const restored = await window.DispatchStore.getPhoto("photo-1");
  assert.equal(restored, original);
  assert.equal(typeof window.DispatchStore.getPhoto, "function");
  console.log("Dispatch photo persistence test passed");
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
