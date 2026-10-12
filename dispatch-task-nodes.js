(() => {
  const sequences = Object.freeze({
    "提空装货": Object.freeze(["已提空", "空箱在途", "到达仓库", "完成装货", "重箱在途", "重箱进站", "完成落重"]),
    "提重送货": Object.freeze(["已提重", "重箱在途", "到达仓库", "完成卸货", "空箱在途", "空箱进站", "完成落空"]),
    "排空箱（A→B）": Object.freeze(["已提空", "空箱在途", "完成落空"]),
    "排重箱（A→B）": Object.freeze(["已提重", "重箱在途", "箱进站", "完成落重"]),
  });

  window.DispatchTaskNodes = Object.freeze({
    defaultType: "提空装货",
    sequences,
    get(taskType) {
      return sequences[taskType] || sequences["提空装货"];
    },
    resolve(taskType) {
      return Object.prototype.hasOwnProperty.call(sequences, taskType) ? taskType : "提空装货";
    },
  });
})();
