const moduleCatalog = {
  waybill: {
    title: "运单管理", eyebrow: "集卡业务", icon: "file-text", primary: "新增运单",
    filters: ["全部", "草拟", "已审核"],
    items: [
      { id: "WB20260916001", title: "宁波远海供应链有限公司", subtitle: "北仑港至江北仓", status: "草拟", statusClass: "warning", fields: [["接单日期", "2026-09-16"], ["箱型", "40HQ"], ["装卸地址", "北仑港区二期 / 江北仓"], ["回单", "未收到"]], note: "上午装柜" },
      { id: "WB20260916002", title: "上海嘉航国际物流有限公司", subtitle: "洋山港至昆山保税区", status: "草拟", statusClass: "warning", fields: [["接单日期", "2026-09-16"], ["箱型", "20GP*2"], ["装卸地址", "上海洋山港 / 昆山综保区"], ["回单", "未收到"]], note: "双拖作业" },
      { id: "WB20260916003", title: "杭州联贸进出口有限公司", subtitle: "萧山仓至梅山码头", status: "已审核", statusClass: "success", fields: [["接单日期", "2026-09-15"], ["箱型", "40GP"], ["装卸地址", "杭州萧山仓 / 梅山码头"], ["回单", "无需回单"]], note: "夜间进港" },
      { id: "WB20260916004", title: "苏州新程电子科技有限公司", subtitle: "苏州园区至外高桥", status: "草拟", statusClass: "warning", fields: [["接单日期", "2026-09-14"], ["箱型", "20GP"], ["装卸地址", "苏州工业园 / 外高桥"], ["回单", "未收到"]], note: "客户指定司机" },
    ],
  },
  route: {
    title: "固定线路", eyebrow: "集卡业务", icon: "route", primary: "新增线路",
    filters: ["全部", "启用", "停用"],
    items: [
      { id: "XL-NB-001", title: "北仑港至江北仓", subtitle: "宁波北仑港区二期 → 宁波江北物流园", status: "启用", statusClass: "success", fields: [["今日单量", "2 单"], ["负荷", "67%"], ["提成方式", "固定金额"], ["常用车辆", "浙B·K7812"]], note: "日常进口柜线路" },
      { id: "XL-SH-002", title: "洋山港至昆山保税区", subtitle: "上海洋山港 → 昆山综合保税区", status: "启用", statusClass: "success", fields: [["今日单量", "1 单"], ["负荷", "50%"], ["提成方式", "收入比例"], ["常用车辆", "沪D·A9021"]], note: "双拖需单独核价" },
      { id: "XL-HZ-003", title: "萧山仓至梅山码头", subtitle: "杭州萧山仓 → 宁波梅山码头", status: "启用", statusClass: "success", fields: [["今日单量", "1 单"], ["负荷", "50%"], ["提成方式", "固定金额"], ["常用司机", "陈涛"]], note: "出口柜线路" },
      { id: "XL-SZ-004", title: "苏州园区至外高桥", subtitle: "苏州工业园区 → 上海外高桥", status: "停用", statusClass: "muted", fields: [["今日单量", "0 单"], ["负荷", "0%"], ["提成方式", "收入比例"], ["常用车辆", "苏E·T5568"]], note: "暂停售价维护" },
    ],
  },
  dispatch: {
    title: "派单列表", eyebrow: "集卡业务", icon: "send", primary: "新增派单",
    filters: ["全部", "待派单", "已派单", "运输中", "已完成"],
    items: [
      { id: "PD-1005", title: "北仑港至江北仓", subtitle: "WB20260916005", status: "待派单", statusClass: "warning", fields: [["司机", "待分配"], ["车辆", "待分配"], ["当前节点", "待派单"], ["派单方式", "待分配"]], note: "等待调度" },
      { id: "PD-1002", title: "洋山港至昆山保税区", subtitle: "WB20260916002", status: "已派单", statusClass: "", fields: [["司机", "赵亮"], ["车辆", "沪D·A9021"], ["当前节点", "待提货"], ["派单方式", "自动派单"]], note: "双拖作业，按现场指引进港" },
      { id: "PD-1001", title: "北仑港至江北仓", subtitle: "WB20260916001", status: "运输中", statusClass: "", fields: [["司机", "王海"], ["车辆", "浙B·K7812"], ["当前节点", "在途"], ["派单方式", "自动派单"]], note: "上午装柜" },
      { id: "PD-1003", title: "萧山仓至梅山码头", subtitle: "WB20260916003", status: "已完成", statusClass: "success", fields: [["司机", "陈涛"], ["车辆", "浙A·F2190"], ["当前节点", "已送达"], ["派单方式", "手动派单"]], note: "夜间进港" },
    ],
  },
  auto: {
    title: "自动派单", eyebrow: "智能调度", icon: "wand-sparkles", primary: "立即执行",
    filters: ["全部", "待处理", "已完成", "异常"],
    items: [
      { id: "AUTO-260916-01", title: "自动执行任务", subtitle: "2026-09-16 09:30", status: "已完成", statusClass: "success", fields: [["接入任务", "4 条"], ["成功派单", "3 条"], ["待人工处理", "1 条"], ["执行耗时", "18 秒"]], note: "线路优先、闲置车辆优先、司机负载均衡" },
      { id: "RULE-01", title: "线路专属车辆优先", subtitle: "匹配规则 01", status: "已启用", statusClass: "success", fields: [["优先级", "最高"], ["适用线路", "全部固定线路"], ["冲突处理", "转入通用车辆池"], ["自动执行", "开启"]], note: "固定线路优先匹配绑定车辆" },
      { id: "RULE-02", title: "闲置运力优先", subtitle: "匹配规则 02", status: "已启用", statusClass: "success", fields: [["优先级", "高"], ["车辆状态", "仅闲置"], ["排除状态", "在途、维修中"], ["自动识别", "开启"]], note: "不分配在途或作业中的车辆" },
      { id: "AUTO-EX-01", title: "WB20260916005", subtitle: "北仑港至江北仓", status: "待处理", statusClass: "warning", fields: [["异常原因", "暂无闲置车辆"], ["建议操作", "人工补派"], ["进入时间", "10:08"], ["优先级", "高"]], note: "当前线路车辆均在执行任务" },
    ],
  },
  vehicle: {
    title: "车辆档案", eyebrow: "车辆管理", icon: "truck", primary: "新增车辆",
    filters: ["全部", "在用", "维修中", "停用"],
    items: [
      { id: "浙B·K7812", title: "集装箱牵引车", subtitle: "宁波港区集卡车队", status: "在用", statusClass: "success", fields: [["司机", "王海"], ["当前状态", "运输中"], ["审验到期", "2026-10-18"], ["保险到期", "2026-10-05"]], note: "港区短驳主力车辆" },
      { id: "沪D·A9021", title: "重型半挂牵引车", subtitle: "临港集卡车队", status: "在用", statusClass: "success", fields: [["司机", "赵亮"], ["当前状态", "已派单"], ["审验到期", "2026-09-28"], ["保险到期", "2026-11-12"]], note: "临港主力运力" },
      { id: "苏E·T5568", title: "集装箱骨架车", subtitle: "苏州园区集卡车队", status: "维修中", statusClass: "warning", fields: [["司机", "刘军"], ["当前状态", "维修中"], ["审验到期", "2026-08-30"], ["保险到期", "2026-09-10"]], note: "待复检，暂不排班" },
      { id: "浙A·F2190", title: "危险品牵引车", subtitle: "杭州危险品运输车队", status: "在用", statusClass: "success", fields: [["司机", "陈涛"], ["当前状态", "已完工"], ["审验到期", "2026-12-20"], ["保险到期", "2026-09-30"]], note: "需随车携带危化品资质" },
    ],
  },
  driver: {
    title: "司机档案", eyebrow: "司机管理", icon: "user-round", primary: "新增司机",
    filters: ["全部", "空闲", "运输中", "停用"],
    items: [
      { id: "SJ-1001", title: "王海", subtitle: "宁波一队 · 138****8881", status: "运输中", statusClass: "", fields: [["准驾车型", "A2"], ["车辆", "浙B·K7812"], ["认证", "已认证"], ["证件到期", "2027-05-18"]], note: "自有司机" },
      { id: "SJ-1002", title: "赵亮", subtitle: "临港车队 · 139****6662", status: "运输中", statusClass: "", fields: [["准驾车型", "A2"], ["车辆", "沪D·A9021"], ["认证", "已认证"], ["证件到期", "2026-09-28"]], note: "自有司机" },
      { id: "SJ-1003", title: "刘军", subtitle: "苏州二队 · 137****3335", status: "停用", statusClass: "muted", fields: [["准驾车型", "A2"], ["车辆", "苏E·T5568"], ["认证", "审核中"], ["证件到期", "2026-08-30"]], note: "证件续办中" },
      { id: "SJ-1004", title: "陈涛", subtitle: "杭州车队 · 136****2228", status: "空闲", statusClass: "success", fields: [["准驾车型", "A2"], ["车辆", "浙A·F2190"], ["认证", "已认证"], ["证件到期", "2028-03-15"]], note: "自有司机" },
      { id: "SJ-1005", title: "周凯", subtitle: "宁波二队 · 135****7719", status: "停用", statusClass: "muted", fields: [["准驾车型", "A2"], ["车辆", "未绑定"], ["认证", "未认证"], ["证件到期", "2029-11-08"]], note: "入职资料待复核" },
    ],
  },
  customer: {
    title: "客户管理", eyebrow: "基础资料", icon: "building-2", primary: "新增客户",
    filters: ["全部", "启用", "停用"],
    items: [
      { id: "KH-1008", title: "宁波远海供应链有限公司", subtitle: "简称：宁波远海", status: "启用", statusClass: "success", fields: [["客户类型", "第三方物流 / 供应链公司"], ["联系人", "李经理"], ["手机", "13800001008"], ["结算周期", "月结30天"]], note: "默认装货地址：宁波北仑港区二期" },
      { id: "KH-1022", title: "上海嘉航国际物流有限公司", subtitle: "简称：上海嘉航", status: "启用", statusClass: "success", fields: [["客户类型", "国际货运代理（货代）"], ["联系人", "陈主管"], ["手机", "13900001022"], ["结算周期", "月结15天"]], note: "默认装货地址：上海洋山港" },
      { id: "KH-1035", title: "杭州联贸进出口有限公司", subtitle: "简称：杭州联贸", status: "启用", statusClass: "success", fields: [["客户类型", "跨境电商物流商"], ["联系人", "周女士"], ["手机", "13600001035"], ["结算周期", "月结30天"]], note: "默认装货地址：杭州萧山仓" },
      { id: "KH-1120", title: "上海港联贸易有限公司", subtitle: "简称：上海港联", status: "停用", statusClass: "muted", fields: [["客户类型", "跨境电商物流商"], ["联系人", "何经理"], ["手机", "13100001120"], ["结算周期", "月结60天"]], note: "默认装货地址：上海外高桥" },
    ],
  },
  reminder: {
    title: "到期提醒", eyebrow: "车辆管理", icon: "shield-alert", primary: "消息提醒",
    filters: ["全部", "保险即将到期", "审验即将到期", "已过期"],
    items: [
      { id: "苏E·T5568", title: "车辆证件已过期", subtitle: "苏州园区集卡车队", status: "已过期", statusClass: "danger", fields: [["保险到期", "2026-09-10"], ["审验到期", "2026-08-30"], ["司机", "刘军"], ["车辆状态", "维修中"]], note: "立即补办审验或续保，暂停派车" },
      { id: "浙B·K7812", title: "保险即将到期", subtitle: "宁波港区集卡车队", status: "保险即将到期", statusClass: "warning", fields: [["保险到期", "2026-10-05"], ["剩余天数", "19 天"], ["司机", "王海"], ["车辆状态", "在用"]], note: "联系保险公司续保并上传新保单" },
    ],
  },
};

const messages = [
  { id: "M-1", type: "task", title: "自动派单存在待处理任务", desc: "WB20260916005 暂无可用车辆，请人工补派。", time: "10:08", icon: "wand-sparkles", style: "warning", module: "auto", unread: true },
  { id: "M-2", type: "warning", title: "车辆保险即将到期", desc: "浙B·K7812 的保险将在 19 天后到期。", time: "09:30", icon: "shield-alert", style: "warning", module: "reminder", unread: true },
  { id: "M-3", type: "task", title: "司机已上报运输节点", desc: "王海已完成提货，当前节点更新为在途。", time: "09:12", icon: "map-pinned", style: "success", module: "dispatch", unread: true },
  { id: "M-4", type: "warning", title: "车辆审验已过期", desc: "苏E·T5568 年检已过期，当前不可参与派车。", time: "昨天", icon: "triangle-alert", style: "warning", module: "reminder", unread: false },
  { id: "M-5", type: "task", title: "今日自动派单执行完成", desc: "接入 4 条任务，成功派单 3 条。", time: "昨天", icon: "circle-check", style: "success", module: "auto", unread: false },
];

const mobileFormDefinitions = {
  route: {
    intro: "维护线路收入、基础运价和司机提成规则，保存后可用于运单和派单。",
    sections: [
      { title: "线路基础信息", hint: "起止地址与线路状态", fields: [
        { name: "routeName", label: "线路名称", required: true, full: true, placeholder: "请输入线路名称" },
        { name: "origin", label: "起运地", required: true, placeholder: "请输入起运地" },
        { name: "destination", label: "目的地", required: true, placeholder: "请输入目的地" },
        { name: "viaPoints", label: "途经点", full: true, placeholder: "多个地点用顿号分隔" },
        { name: "routeState", label: "线路状态", type: "select", required: true, options: ["启用", "停用"] },
        { name: "remark", label: "备注", full: true, type: "textarea", placeholder: "请输入线路备注" },
      ] },
      { title: "收入与提成", hint: "配置单次运输核算基准", fields: [
        { name: "estimatedRevenue", label: "单次预估收入（元）", type: "number", min: "0", step: "0.01", required: true },
        { name: "baseFreight", label: "线路基础运价（元）", type: "number", min: "0", step: "0.01", required: true },
        { name: "commissionType", label: "提成方式", type: "select", required: true, options: [["fixed", "固定金额提成"], ["rate", "按收入比例提成"]] },
        { name: "commissionValue", label: "固定提成金额（元）", type: "number", min: "0", step: "0.01", required: true },
        { name: "commissionRemark", label: "提成规则说明", full: true, placeholder: "例如：含往返空驶补贴" },
      ] },
      { title: "关联配置", hint: "派单时优先推荐，可不指定", fields: [
        { name: "defaultVehicle", label: "线路专属车辆", type: "select", options: [["", "不指定"], ["浙B·K7812", "浙B·K7812"], ["沪D·A9021", "沪D·A9021"], ["浙A·F2190", "浙A·F2190"]] },
        { name: "defaultDriver", label: "常用司机", type: "select", options: [["", "不指定"], ["王海", "王海"], ["赵亮", "赵亮"], ["陈涛", "陈涛"]] },
      ] },
    ],
  },
  vehicle: {
    intro: "建立车辆身份、参数、证照审验和保险资料，附件统一归档。",
    sections: [
      { title: "身份与归属", hint: "车辆识别与车队信息", fields: [
        { name: "plateNo", label: "车牌号码", required: true, placeholder: "例如 浙B·A1234" },
        { name: "vehicleType", label: "车辆类型", required: true, placeholder: "例如 集装箱牵引车" },
        { name: "vin", label: "车架号", required: true }, { name: "engineNo", label: "发动机号", required: true },
        { name: "driver", label: "驾驶员", required: true }, { name: "fleet", label: "所属车队" },
        { name: "fleetName", label: "车队名称" },
        { name: "ownership", label: "车辆所属", type: "select", required: true, options: ["自有", "外协"] },
        { name: "vehicleState", label: "车辆状态", type: "select", required: true, options: ["在用", "停用", "维修中"] },
      ] },
      { title: "车辆参数", hint: "载重、油耗与技术等级", fields: [
        { name: "curbWeight", label: "整备质量（吨）", type: "number", min: "0", step: "0.01" },
        { name: "fuelConsumption", label: "百公里油耗（升）", type: "number", min: "0", step: "0.01" },
        { name: "ratedLoad", label: "核定载质量（吨）", type: "number", min: "0", step: "0.01" },
        { name: "registrationCertNo", label: "车辆登记证号" }, { name: "technicalLevel", label: "车辆技术等级" },
        { name: "technicalLevelExpiry", label: "技术等级有效期", type: "date" },
      ] },
      { title: "证照与审验", hint: "行驶证、营运证和审验资料", fields: [
        { name: "drivingLicenseNo", label: "行驶证号" }, { name: "drivingLicenseExpiry", label: "行驶证有效期", type: "date" },
        { name: "permitNo", label: "营运证号", required: true }, { name: "operatingPermitExpiry", label: "营运证有效期", type: "date" },
        { name: "inspectionDue", label: "审验到期日期", type: "date", required: true },
        { name: "drivingLicense", label: "行驶证扫描件", type: "file", full: true },
        { name: "operatingPermit", label: "营运证照片", type: "file", full: true },
      ] },
      { title: "保险与备注", hint: "保单及到期日期", fields: [
        { name: "commercialInsuranceNo", label: "商业险单号" }, { name: "commercialInsuranceExpiry", label: "商业险有效期", type: "date" },
        { name: "mandatoryInsuranceNo", label: "强制险单号" }, { name: "mandatoryInsuranceExpiry", label: "强制险有效期", type: "date" },
        { name: "cargoInsuranceNo", label: "货物险单号" }, { name: "cargoInsuranceExpiry", label: "货物险有效期", type: "date" },
        { name: "insuranceDue", label: "保险到期日期", type: "date", required: true },
        { name: "remark", label: "备注", type: "textarea", full: true },
      ] },
    ],
  },
  driver: {
    intro: "建立自有司机基础资料、驾驶证、从业资格证和结算信息。",
    sections: [
      { title: "基础信息", hint: "司机身份与车队归属", fields: [
        { name: "name", label: "姓名", required: true }, { name: "gender", label: "性别", type: "select", required: true, options: ["男", "女"] },
        { name: "idCard", label: "身份证号码", required: true, full: true, inputmode: "text" },
        { name: "phone", label: "手机号", type: "tel", required: true, pattern: "1[0-9]{10}", inputmode: "numeric" },
        { name: "address", label: "住址", required: true, full: true },
        { name: "emergencyContact", label: "紧急联系人", required: true },
        { name: "emergencyPhone", label: "紧急联系电话", type: "tel", required: true, pattern: "1[0-9]{10}", inputmode: "numeric" },
        { name: "entryDate", label: "入职日期", type: "date", required: true },
        { name: "driverState", label: "司机状态", type: "select", required: true, options: ["空闲", "运输中", "停用"] },
        { name: "fleet", label: "所属车队", required: true },
      ] },
      { title: "驾驶证", hint: "驾驶证信息与电子附件", fields: [
        { name: "licenseNo", label: "驾驶证号", required: true }, { name: "licenseClass", label: "准驾车型", required: true, value: "A2" },
        { name: "licenseIssueDate", label: "发证日期", type: "date", required: true },
        { name: "licenseExpiry", label: "有效期截止日期", type: "date", required: true },
        { name: "licenseAttachment", label: "驾驶证附件", type: "file", full: true },
      ] },
      { title: "道路运输从业资格证", hint: "资格证信息与附件", fields: [
        { name: "qualificationNo", label: "资格证号", required: true },
        { name: "qualificationExpiry", label: "有效期截止日期", type: "date", required: true },
        { name: "qualificationAttachment", label: "证件附件", type: "file", full: true },
      ] },
      { title: "其他信息", hint: "运费结算与补充说明", fields: [
        { name: "bankCard", label: "银行卡号", inputmode: "numeric" }, { name: "bankName", label: "开户银行" },
        { name: "remark", label: "备注", type: "textarea", full: true },
      ] },
    ],
  },
  customer: {
    intro: "完善客户资料后，新建运单可直接选择并自动带出常用地址。",
    sections: [
      { title: "基础信息", hint: "客户主体和可用状态", fields: [
        { name: "customerNo", label: "客户编号", readonly: true, hint: "系统自动生成，无需填写" },
        { name: "customerName", label: "客户全称", required: true, full: true, placeholder: "营业执照上的企业全称" },
        { name: "shortName", label: "简称" },
        { name: "customerType", label: "客户类型", type: "select", required: true, options: [["", "请选择"], "国际货运代理（货代）", "船公司 / 船代", "第三方物流 / 供应链公司", "跨境电商物流商"] },
        { name: "creditCode", label: "统一社会信用代码", required: true, full: true, pattern: "[0-9A-Z]{18}", maxlength: "18", hint: "18 位数字或大写字母" },
        { name: "customerStatus", label: "客户状态", type: "select", required: true, options: ["启用", "停用"] },
      ] },
      { title: "联系信息", hint: "日常运输协调联系人", fields: [
        { name: "contactName", label: "主要联系人", required: true },
        { name: "mobile", label: "手机", type: "tel", required: true, pattern: "1[0-9]{10}", maxlength: "11", inputmode: "numeric" },
        { name: "phone", label: "电话", type: "tel" }, { name: "email", label: "邮箱", type: "email" },
      ] },
      { title: "地址信息", hint: "运单选择客户后自动带出", fields: [
        { name: "registeredAddress", label: "注册地址", full: true },
        { name: "loadAddress", label: "默认装货地址", required: true, full: true },
        { name: "unloadAddress", label: "默认卸货地址", required: true, full: true },
      ] },
      { title: "结算信息", hint: "默认结算和开票资料", fields: [
        { name: "settlementCycle", label: "结算周期", type: "select", required: true, options: [["", "请选择"], "现结", "月结15天", "月结30天", "月结45天", "月结60天"] },
        { name: "invoiceTitle", label: "开票抬头", full: true }, { name: "taxNo", label: "税号" },
        { name: "bankName", label: "开户银行", full: true }, { name: "bankAccount", label: "银行账号", inputmode: "numeric" },
        { name: "remark", label: "备注", type: "textarea", full: true },
      ] },
    ],
  },
};

const state = { currentView: "workbench", currentModule: "", moduleFilter: "全部", messageFilter: "all", search: "", detailItem: null, entryModule: "" };
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const h = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));

function localDate() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function optionMarkup(option, selectedValue = "") {
  const [value, label] = Array.isArray(option) ? option : [option, option];
  return `<option value="${h(value)}" ${String(value) === String(selectedValue) ? "selected" : ""}>${h(label)}</option>`;
}

function fieldMarkup(field) {
  const className = `mobile-field ${field.full ? "full" : ""} ${field.required ? "required" : ""}`;
  if (field.type === "file") return `<div class="${className}"><span>${h(field.label)}</span><label class="file-picker"><input name="${h(field.name)}" type="file" accept=".jpg,.jpeg,.png,.pdf" /><i data-lucide="upload-cloud"></i><strong>点击选择附件</strong><small>支持 JPG、PNG、PDF，单个文件不超过 10 MB</small></label></div>`;
  const attributes = [
    field.required ? "required" : "", field.placeholder ? `placeholder="${h(field.placeholder)}"` : "",
    field.min != null ? `min="${h(field.min)}"` : "", field.max != null ? `max="${h(field.max)}"` : "",
    field.step ? `step="${h(field.step)}"` : "", field.pattern ? `pattern="${h(field.pattern)}"` : "",
    field.maxlength ? `maxlength="${h(field.maxlength)}"` : "", field.inputmode ? `inputmode="${h(field.inputmode)}"` : "",
    field.readonly ? "readonly" : "", field.disabled ? "disabled" : "",
  ].filter(Boolean).join(" ");
  let control;
  if (field.type === "select") control = `<select name="${h(field.name)}" ${attributes}>${(field.options || []).map((item) => optionMarkup(item, field.value)).join("")}</select>`;
  else if (field.type === "textarea") control = `<textarea name="${h(field.name)}" ${attributes}>${h(field.value || "")}</textarea>`;
  else control = `<input name="${h(field.name)}" type="${h(field.type || "text")}" value="${h(field.value || "")}" ${attributes} />`;
  return `<label class="${className}"><span>${h(field.label)}</span>${control}${field.hint ? `<small>${h(field.hint)}</small>` : ""}</label>`;
}

function sectionMarkup(section, index) {
  return `<section class="mobile-form-section"><header class="mobile-form-section-heading"><span>${String(index + 1).padStart(2, "0")}</span><div><strong>${h(section.title)}</strong><small>${h(section.hint || "")}</small></div></header><div class="mobile-form-grid">${section.fields.map(fieldMarkup).join("")}${section.title === "收入与提成" ? '<div class="commission-preview"><span>预计司机提成</span><strong id="mobileCommissionPreview">¥0.00</strong></div>' : ""}</div></section>`;
}

function formIntro(icon, text) {
  return `<div class="entry-intro"><span><i data-lucide="${h(icon)}"></i></span><div><strong>资料填写</strong><small>${h(text)}</small></div></div>`;
}

function genericEntryMarkup(moduleName) {
  const definition = mobileFormDefinitions[moduleName];
  return `${formIntro(moduleCatalog[moduleName].icon, definition.intro)}${definition.sections.map(sectionMarkup).join("")}`;
}

function routeInfo(item) {
  if (item.raw) return item.raw;
  const [origin = "", destination = ""] = item.subtitle.split("→").map((value) => value.trim());
  return {
    routeName: item.title, origin, destination,
    estimatedRevenue: (item.fields.find(([label]) => label === "预估收入") || [null, "2600"])[1].replace(/[^0-9.]/g, "") || "2600",
    commissionValue: (item.fields.find(([label]) => label === "提成金额") || [null, "350"])[1].replace(/[^0-9.]/g, "") || "350",
  };
}

function customerInfo(item) {
  if (item.raw) return item.raw;
  const defaults = {
    "宁波远海供应链有限公司": ["宁波北仑港区二期", "宁波江北物流园"],
    "上海嘉航国际物流有限公司": ["上海洋山港", "昆山综合保税区"],
    "杭州联贸进出口有限公司": ["杭州萧山仓", "宁波梅山码头"],
    "上海港联贸易有限公司": ["上海外高桥", "苏州工业园区"],
  };
  const [loadAddress = "", unloadAddress = ""] = defaults[item.title] || ["", ""];
  return { customerName: item.title, loadAddress, unloadAddress };
}

function nextBusinessId(prefix, count) {
  return `${prefix}${localDate().replaceAll("-", "")}${String(count + 1).padStart(3, "0")}`;
}

function containerCardMarkup() {
  return `<div class="repeat-card" data-repeat-card="container"><div class="mobile-form-grid">
    ${fieldMarkup({ name: "containerNo", label: "箱号", required: true, placeholder: "请输入箱号" })}
    ${fieldMarkup({ name: "sealNo", label: "封号", required: true, placeholder: "请输入封号" })}
    ${fieldMarkup({ name: "containerType", label: "箱型", type: "select", options: ["40HQ", "40GP", "20GP", "20HQ"] })}
    ${fieldMarkup({ name: "pickupPoint", label: "提箱点", required: true })}
    ${fieldMarkup({ name: "returnPoint", label: "还箱点", required: true, full: true })}
  </div><button class="repeat-card-remove" data-remove-repeat type="button">删除此箱</button></div>`;
}

function feeCardMarkup(type) {
  const settlementLabel = type === "receivable" ? "已收金额" : "已付金额";
  const targetOptions = type === "receivable" ? ["客户", "其他"] : ["司机", "承运商", "其他"];
  return `<div class="repeat-card" data-repeat-card="fee" data-fee-type="${type}"><div class="mobile-form-grid">
    ${fieldMarkup({ name: `${type}Target`, label: "结算对象", type: "select", options: targetOptions })}
    ${fieldMarkup({ name: `${type}Unit`, label: "单位名称", required: true })}
    ${fieldMarkup({ name: `${type}Kind`, label: "费用类型", required: true, placeholder: "例如 运费" })}
    ${fieldMarkup({ name: `${type}Quantity`, label: "数量", type: "number", min: "0", step: "1", required: true, value: "1" })}
    ${fieldMarkup({ name: `${type}Price`, label: "单价", type: "number", min: "0", step: "0.01", required: true })}
    ${fieldMarkup({ name: `${type}Settled`, label: settlementLabel, type: "number", min: "0", step: "0.01", value: "0" })}
    ${fieldMarkup({ name: `${type}Invoice`, label: "需开票", type: "select", options: ["否", "是"] })}
    <div class="commission-preview"><span>金额 / 未结</span><strong data-fee-total>¥0.00 / ¥0.00</strong></div>
  </div><button class="repeat-card-remove" data-remove-repeat type="button">删除此费用</button></div>`;
}

function waybillEntryMarkup() {
  const waybillNo = nextBusinessId("WB", moduleCatalog.waybill.items.length);
  const routeOptions = [["", "请选择固定线路"], ...moduleCatalog.route.items.filter((item) => item.status === "启用").map((item) => [item.id, item.title])];
  const customerOptions = [["", "请选择客户"], ...moduleCatalog.customer.items.filter((item) => item.status === "启用").map((item) => [item.id, item.title])];
  return `${formIntro("file-plus-2", "运单号与接单日期自动生成，客户和线路可联动带出业务信息。")}
    <section class="mobile-form-section"><header class="mobile-form-section-heading"><span>01</span><div><strong>业务信息</strong><small>客户委托、箱货资料和回单要求</small></div></header>
      <div class="generated-strip"><div><span>运单号</span><strong id="mobileGeneratedWaybillNo">${waybillNo}</strong></div><div><span>接单日期</span><strong>${localDate()}</strong></div></div>
      <input name="waybillNo" type="hidden" value="${waybillNo}" /><input name="orderDate" type="hidden" value="${localDate()}" />
      <div class="mobile-form-grid">
        ${fieldMarkup({ name: "routeId", label: "固定线路", type: "select", required: true, options: routeOptions })}
        ${fieldMarkup({ name: "customerId", label: "客户名称", type: "select", required: true, options: customerOptions })}
        ${fieldMarkup({ name: "billNo", label: "提单号" })}${fieldMarkup({ name: "receiptDate", label: "回单日期", type: "date" })}
        ${fieldMarkup({ name: "loadAddress", label: "装卸地址", required: true, full: true, placeholder: "选择客户后自动带出" })}
        <div class="mobile-switches"><label><input name="dispatchable" type="checkbox" checked />可调度</label><label><input name="needReceipt" type="checkbox" />需要回单</label><label><input name="receivedReceipt" type="checkbox" />收到回单</label></div>
        ${fieldMarkup({ name: "remark", label: "备注", type: "textarea", full: true })}
      </div>
    </section>
    <section class="mobile-form-section"><div class="repeat-heading"><div><strong>箱信息</strong><small>默认 1 个，可继续新增</small></div><button data-add-repeat="container" type="button">新增箱信息</button></div><div class="repeat-list" id="mobileContainerList">${containerCardMarkup()}</div></section>
    <section class="mobile-form-section"><div class="repeat-heading"><div><strong>应收费用</strong><small>向客户结算的收入项目</small></div><button data-add-repeat="receivable" type="button">添加费用</button></div><div class="repeat-list" id="mobileReceivableList">${feeCardMarkup("receivable")}</div></section>
    <section class="mobile-form-section"><div class="repeat-heading"><div><strong>应付费用</strong><small>向司机或承运商结算的成本</small></div><button data-add-repeat="payable" type="button">添加费用</button></div><div class="repeat-list" id="mobilePayableList">${feeCardMarkup("payable")}</div></section>`;
}

function dispatchEntryMarkup() {
  const waybillOptions = [["", "请选择已有运单"], ...moduleCatalog.waybill.items.map((item) => [item.id, `${item.id} · ${item.title}`])];
  return `${formIntro("send", "先选择已有运单，再分配司机与车辆；提交后推送至司机移动端。")}
    <section class="mobile-form-section"><header class="mobile-form-section-heading"><span>01</span><div><strong>选择运单</strong><small>选择后自动回显线路、地址和箱信息</small></div></header><div class="mobile-form-grid">${fieldMarkup({ name: "waybillId", label: "运单号", type: "select", required: true, full: true, options: waybillOptions })}</div>
      <div class="readonly-summary" id="mobileDispatchSummary"><div><span>固定线路</span><strong data-summary="route"></strong></div><div><span>起运地</span><strong data-summary="origin"></strong></div><div><span>目的地</span><strong data-summary="destination"></strong></div><div><span>装卸地址</span><strong data-summary="address"></strong></div><div><span>箱信息</span><strong data-summary="boxes"></strong></div><div><span>预估收入</span><strong data-summary="revenue"></strong></div><div><span>司机提成</span><strong data-summary="commission"></strong></div></div>
    </section>
    <section class="mobile-form-section"><header class="mobile-form-section-heading"><span>02</span><div><strong>调度安排</strong><small>选择司机和车辆</small></div></header><div class="mobile-form-grid">
      ${fieldMarkup({ name: "driverId", label: "司机", type: "select", required: true, disabled: true, options: [["", "请选择司机"], ...moduleCatalog.driver.items.filter((item) => item.status !== "停用").map((item) => [item.id, item.title])] })}
      ${fieldMarkup({ name: "vehicleId", label: "车辆", type: "select", required: true, disabled: true, options: [["", "请选择车辆"], ...moduleCatalog.vehicle.items.filter((item) => item.status === "在用").map((item) => [item.id, item.id])] })}
      ${fieldMarkup({ name: "note", label: "派单备注", full: true, type: "textarea" })}
    </div></section>`;
}

function autoEntryMarkup() {
  return `${formIntro("wand-sparkles", "设置自动执行方式和匹配规则，配置保存后立即生效。")}
    <div class="auto-setting-banner"><span><i data-lucide="refresh-cw"></i></span><div><strong>自动执行已开启</strong><small>新任务进入后自动匹配并派单</small></div></div>
    <section class="mobile-form-section"><header class="mobile-form-section-heading"><span>01</span><div><strong>执行设置</strong><small>控制触发方式与异常重试</small></div></header><div class="mobile-form-grid">
      <label class="toggle-field"><span>启用自动执行</span><input name="enabled" type="checkbox" checked /></label>
      ${fieldMarkup({ name: "triggerMode", label: "执行方式", type: "select", full: true, options: [["realtime", "新任务立即执行"], ["interval", "定时批量执行"]] })}
      ${fieldMarkup({ name: "intervalMinutes", label: "执行间隔", type: "select", full: true, options: [["5", "每 5 分钟"], ["10", "每 10 分钟"], ["30", "每 30 分钟"], ["60", "每 60 分钟"]] })}
      <label class="toggle-field"><span>异常自动重试</span><input name="retry" type="checkbox" checked /></label>
    </div></section>
    <section class="mobile-form-section"><header class="mobile-form-section-heading"><span>02</span><div><strong>匹配规则</strong><small>线路优先、闲置优先、负载均衡</small></div></header><div class="mobile-form-grid">
      ${fieldMarkup({ name: "maxTrips", label: "司机单日任务上限", type: "select", options: [["1", "1 趟 / 天"], ["2", "2 趟 / 天"], ["3", "3 趟 / 天"]] })}
      ${fieldMarkup({ name: "warningDays", label: "临期提示阈值", type: "select", value: "30", options: [["7", "提前 7 天"], ["30", "提前 30 天"], ["60", "提前 60 天"]] })}
    </div></section>`;
}

function refreshIcons() { window.lucide?.createIcons(); }

function showToast(message) {
  const toast = $("#managerToast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 1900);
}

function switchView(view) {
  state.currentView = view;
  $(".manager-shell").classList.remove("subpage-open");
  $$(".manager-view").forEach((item) => item.classList.toggle("active", item.id === `${view}View`));
  $$("#managerBottomNav button").forEach((button) => button.classList.toggle("active", button.dataset.view === view));
  $("#managerTitle").textContent = { workbench: "工作台", messages: "消息", profile: "我的" }[view];
  $("#headerEyebrow").textContent = view === "workbench" ? "集卡物流管理端" : view === "messages" ? "任务与预警通知" : "运营中心账号";
  if (view === "messages") renderMessages();
  $("#moduleView").classList.remove("open");
  $("#managerDetailView").classList.remove("open");
  $("#managerEntryView").classList.remove("open");
  $("#managerEntryView").setAttribute("aria-hidden", "true");
}

function renderWorkbench() {
  $("#focusList").innerHTML = `
    <button class="focus-row" data-open-module="dispatch" type="button"><span class="focus-symbol"><i data-lucide="circle-alert"></i></span><span><strong>2 条任务等待执行</strong><small>优先完成司机和车辆匹配</small></span><em>去处理</em></button>
    <button class="focus-row" data-open-module="reminder" type="button"><span class="focus-symbol blue"><i data-lucide="shield-alert"></i></span><span><strong>2 项车辆证件预警</strong><small>包含 1 项已过期记录</small></span><em>查看</em></button>`;
  const loads = [["北仑港至江北仓", "2 单", 67], ["洋山港至昆山保税区", "1 单", 50], ["萧山仓至梅山码头", "1 单", 50]];
  $("#mobileRouteLoad").innerHTML = loads.map(([name, count, load]) => `<div class="route-load-item"><div><strong>${name}</strong><small>今日 ${count}</small></div><div class="route-progress ${load >= 80 ? "warning" : ""}"><i><b style="width:${load}%"></b></i><span>${load}% 饱和度</span></div></div>`).join("");
  refreshIcons();
}

function moduleStatusMatches(item, filter) {
  if (filter === "全部") return true;
  if (filter === "空闲") return item.fields.some(([, value]) => value === "已完工") || item.status === "空闲";
  if (filter === "保险即将到期" || filter === "审验即将到期" || filter === "已过期") return item.status === filter;
  return item.status === filter;
}

function renderModule() {
  const meta = moduleCatalog[state.currentModule];
  if (!meta) return;
  const query = state.search.trim().toLowerCase();
  const items = meta.items.filter((item) => moduleStatusMatches(item, state.moduleFilter) && (!query || JSON.stringify(item).toLowerCase().includes(query)));
  $("#moduleFilters").innerHTML = meta.filters.map((filter) => `<button class="${filter === state.moduleFilter ? "active" : ""}" data-module-filter="${h(filter)}" type="button">${h(filter)}</button>`).join("");
  $("#moduleSummary").innerHTML = `<span>当前结果</span><strong>${items.length} 条</strong>`;
  $("#moduleList").innerHTML = items.length ? items.map((item) => `
    <article class="manager-list-card">
      <div class="list-card-top"><div><strong>${h(item.title)}</strong><small>${h(item.id)} · ${h(item.subtitle)}</small></div><span class="status-tag ${h(item.statusClass)}">${h(item.status)}</span></div>
      <div class="list-card-grid">${item.fields.slice(0, 4).map(([label, value]) => `<div class="list-field"><span>${h(label)}</span><strong>${h(value)}</strong></div>`).join("")}</div>
      <div class="list-card-footer"><span>${h(item.note || "资料已同步")}</span><button class="${item.status === "待派单" || item.status === "待处理" ? "primary" : ""}" data-module-detail="${h(item.id)}" type="button">${item.status === "待派单" ? "去派单" : item.status === "待处理" ? "去处理" : "查看详情"}</button></div>
    </article>`).join("") : `<div class="module-empty"><span><i data-lucide="inbox"></i></span><strong>暂无匹配数据</strong><small>调整搜索或筛选条件后重试</small></div>`;
  refreshIcons();
}

function openModule(moduleName, filter = "全部") {
  const meta = moduleCatalog[moduleName];
  if (!meta) return;
  state.currentModule = moduleName;
  state.moduleFilter = meta.filters.includes(filter) ? filter : "全部";
  state.search = "";
  $("#moduleSearch").value = "";
  $("#clearModuleSearch").classList.remove("visible");
  $("#moduleEyebrow").textContent = meta.eyebrow;
  $("#moduleTitle").textContent = meta.title;
  $("#modulePrimaryButton").setAttribute("aria-label", meta.primary);
  $("#moduleView").classList.add("open");
  $("#moduleView").setAttribute("aria-hidden", "false");
  $(".manager-shell").classList.add("subpage-open");
  renderModule();
}

function closeModule() {
  $("#moduleView").classList.remove("open");
  $("#moduleView").setAttribute("aria-hidden", "true");
  $("#managerDetailView").classList.remove("open");
  $("#managerDetailView").setAttribute("aria-hidden", "true");
  $("#managerEntryView").classList.remove("open");
  $("#managerEntryView").setAttribute("aria-hidden", "true");
  $(".manager-shell").classList.remove("subpage-open");
}

function updateRouteCommission() {
  const form = $("#managerEntryForm");
  if (state.entryModule !== "route" || !form.elements.commissionType) return;
  const isRate = form.elements.commissionType.value === "rate";
  const value = Number(form.elements.commissionValue.value) || 0;
  const revenue = Number(form.elements.estimatedRevenue.value) || 0;
  form.elements.commissionValue.max = isRate ? "100" : "";
  form.elements.commissionValue.closest(".mobile-field").querySelector("span").textContent = isRate ? "收入提成比例（%）" : "固定提成金额（元）";
  $("#mobileCommissionPreview").textContent = `¥${(isRate ? revenue * value / 100 : value).toFixed(2)}`;
}

function updateDispatchSummary() {
  const form = $("#managerEntryForm");
  if (state.entryModule !== "dispatch" || !form.elements.waybillId) return;
  const waybill = moduleCatalog.waybill.items.find((item) => item.id === form.elements.waybillId.value);
  const driver = form.elements.driverId;
  const vehicle = form.elements.vehicleId;
  driver.disabled = !waybill;
  vehicle.disabled = !waybill;
  if (!waybill) { driver.value = ""; vehicle.value = ""; }
  const route = waybill ? moduleCatalog.route.items.find((item) => item.title === waybill.subtitle) : null;
  const routeRaw = route ? routeInfo(route) : {};
  const field = (label) => waybill?.fields.find(([name]) => name === label)?.[1] || "";
  const values = {
    route: waybill?.subtitle || "", origin: routeRaw.origin || "", destination: routeRaw.destination || "",
    address: field("装卸地址"), boxes: waybill?.raw?.containers?.map((item) => `${item.containerType} ${item.containerNo}`).join("、") || field("箱型"),
    revenue: routeRaw.estimatedRevenue ? `¥${routeRaw.estimatedRevenue}` : "", commission: routeRaw.commissionValue ? `¥${routeRaw.commissionValue}` : "",
  };
  $$("#mobileDispatchSummary [data-summary]").forEach((node) => { node.textContent = values[node.dataset.summary] || ""; });
}

function updateWaybillCustomer() {
  const form = $("#managerEntryForm");
  if (state.entryModule !== "waybill" || !form.elements.customerId) return;
  const customer = moduleCatalog.customer.items.find((item) => item.id === form.elements.customerId.value);
  const info = customer ? customerInfo(customer) : null;
  if (info) form.elements.loadAddress.value = [info.loadAddress, info.unloadAddress].filter(Boolean).join(" / ");
  const unit = form.querySelector('[name="receivableUnit"]');
  if (unit && customer) unit.value = customer.title;
}

function loadWaybillRouteDefaults() {
  const form = $("#managerEntryForm");
  if (state.entryModule !== "waybill" || !form.elements.routeId) return;
  const route = moduleCatalog.route.items.find((item) => item.id === form.elements.routeId.value);
  if (!route) return;
  const info = routeInfo(route);
  const receivablePrice = form.querySelector('[name="receivablePrice"]');
  const payablePrice = form.querySelector('[name="payablePrice"]');
  if (receivablePrice && !receivablePrice.value) receivablePrice.value = info.estimatedRevenue || "";
  if (payablePrice && !payablePrice.value) payablePrice.value = info.commissionValue || "";
  const receivableKind = form.querySelector('[name="receivableKind"]');
  const payableKind = form.querySelector('[name="payableKind"]');
  if (receivableKind && !receivableKind.value) receivableKind.value = "运费";
  if (payableKind && !payableKind.value) payableKind.value = "司机提成";
  updateAllFeeTotals();
}

function updateFeeTotal(card) {
  const type = card.dataset.feeType;
  const quantity = Number(card.querySelector(`[name="${type}Quantity"]`)?.value) || 0;
  const price = Number(card.querySelector(`[name="${type}Price"]`)?.value) || 0;
  const settled = Number(card.querySelector(`[name="${type}Settled"]`)?.value) || 0;
  const total = quantity * price;
  card.querySelector("[data-fee-total]").textContent = `¥${total.toFixed(2)} / ¥${Math.max(0, total - settled).toFixed(2)}`;
}

function updateAllFeeTotals() {
  $$("#managerEntryContent [data-repeat-card=fee]").forEach(updateFeeTotal);
}

function setupEntryBehavior(moduleName) {
  const form = $("#managerEntryForm");
  if (moduleName === "route") updateRouteCommission();
  if (moduleName === "dispatch") updateDispatchSummary();
  if (moduleName === "waybill") { updateWaybillCustomer(); loadWaybillRouteDefaults(); }
  if (moduleName === "auto") updateAutoMode();
  form.querySelectorAll("[required]").forEach((control) => control.addEventListener("invalid", () => control.classList.add("touched")));
}

function updateAutoMode() {
  const form = $("#managerEntryForm");
  if (state.entryModule !== "auto" || !form.elements.triggerMode) return;
  const disabled = form.elements.triggerMode.value === "realtime";
  form.elements.intervalMinutes.disabled = disabled;
  form.elements.intervalMinutes.closest(".mobile-field").style.opacity = disabled ? ".5" : "1";
}

function generateMobileCustomerNo() {
  const maxNumber = moduleCatalog.customer.items.reduce((max, item) => {
    const match = /^KH-(\d+)$/i.exec(item.id);
    return match ? Math.max(max, Number(match[1])) : max;
  }, 1000);
  return `KH-${String(maxNumber + 1).padStart(4, "0")}`;
}

function openEntry(moduleName) {
  if (!["waybill", "route", "dispatch", "auto", "vehicle", "driver", "customer"].includes(moduleName)) {
    showToast("该模块无需新增建档");
    return;
  }
  state.entryModule = moduleName;
  const meta = moduleCatalog[moduleName];
  $("#entryEyebrow").textContent = meta.eyebrow;
  $("#entryTitle").textContent = moduleName === "auto" ? "自动派单设置" : meta.primary;
  $("#entrySaveButton").textContent = moduleName === "dispatch" ? "派单并推送" : moduleName === "auto" ? "保存设置" : meta.primary.replace("新增", "保存");
  $("#managerEntryContent").innerHTML = moduleName === "waybill" ? waybillEntryMarkup() : moduleName === "dispatch" ? dispatchEntryMarkup() : moduleName === "auto" ? autoEntryMarkup() : genericEntryMarkup(moduleName);
  $("#managerEntryForm").reset();
  if (moduleName === "customer") {
    $("#managerEntryForm").elements.customerNo.value = generateMobileCustomerNo();
  }
  if (moduleName === "waybill") {
    $("#managerEntryForm").elements.waybillNo.value = $("#mobileGeneratedWaybillNo").textContent;
    $("#managerEntryForm").elements.orderDate.value = localDate();
  }
  if (moduleName === "auto") {
    try {
      const settings = JSON.parse(localStorage.getItem(AUTO_SETTINGS_KEY) || "null");
      if (settings) {
        ["triggerMode", "intervalMinutes", "maxTrips", "warningDays"].forEach((name) => { if (settings[name] != null) $("#managerEntryForm").elements[name].value = settings[name]; });
        $("#managerEntryForm").elements.enabled.checked = settings.enabled !== false;
        $("#managerEntryForm").elements.retry.checked = settings.retry !== false;
      }
    } catch (error) { /* use form defaults */ }
  }
  $("#managerEntryView").classList.add("open");
  $("#managerEntryView").setAttribute("aria-hidden", "false");
  $(".manager-shell").classList.add("subpage-open");
  setupEntryBehavior(moduleName);
  refreshIcons();
}

function closeEntry() {
  $("#managerEntryView").classList.remove("open");
  $("#managerEntryView").setAttribute("aria-hidden", "true");
  state.entryModule = "";
}

function openDetail(item) {
  state.detailItem = item;
  $("#detailTitle").textContent = item.title;
  $("#managerDetailContent").innerHTML = `
    <section class="detail-hero"><span>${h(item.id)}</span><h2>${h(item.title)}</h2><p>${h(item.subtitle)}</p></section>
    <section class="detail-section"><h3>基础信息</h3>${item.fields.map(([label, value]) => `<div class="detail-row"><span>${h(label)}</span><strong>${h(value)}</strong></div>`).join("")}</section>
    <section class="detail-section"><h3>备注</h3><div class="detail-row"><span>业务说明</span><strong>${h(item.note || "暂无备注")}</strong></div><div class="detail-row"><span>当前状态</span><strong>${h(item.status)}</strong></div></section>`;
  $("#managerDetailView").classList.add("open");
  $("#managerDetailView").setAttribute("aria-hidden", "false");
  refreshIcons();
}

const MOBILE_RECORDS_KEY = "container-logistics-manager-mobile-records-v1";
const AUTO_SETTINGS_KEY = "container-logistics-manager-auto-settings-v1";

function fieldValueLabel(moduleName, field, value) {
  if (field.type !== "select") return value;
  const option = (field.options || []).find((item) => String(Array.isArray(item) ? item[0] : item) === String(value));
  return Array.isArray(option) ? option[1] : option || value;
}

function genericDetailFields(moduleName, values) {
  return mobileFormDefinitions[moduleName].sections.flatMap((section) => section.fields)
    .filter((field) => field.type !== "file" && values[field.name] !== "")
    .map((field) => [field.label.replace(/（.*?）/g, ""), fieldValueLabel(moduleName, field, values[field.name])]);
}

function collectContainers() {
  return $$("#mobileContainerList [data-repeat-card=container]").map((card) => ({
    containerNo: card.querySelector('[name="containerNo"]').value.trim(),
    sealNo: card.querySelector('[name="sealNo"]').value.trim(),
    containerType: card.querySelector('[name="containerType"]').value,
    pickupPoint: card.querySelector('[name="pickupPoint"]').value.trim(),
    returnPoint: card.querySelector('[name="returnPoint"]').value.trim(),
  }));
}

function collectFees(type) {
  return $$(`#mobile${type === "receivable" ? "Receivable" : "Payable"}List [data-repeat-card=fee]`).map((card) => {
    const quantity = Number(card.querySelector(`[name="${type}Quantity"]`).value) || 0;
    const price = Number(card.querySelector(`[name="${type}Price"]`).value) || 0;
    return {
      target: card.querySelector(`[name="${type}Target"]`).value,
      unit: card.querySelector(`[name="${type}Unit"]`).value.trim(),
      kind: card.querySelector(`[name="${type}Kind"]`).value.trim(), quantity, price,
      settled: Number(card.querySelector(`[name="${type}Settled"]`).value) || 0,
      invoice: card.querySelector(`[name="${type}Invoice"]`).value, amount: quantity * price,
    };
  });
}

function persistCreatedRecord(moduleName, item) {
  let records = {};
  try { records = JSON.parse(localStorage.getItem(MOBILE_RECORDS_KEY) || "{}") || {}; } catch (error) { records = {}; }
  records[moduleName] = Array.isArray(records[moduleName]) ? records[moduleName] : [];
  records[moduleName].unshift(item);
  localStorage.setItem(MOBILE_RECORDS_KEY, JSON.stringify(records));
}

function loadCreatedRecords() {
  let records = {};
  try { records = JSON.parse(localStorage.getItem(MOBILE_RECORDS_KEY) || "{}") || {}; } catch (error) { records = {}; }
  Object.entries(records).forEach(([moduleName, items]) => {
    if (!moduleCatalog[moduleName] || !Array.isArray(items)) return;
    items.slice().reverse().forEach((item) => {
      if (!moduleCatalog[moduleName].items.some((existing) => existing.id === item.id)) moduleCatalog[moduleName].items.unshift(item);
    });
  });
}

function updateWorkbenchCounts() {
  const labels = {
    waybill: `${moduleCatalog.waybill.items.length} 条记录`, route: `${moduleCatalog.route.items.length} 条线路`,
    dispatch: `${moduleCatalog.dispatch.items.filter((item) => item.status === "待派单").length} 条待执行`,
    vehicle: `${moduleCatalog.vehicle.items.length} 台车辆`, driver: `${moduleCatalog.driver.items.length} 名司机`,
    customer: `${moduleCatalog.customer.items.length} 家客户`, reminder: `${moduleCatalog.reminder.items.length} 项待处理`,
  };
  Object.entries(labels).forEach(([moduleName, label]) => {
    const node = $(`#moduleGrid [data-open-module="${moduleName}"] small`);
    if (node) node.textContent = label;
  });
}

function createMobileRecord(moduleName, values) {
  if (moduleName === "waybill") {
    const route = moduleCatalog.route.items.find((item) => item.id === values.routeId);
    const customer = moduleCatalog.customer.items.find((item) => item.id === values.customerId);
    const containers = collectContainers();
    const receivable = collectFees("receivable");
    const payable = collectFees("payable");
    const receivableTotal = receivable.reduce((sum, item) => sum + item.amount, 0);
    const payableTotal = payable.reduce((sum, item) => sum + item.amount, 0);
    return {
      id: values.waybillNo, title: customer?.title || "未选择客户", subtitle: route?.title || "未选择线路", status: "草拟", statusClass: "warning",
      fields: [["接单日期", values.orderDate], ["提单号", values.billNo || "-"], ["箱型", containers.map((item) => item.containerType).join("、")], ["装卸地址", values.loadAddress], ["需要回单", values.needReceipt ? "是" : "否"], ["应收金额", `¥${receivableTotal.toFixed(2)}`], ["应付金额", `¥${payableTotal.toFixed(2)}`], ["预计利润", `¥${(receivableTotal - payableTotal).toFixed(2)}`]],
      note: values.remark || "移动端新建运单", raw: { ...values, containers, receivable, payable },
    };
  }
  if (moduleName === "route") {
    const typeLabel = values.commissionType === "rate" ? "收入比例" : "固定金额";
    return { id: `XL-${String(moduleCatalog.route.items.length + 1).padStart(3, "0")}`, title: values.routeName, subtitle: `${values.origin} → ${values.destination}`, status: values.routeState, statusClass: values.routeState === "启用" ? "success" : "muted", fields: [["预估收入", `¥${values.estimatedRevenue}`], ["基础运价", `¥${values.baseFreight}`], ["提成方式", typeLabel], ["提成金额", values.commissionType === "rate" ? `${values.commissionValue}%` : `¥${values.commissionValue}`], ["常用车辆", values.defaultVehicle || "未指定"], ["常用司机", values.defaultDriver || "未指定"]], note: values.remark || values.commissionRemark || "移动端新建线路", raw: values };
  }
  if (moduleName === "dispatch") {
    const waybill = moduleCatalog.waybill.items.find((item) => item.id === values.waybillId);
    const driver = moduleCatalog.driver.items.find((item) => item.id === values.driverId);
    const vehicle = moduleCatalog.vehicle.items.find((item) => item.id === values.vehicleId);
    return { id: `PD-${String(moduleCatalog.dispatch.items.length + 1001)}`, title: waybill?.subtitle || "待确认线路", subtitle: waybill?.id || values.waybillId, status: "已派单", statusClass: "", fields: [["司机", driver?.title || ""], ["车辆", vehicle?.id || ""], ["当前节点", "待提货"], ["派单方式", "手动派单"], ["派单时间", new Date().toLocaleString("zh-CN", { hour12: false })]], note: values.note || "已推送至司机移动端", raw: values };
  }
  if (moduleName === "vehicle") return { id: values.plateNo, title: values.vehicleType, subtitle: values.fleetName || values.fleet || "未设置车队", status: values.vehicleState, statusClass: values.vehicleState === "在用" ? "success" : values.vehicleState === "维修中" ? "warning" : "muted", fields: [["驾驶员", values.driver], ["车辆所属", values.ownership], ["车架号", values.vin], ["发动机号", values.engineNo], ["营运证号", values.permitNo], ["审验到期", values.inspectionDue], ["保险到期", values.insuranceDue], ...genericDetailFields(moduleName, values)], note: values.remark || "移动端新建车辆档案", raw: values };
  if (moduleName === "driver") return { id: `SJ-${String(moduleCatalog.driver.items.length + 1001)}`, title: values.name, subtitle: `${values.fleet} · ${values.phone}`, status: values.driverState, statusClass: values.driverState === "空闲" ? "success" : values.driverState === "停用" ? "muted" : "", fields: [["准驾车型", values.licenseClass], ["认证", "待认证"], ["驾驶证到期", values.licenseExpiry], ["资格证到期", values.qualificationExpiry], ...genericDetailFields(moduleName, values)], note: values.remark || "自有司机", raw: values };
  if (moduleName === "customer") return { id: values.customerNo, title: values.customerName, subtitle: `简称：${values.shortName || "-"}`, status: values.customerStatus, statusClass: values.customerStatus === "启用" ? "success" : "muted", fields: [["客户类型", values.customerType], ["联系人", values.contactName], ["手机", values.mobile], ["结算周期", values.settlementCycle], ...genericDetailFields(moduleName, values)], note: `默认装货地址：${values.loadAddress}`, raw: values };
  return null;
}

function hasDuplicateRecord(moduleName, values) {
  if (moduleName === "vehicle" && moduleCatalog.vehicle.items.some((item) => item.id === values.plateNo)) return "车牌号码已存在";
  if (moduleName === "driver" && moduleCatalog.driver.items.some((item) => item.raw?.idCard === values.idCard)) return "身份证号码已存在";
  if (moduleName === "customer" && moduleCatalog.customer.items.some((item) => item.id.toLowerCase() === values.customerNo.toLowerCase())) return "客户编号已存在";
  return "";
}

function saveEntry(event) {
  event.preventDefault();
  const form = $("#managerEntryForm");
  if (!form.checkValidity()) { form.querySelectorAll("select:invalid").forEach((select) => select.classList.add("touched")); form.reportValidity(); return; }
  const formData = new FormData(form);
  const values = Object.fromEntries([...formData.entries()].map(([key, value]) => [key, value instanceof File ? value.name : String(value).trim()]));
  values.needReceipt = form.elements.needReceipt?.checked || false;
  values.receivedReceipt = form.elements.receivedReceipt?.checked || false;
  values.dispatchable = form.elements.dispatchable?.checked || false;
  if (state.entryModule === "auto") {
    const settings = { ...values, enabled: form.elements.enabled.checked, retry: form.elements.retry.checked };
    localStorage.setItem(AUTO_SETTINGS_KEY, JSON.stringify(settings));
    closeEntry();
    showToast("自动派单设置已保存");
    return;
  }
  const duplicate = hasDuplicateRecord(state.entryModule, values);
  if (duplicate) { showToast(duplicate); return; }
  const item = createMobileRecord(state.entryModule, values);
  if (!item) return;
  moduleCatalog[state.entryModule].items.unshift(item);
  persistCreatedRecord(state.entryModule, item);
  const moduleName = state.entryModule;
  closeEntry();
  state.search = "";
  state.moduleFilter = "全部";
  renderModule();
  updateWorkbenchCounts();
  showToast(moduleName === "dispatch" ? "派单成功，已推送至司机移动端" : `${moduleCatalog[moduleName].title}已保存`);
}

function renderMessages() {
  const list = messages.filter((item) => state.messageFilter === "all" || item.type === state.messageFilter);
  $("#messageList").innerHTML = list.map((item) => `<button class="message-item ${item.unread ? "unread" : ""}" data-message-id="${item.id}" type="button"><span class="message-icon ${item.style}"><i data-lucide="${item.icon}"></i></span><span class="message-copy"><strong>${h(item.title)}</strong><p>${h(item.desc)}</p><time>${h(item.time)}</time></span></button>`).join("");
  refreshIcons();
}

function openAutoControl() {
  openModule("auto");
  let settingText = "新任务进入后立即执行";
  try {
    const settings = JSON.parse(localStorage.getItem(AUTO_SETTINGS_KEY) || "null");
    if (settings?.triggerMode === "interval") settingText = `每 ${settings.intervalMinutes || 10} 分钟识别待派单任务`;
  } catch (error) { /* use default text */ }
  $("#moduleList").insertAdjacentHTML("afterbegin", `<section class="auto-control"><span><i data-lucide="wand-sparkles"></i></span><div><strong>自动执行中</strong><small>${h(settingText)}</small></div><button data-auto-run type="button">立即执行</button></section>`);
  refreshIcons();
}

$("#managerBottomNav").addEventListener("click", (event) => {
  const button = event.target.closest("[data-view]");
  if (button) switchView(button.dataset.view);
});

document.addEventListener("click", (event) => {
  const moduleButton = event.target.closest("[data-open-module]");
  const tabTarget = event.target.closest("[data-tab-target]");
  const quickAction = event.target.closest("[data-quick-action]");
  const profileAction = event.target.closest("[data-profile-action]");
  if (moduleButton) {
    const name = moduleButton.dataset.openModule;
    if (name === "auto") openAutoControl(); else openModule(name, moduleButton.dataset.filter || "全部");
  }
  if (tabTarget) switchView(tabTarget.dataset.tabTarget);
  if (quickAction) {
    const name = quickAction.dataset.quickAction;
    openModule(name);
    openEntry(name);
  }
  if (profileAction) {
    if (profileAction.dataset.profileAction === "desktop") window.location.href = "index.html";
    else showToast({ profile: "个人资料编辑功能", role: "当前角色：调度管理员", notification: "消息设置已打开", security: "账号安全状态正常", about: "集卡物流管理端 1.0" }[profileAction.dataset.profileAction]);
  }
});

$("#headerMessageButton").addEventListener("click", () => switchView("messages"));
$("#manageModulesButton").addEventListener("click", () => $("#moduleGrid").scrollIntoView({ behavior: "smooth", block: "center" }));
$("#moduleBackButton").addEventListener("click", closeModule);
$("#detailBackButton").addEventListener("click", () => { $("#managerDetailView").classList.remove("open"); $("#managerDetailView").setAttribute("aria-hidden", "true"); });
$("#modulePrimaryButton").addEventListener("click", () => openEntry(state.currentModule));
$("#detailActionButton").addEventListener("click", () => showToast("更多业务操作"));
$("#entryBackButton").addEventListener("click", closeEntry);
$("#entryCancelButton").addEventListener("click", closeEntry);
$("#managerEntryForm").addEventListener("submit", saveEntry);

$("#managerEntryContent").addEventListener("click", (event) => {
  const addButton = event.target.closest("[data-add-repeat]");
  if (addButton) {
    const type = addButton.dataset.addRepeat;
    const list = type === "container" ? $("#mobileContainerList") : type === "receivable" ? $("#mobileReceivableList") : $("#mobilePayableList");
    list.insertAdjacentHTML("beforeend", type === "container" ? containerCardMarkup() : feeCardMarkup(type));
    refreshIcons();
    return;
  }
  const removeButton = event.target.closest("[data-remove-repeat]");
  if (removeButton) removeButton.closest("[data-repeat-card]").remove();
});

$("#managerEntryContent").addEventListener("input", (event) => {
  if (state.entryModule === "route" && ["estimatedRevenue", "commissionValue"].includes(event.target.name)) updateRouteCommission();
  if (event.target.closest("[data-repeat-card=fee]")) updateFeeTotal(event.target.closest("[data-repeat-card=fee]"));
  if (["creditCode"].includes(event.target.name)) event.target.value = event.target.value.toUpperCase().replace(/[^0-9A-Z]/g, "");
  if (["mobile", "phone", "emergencyPhone", "bankAccount", "bankCard"].includes(event.target.name) && event.target.inputMode === "numeric") event.target.value = event.target.value.replace(/\D/g, "");
});

$("#managerEntryContent").addEventListener("change", (event) => {
  if (event.target.name === "commissionType") updateRouteCommission();
  if (event.target.name === "customerId") updateWaybillCustomer();
  if (event.target.name === "routeId") loadWaybillRouteDefaults();
  if (event.target.name === "waybillId") updateDispatchSummary();
  if (event.target.name === "triggerMode") updateAutoMode();
  if (event.target.type === "file") {
    const picker = event.target.closest(".file-picker");
    const fileName = event.target.files?.[0]?.name;
    picker.classList.toggle("selected", Boolean(fileName));
    picker.querySelector("strong").textContent = fileName || "点击选择附件";
    picker.querySelector("small").textContent = fileName ? "附件已选择，可点击重新选择" : "支持 JPG、PNG、PDF，单个文件不超过 10 MB";
  }
});

$("#moduleSearch").addEventListener("input", (event) => {
  state.search = event.target.value;
  $("#clearModuleSearch").classList.toggle("visible", Boolean(state.search));
  renderModule();
});
$("#clearModuleSearch").addEventListener("click", () => { state.search = ""; $("#moduleSearch").value = ""; $("#clearModuleSearch").classList.remove("visible"); renderModule(); });
$("#moduleFilters").addEventListener("click", (event) => { const button = event.target.closest("[data-module-filter]"); if (!button) return; state.moduleFilter = button.dataset.moduleFilter; renderModule(); });
$("#moduleList").addEventListener("click", (event) => {
  const autoRun = event.target.closest("[data-auto-run]");
  if (autoRun) { showToast("自动派单任务已提交执行"); return; }
  const button = event.target.closest("[data-module-detail]");
  if (!button) return;
  const item = moduleCatalog[state.currentModule].items.find((entry) => entry.id === button.dataset.moduleDetail);
  if (item) openDetail(item);
});

$("#messageTabs").addEventListener("click", (event) => {
  const button = event.target.closest("[data-message-filter]");
  if (!button) return;
  state.messageFilter = button.dataset.messageFilter;
  $$("#messageTabs button").forEach((item) => item.classList.toggle("active", item === button));
  renderMessages();
});
$("#messageList").addEventListener("click", (event) => {
  const button = event.target.closest("[data-message-id]");
  if (!button) return;
  const message = messages.find((item) => item.id === button.dataset.messageId);
  if (!message) return;
  message.unread = false;
  if (message.module === "auto") openAutoControl(); else openModule(message.module);
  renderMessages();
});
$("#readAllButton").addEventListener("click", () => { messages.forEach((item) => { item.unread = false; }); renderMessages(); showToast("消息已全部标记为已读"); });

loadCreatedRecords();
updateWorkbenchCounts();
renderWorkbench();
renderMessages();
refreshIcons();
