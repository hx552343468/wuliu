const waybills = [
  {
    waybillNo: "WB20260916001",
    orderDate: "2026-09-16",
    customerId: "KH-1008",
    customerName: "宁波远海供应链有限公司",
    billNo: "BL-NB26091601",
    loadAddress: "宁波北仑港区二期 / 江北仓",
    dispatchNo: "PC-260916-A01",
    dispatchDate: "2026-09-16",
    boxNo1: "TCLU8374621",
    sealNo1: "S983421",
    boxNo2: "-",
    sealNo2: "-",
    boxType: "40HQ",
    auditState: "草拟",
    needReceipt: "是",
    receivedReceipt: "否",
    remark: "上午装柜",
    freight: 2600,
    receivable: 2860,
    entryDate: "2026-09-16",
    profit: 420,
    payable: 2440,
    carrier: "甬港联运车队",
    returnPoint: "北仑三期堆场",
  },
  {
    waybillNo: "WB20260916002",
    orderDate: "2026-09-16",
    customerId: "KH-1022",
    customerName: "上海嘉航国际物流有限公司",
    billNo: "BL-SH26091607",
    loadAddress: "上海洋山港 / 昆山综合保税区",
    dispatchNo: "PC-260916-B03",
    dispatchDate: "2026-09-17",
    boxNo1: "MSKU4920183",
    sealNo1: "S771204",
    boxNo2: "MSKU4920184",
    sealNo2: "S771205",
    boxType: "20GP*2",
    auditState: "草拟",
    needReceipt: "是",
    receivedReceipt: "否",
    remark: "双拖作业",
    freight: 3200,
    receivable: 3520,
    entryDate: "2026-09-16",
    profit: 560,
    payable: 2960,
    carrier: "沪甬通达运输",
    returnPoint: "洋山一期空箱区",
  },
  {
    waybillNo: "WB20260916003",
    orderDate: "2026-09-15",
    customerId: "KH-1035",
    customerName: "杭州联贸进出口有限公司",
    billNo: "BL-HZ26091518",
    loadAddress: "杭州萧山仓 / 宁波梅山码头",
    dispatchNo: "PC-260916-C02",
    dispatchDate: "2026-09-16",
    boxNo1: "CMAU6502739",
    sealNo1: "S650889",
    boxNo2: "-",
    sealNo2: "-",
    boxType: "40GP",
    auditState: "草拟",
    needReceipt: "否",
    receivedReceipt: "否",
    remark: "夜间进港",
    freight: 2380,
    receivable: 2550,
    entryDate: "2026-09-16",
    profit: 350,
    payable: 2200,
    carrier: "杭甬快线车队",
    returnPoint: "梅山保税港区",
  },
  {
    waybillNo: "WB20260916004",
    orderDate: "2026-09-14",
    customerId: "KH-1086",
    customerName: "苏州新程电子科技有限公司",
    billNo: "BL-SZ26091409",
    loadAddress: "苏州工业园区 / 上海外高桥",
    dispatchNo: "PC-260916-D05",
    dispatchDate: "2026-09-18",
    boxNo1: "OOLU3087642",
    sealNo1: "S214700",
    boxNo2: "-",
    sealNo2: "-",
    boxType: "20GP",
    auditState: "草拟",
    needReceipt: "是",
    receivedReceipt: "否",
    remark: "客户指定司机",
    freight: 1850,
    receivable: 1980,
    entryDate: "2026-09-16",
    profit: 260,
    payable: 1720,
    carrier: "苏沪集运物流",
    returnPoint: "外高桥五期",
  },
];

const WAYBILL_STORAGE_KEY = "container-logistics-waybills-v1";
const seedWaybillNumbers = new Set(waybills.map((item) => item.waybillNo));
try {
  const savedWaybills = JSON.parse(localStorage.getItem(WAYBILL_STORAGE_KEY) || "[]");
  if (Array.isArray(savedWaybills)) {
    const known = new Set(seedWaybillNumbers);
    savedWaybills.forEach((item) => {
      if (!item || typeof item.waybillNo !== "string" || known.has(item.waybillNo)) return;
      known.add(item.waybillNo);
      waybills.push(item);
    });
  }
} catch (error) {
  console.warn("运单数据读取失败，使用初始数据。", error);
}

function saveWaybills() {
  try {
    localStorage.setItem(WAYBILL_STORAGE_KEY, JSON.stringify(waybills.filter((item) => !seedWaybillNumbers.has(item.waybillNo))));
  } catch (error) {
    console.warn("运单数据保存失败。", error);
  }
}

const columns = [
  "waybillNo",
  "orderDate",
  "customerId",
  "customerName",
  "billNo",
  "loadAddress",
  "dispatchNo",
  "dispatchDate",
  "boxNo1",
  "sealNo1",
  "boxNo2",
  "sealNo2",
  "boxType",
  "auditState",
  "needReceipt",
  "receivedReceipt",
  "remark",
  "freight",
  "receivable",
  "entryDate",
  "profit",
  "payable",
  "carrier",
  "returnPoint",
];

const moneyFields = new Set(["freight", "receivable", "profit", "payable"]);
const tableBody = document.querySelector("#waybillBody");
const selectAll = document.querySelector("#selectAll");
const moreBtn = document.querySelector("#moreBtn");
const moreMenu = document.querySelector("#moreMenu");
const addBtn = document.querySelector("#addBtn");
const addDialog = document.querySelector("#addDialog");
const waybillForm = document.querySelector("#waybillForm");
const waybillContainerBody = document.querySelector("#waybillContainerBody");
const receivableFeeBody = document.querySelector("#receivableFeeBody");
const payableFeeBody = document.querySelector("#payableFeeBody");
const queryForm = document.querySelector("#queryForm");
const resultText = document.querySelector("#resultText");
const pageTitle = document.querySelector("#pageTitle");
const pageKicker = document.querySelector("#pageKicker");
const pageViews = {
  waybill: document.querySelector("#waybillPage"),
  route: document.querySelector("#routePage"),
  dispatch: document.querySelector("#dispatchPage"),
  autoDispatch: document.querySelector("#autoDispatchPage"),
  customer: document.querySelector("#customerPage"),
  vehicle: document.querySelector("#vehiclePage"),
  driver: document.querySelector("#driverPage"),
};
const pageMeta = {
  home: { title: "首页", kicker: "首页待办 / 到期提醒", view: "vehicle", module: "reminders" },
  waybill: { title: "运单管理", kicker: "运输调度 / 运单台账", view: "waybill" },
  "fixed-routes": { title: "固定线路管理", kicker: "集卡业务 / 固定线路", view: "route" },
  "dispatch-list": { title: "派单列表", kicker: "集卡业务 / 派单调度", view: "dispatch" },
  "auto-dispatch": { title: "自动派单", kicker: "集卡业务 / 智能调度", view: "autoDispatch" },
  "customer-archives": { title: "客户管理", kicker: "基础资料 / 客户档案", view: "customer" },
  vehicle: {
    title: "车辆档案管理",
    kicker: "车辆管理 / 车辆档案",
    view: "vehicle",
    module: "archives",
    navPage: "vehicle-archives",
  },
  "vehicle-archives": {
    title: "车辆档案管理",
    kicker: "车辆管理 / 车辆档案",
    view: "vehicle",
    module: "archives",
  },
  "driver-archives": {
    title: "司机档案管理",
    kicker: "司机管理 / 司机档案",
    view: "driver",
  },
};

const today = new Date("2026-09-16T00:00:00");
const vehicles = [
  {
    plateNo: "浙B·K7812",
    driver: "王海 / 13800008881",
    fleet: "宁波一车队",
    fleetName: "宁波港区集卡车队",
    vehicleType: "集装箱牵引车",
    vin: "LZGCL2M43PX260188",
    engineNo: "WP13H560E68-24091",
    curbWeight: 8.6,
    ratedLoad: 31.4,
    fuelConsumption: 32.5,
    registrationCertNo: "浙B0007812",
    technicalLevel: "一级",
    technicalLevelExpiry: "2027-10-18",
    drivingLicenseNo: "浙B7812",
    drivingLicenseExpiry: "2027-10-18",
    permitNo: "浙交运管宁字330206-8891",
    operatingPermitExpiry: "2027-10-18",
    commercialInsuranceNo: "CPIC20260916002",
    commercialInsuranceExpiry: "2026-10-05",
    mandatoryInsuranceNo: "CPIC20260916001",
    mandatoryInsuranceExpiry: "2026-10-05",
    cargoInsuranceNo: "CPIC20260916003",
    cargoInsuranceExpiry: "2026-10-05",
    ownership: "自有",
    vehicleState: "在用",
    inspectionDue: "2026-10-18",
    insuranceDue: "2026-10-05",
    remark: "港区短驳主力车辆",
    attachments: "行驶证、营运证",
  },
  {
    plateNo: "沪D·A9021",
    driver: "赵亮 / 13900006662",
    fleet: "上海外协车队",
    fleetName: "临港外协集卡车队",
    vehicleType: "重型半挂牵引车",
    vin: "LZGCX2T68NX110245",
    engineNo: "MC13H540E61-11820",
    curbWeight: 9.2,
    ratedLoad: 32,
    fuelConsumption: 34.1,
    registrationCertNo: "沪D0009021",
    technicalLevel: "一级",
    technicalLevelExpiry: "2027-09-28",
    drivingLicenseNo: "沪D9021",
    drivingLicenseExpiry: "2027-09-28",
    permitNo: "沪交运管字310115-6720",
    operatingPermitExpiry: "2027-09-28",
    commercialInsuranceNo: "PICC20261112008",
    commercialInsuranceExpiry: "2026-11-12",
    mandatoryInsuranceNo: "PICC20261112009",
    mandatoryInsuranceExpiry: "2026-11-12",
    cargoInsuranceNo: "PICC20261112010",
    cargoInsuranceExpiry: "2026-11-12",
    ownership: "外协",
    vehicleState: "在用",
    inspectionDue: "2026-09-28",
    insuranceDue: "2026-11-12",
    remark: "临港外协运力",
    attachments: "行驶证",
  },
  {
    plateNo: "苏E·T5568",
    driver: "刘军 / 13700003335",
    fleet: "苏州二车队",
    fleetName: "苏州园区集卡车队",
    vehicleType: "集装箱骨架车",
    vin: "LA9941G37M0SZ1007",
    engineNo: "YC6K1346-50-92716",
    curbWeight: 7.8,
    ratedLoad: 30.5,
    fuelConsumption: 31.8,
    registrationCertNo: "苏E0005568",
    technicalLevel: "二级",
    technicalLevelExpiry: "2026-08-30",
    drivingLicenseNo: "苏E5568",
    drivingLicenseExpiry: "2026-08-30",
    permitNo: "苏交运管苏字320500-3109",
    operatingPermitExpiry: "2026-08-30",
    commercialInsuranceNo: "PAIC20260910017",
    commercialInsuranceExpiry: "2026-09-10",
    mandatoryInsuranceNo: "PAIC20260910018",
    mandatoryInsuranceExpiry: "2026-09-10",
    cargoInsuranceNo: "PAIC20260910019",
    cargoInsuranceExpiry: "2026-09-10",
    ownership: "自有",
    vehicleState: "停用",
    inspectionDue: "2026-08-30",
    insuranceDue: "2026-09-10",
    remark: "待复检，暂不排班",
    attachments: "行驶证、营运证、保单",
  },
  {
    plateNo: "浙A·F2190",
    driver: "陈涛 / 13600002228",
    fleet: "杭州危运车队",
    fleetName: "杭州危险品运输车队",
    vehicleType: "危险品牵引车",
    vin: "LZZPCLNC9PA882019",
    engineNo: "D13TCIF2-33402",
    curbWeight: 10.1,
    ratedLoad: 29.8,
    fuelConsumption: 35.6,
    registrationCertNo: "浙A0002190",
    technicalLevel: "一级",
    technicalLevelExpiry: "2027-12-20",
    drivingLicenseNo: "浙A2190",
    drivingLicenseExpiry: "2027-12-20",
    permitNo: "浙交运管杭字330109-7721",
    operatingPermitExpiry: "2027-12-20",
    commercialInsuranceNo: "PICC20260930031",
    commercialInsuranceExpiry: "2026-09-30",
    mandatoryInsuranceNo: "PICC20260930032",
    mandatoryInsuranceExpiry: "2026-09-30",
    cargoInsuranceNo: "PICC20260930033",
    cargoInsuranceExpiry: "2026-09-30",
    ownership: "外协",
    vehicleState: "在用",
    inspectionDue: "2026-12-20",
    insuranceDue: "2026-09-30",
    remark: "需随车携带危化品资质",
    attachments: "营运证、保单",
  },
];

const inspectionRecords = [
  ["浙B·K7812", "车辆年检", "2025-10-18", "2026-10-18", "宁波机动车检测中心", 680, "通过"],
  ["沪D·A9021", "营运证年审", "2025-09-28", "2026-09-28", "上海临港运输审验站", 520, "通过"],
  ["苏E·T5568", "车辆年检", "2025-08-30", "2026-08-30", "苏州园区机动车检测站", 640, "待复检"],
  ["浙A·F2190", "营运证年审", "2025-12-20", "2026-12-20", "杭州交通运输服务中心", 560, "通过"],
];

const insurancePolicies = [
  ["浙B·K7812", "交强险", "太平洋财险宁波分公司", "CPIC20260916001", 1000000, "2026-10-05", 8600, "2025-10-06 至 2026-10-05", "电子保单"],
  ["浙B·K7812", "商业险", "太平洋财险宁波分公司", "CPIC20260916002", 3000000, "2026-10-05", 12800, "2025-10-06 至 2026-10-05", "电子保单"],
  ["沪D·A9021", "承运人责任险", "中国人保上海分公司", "PICC20261112008", 2000000, "2026-11-12", 9200, "2025-11-13 至 2026-11-12", "电子保单"],
  ["苏E·T5568", "交强险", "平安财险苏州分公司", "PAIC20260910017", 1000000, "2026-09-10", 7900, "2025-09-11 至 2026-09-10", "电子保单"],
  ["浙A·F2190", "商业险", "中国人保杭州分公司", "PICC20260930031", 2500000, "2026-09-30", 11600, "2025-10-01 至 2026-09-30", "电子保单"],
];

let selectedVehicle = vehicles[0];
let vehicleCurrentPage = 1;
let vehiclePageSize = 10;
let vehicleFormMode = "create";
let editingVehiclePlate = "";
let deletingVehiclePlate = "";

const vehicleQueryForm = document.querySelector("#vehicleQueryForm");
const vehicleDialog = document.querySelector("#vehicleDialog");
const vehicleForm = document.querySelector("#vehicleForm");
const deleteVehicleDialog = document.querySelector("#deleteVehicleDialog");
const vehiclePageSizeSelect = document.querySelector("#vehiclePageSize");
const vehiclePageJump = document.querySelector("#vehiclePageJump");
const vehiclePrevPage = document.querySelector("#vehiclePrevPage");
const vehicleNextPage = document.querySelector("#vehicleNextPage");
const vehicleCurrentPageButton = document.querySelector("#vehicleCurrentPage");

const drivers = [
  {
    id: "SJ-1001", name: "王海", gender: "男", idCard: "330206198805182418", phone: "13800008881",
    address: "宁波市北仑区新碶街道", emergencyContact: "王静", emergencyPhone: "13700001126",
    entryDate: "2021-03-15", driverType: "自有司机", driverState: "运输中", certificationStatus: "verified", fleet: "宁波一队",
    licenseNo: "330206198805182418", licenseClass: "A2", licenseIssueDate: "2014-05-18", licenseExpiry: "2027-05-18",
    licenseAttachment: "驾驶证扫描件", qualificationNo: "330206002891", qualificationExpiry: "2026-10-08",
    qualificationAttachment: "从业资格证照片", bankCard: "6222020200008812", bankName: "中国工商银行宁波北仑支行", remark: "",
  },
  {
    id: "SJ-1002", name: "赵亮", gender: "男", idCard: "310115198912093617", phone: "13900006662",
    address: "上海市浦东新区临港大道", emergencyContact: "赵敏", emergencyPhone: "13600007832",
    entryDate: "2022-07-08", driverType: "自有司机", driverState: "运输中", certificationStatus: "verified", fleet: "临港车队",
    licenseNo: "310115198912093617", licenseClass: "A2", licenseIssueDate: "2015-09-28", licenseExpiry: "2026-09-28",
    licenseAttachment: "驾驶证扫描件", qualificationNo: "310115006720", qualificationExpiry: "2026-12-18",
    qualificationAttachment: "从业资格证照片", bankCard: "6217001200006635", bankName: "中国建设银行上海临港支行", remark: "",
  },
  {
    id: "SJ-1003", name: "刘军", gender: "男", idCard: "320500198706263011", phone: "13700003335",
    address: "苏州市工业园区星湖街", emergencyContact: "刘芳", emergencyPhone: "13500009218",
    entryDate: "2020-11-20", driverType: "自有司机", driverState: "停用", certificationStatus: "pending", fleet: "苏州二队",
    licenseNo: "320500198706263011", licenseClass: "A2", licenseIssueDate: "2012-08-30", licenseExpiry: "2026-08-30",
    licenseAttachment: "驾驶证扫描件", qualificationNo: "320500003109", qualificationExpiry: "2026-09-10",
    qualificationAttachment: "从业资格证照片", bankCard: "6228480400003351", bankName: "中国农业银行苏州园区支行", remark: "证件续办中",
  },
  {
    id: "SJ-1004", name: "陈涛", gender: "男", idCard: "330109199003154812", phone: "13600002228",
    address: "杭州市萧山区市心南路", emergencyContact: "陈晓", emergencyPhone: "13800004116",
    entryDate: "2023-02-06", driverType: "自有司机", driverState: "空闲", certificationStatus: "verified", fleet: "杭州车队",
    licenseNo: "330109199003154812", licenseClass: "A2", licenseIssueDate: "2016-03-15", licenseExpiry: "2028-03-15",
    licenseAttachment: "驾驶证扫描件", qualificationNo: "330109007721", qualificationExpiry: "2027-12-20",
    qualificationAttachment: "从业资格证照片", bankCard: "6212261200002289", bankName: "中国工商银行杭州萧山支行", remark: "",
  },
  {
    id: "SJ-1005", name: "周凯", gender: "男", idCard: "330205199511083219", phone: "13500007719",
    address: "宁波市江北区洪塘街道", emergencyContact: "周梅", emergencyPhone: "13700005231",
    entryDate: "2026-10-08", driverType: "自有司机", driverState: "停用", certificationStatus: "unverified", fleet: "宁波二队",
    licenseNo: "330205199511083219", licenseClass: "A2", licenseIssueDate: "2019-11-08", licenseExpiry: "2029-11-08",
    licenseAttachment: "驾驶证扫描件", qualificationNo: "330205008519", qualificationExpiry: "2028-06-30",
    qualificationAttachment: "从业资格证照片", bankCard: "", bankName: "", remark: "入职资料待复核",
  },
];

function enabledOwnDrivers() {
  return drivers.filter((driver) => driver.driverType === "自有司机" && driver.driverState !== "停用");
}

function availableOwnDrivers() {
  return enabledOwnDrivers().filter((driver) =>
    driver.driverState === "空闲" &&
    driver.certificationStatus === "verified" &&
    daysUntil(driver.licenseExpiry) >= 0 &&
    daysUntil(driver.qualificationExpiry) >= 0
  );
}

const DRIVER_CERTIFICATION_STORAGE_KEY = "container-logistics-driver-certifications-v1";
const DEMO_CERTIFICATION_MIGRATIONS = {
  "SJ-1002": { from: "unverified", to: "verified" },
  "SJ-1004": { from: "rejected", to: "verified", legacyReason: "身份证背面照片模糊，请重新上传" },
};

function loadDriverCertifications() {
  let stored = {};
  try {
    stored = JSON.parse(localStorage.getItem(DRIVER_CERTIFICATION_STORAGE_KEY) || "{}");
  } catch {
    stored = {};
  }
  Object.entries(DEMO_CERTIFICATION_MIGRATIONS).forEach(([driverId, migration]) => {
    const record = stored[driverId];
    if (!record || record.status !== migration.from || (migration.legacyReason && record.reason !== migration.legacyReason)) return;
    stored[driverId] = {
      ...record,
      status: migration.to,
      submittedAt: record.submittedAt || "2026-08-12 09:20",
      reviewedAt: "2026-08-12 11:05",
      reason: "",
    };
  });
  drivers.forEach((driver) => {
    const record = stored[driver.id];
    if (record) {
      driver.certificationStatus = record.status || "unverified";
      driver.certificationSubmittedAt = record.submittedAt || "";
      driver.certificationReviewedAt = record.reviewedAt || "";
      driver.certificationReason = record.reason || "";
      driver.certificationFiles = record;
    } else {
      const hasSubmitted = driver.certificationStatus !== "unverified";
      stored[driver.id] = {
        status: driver.certificationStatus || "unverified",
        submittedAt: hasSubmitted ? (driver.certificationStatus === "pending" ? "2026-09-20 15:36" : "2026-08-12 09:20") : "",
        reviewedAt: ["verified", "rejected"].includes(driver.certificationStatus) ? "2026-08-12 11:05" : "",
        reason: driver.certificationReason || "",
        idCardFront: hasSubmitted ? "身份证人像面.jpg" : "",
        idCardBack: hasSubmitted ? "身份证国徽面.jpg" : "",
        licenseAttachment: hasSubmitted ? driver.licenseAttachment : "",
        qualificationAttachment: hasSubmitted ? driver.qualificationAttachment : "",
      };
    }
    driver.certificationFiles = stored[driver.id];
    driver.certificationSubmittedAt = stored[driver.id].submittedAt || "";
    driver.certificationReviewedAt = stored[driver.id].reviewedAt || "";
  });
  localStorage.setItem(DRIVER_CERTIFICATION_STORAGE_KEY, JSON.stringify(stored));
}

function saveDriverCertification(driver) {
  let stored = {};
  try {
    stored = JSON.parse(localStorage.getItem(DRIVER_CERTIFICATION_STORAGE_KEY) || "{}");
  } catch {
    stored = {};
  }
  stored[driver.id] = {
    ...(stored[driver.id] || {}),
    status: driver.certificationStatus,
    submittedAt: driver.certificationSubmittedAt || stored[driver.id]?.submittedAt || "",
    reviewedAt: driver.certificationReviewedAt || "",
    reason: driver.certificationReason || "",
  };
  localStorage.setItem(DRIVER_CERTIFICATION_STORAGE_KEY, JSON.stringify(stored));
}

loadDriverCertifications();

let driverCurrentPage = 1;
let driverPageSize = 10;
let driverFormMode = "create";
let editingDriverId = "";
let deletingDriverId = "";
let selectedDriverDetail = null;
const selectedDriverIds = new Set();
let renderedDriverIds = [];

const driverQueryForm = document.querySelector("#driverQueryForm");
const driverBody = document.querySelector("#driverBody");
const driverDialog = document.querySelector("#driverDialog");
const driverForm = document.querySelector("#driverForm");
const deleteDriverDialog = document.querySelector("#deleteDriverDialog");
const driverSelectAll = document.querySelector("#driverSelectAll");
const driverPageSizeSelect = document.querySelector("#driverPageSize");
const driverPageJump = document.querySelector("#driverPageJump");
const driverPrevPage = document.querySelector("#driverPrevPage");
const driverNextPage = document.querySelector("#driverNextPage");
const driverCurrentPageButton = document.querySelector("#driverCurrentPage");
const driverMoreBtn = document.querySelector("#driverMoreBtn");
const driverMoreMenu = document.querySelector("#driverMoreMenu");
const driverDetailPanel = document.querySelector("#driverDetailPanel");
const driverCertificationDialog = document.querySelector("#driverCertificationDialog");
const certificationReviewContent = document.querySelector("#certificationReviewContent");
const certificationReviewNote = document.querySelector("#certificationReviewNote");
let reviewingDriverId = "";

const fixedRoutes = [
  { id: "XL-001", routeCode: "XL-NB-001", routeName: "北仑港至江北仓", origin: "宁波北仑港区二期", destination: "宁波江北物流园", viaPoints: "北仑收费站", routeState: "启用", estimatedRevenue: 2860, baseFreight: 2600, commissionType: "fixed", commissionValue: 420, commissionRemark: "含港区等待补贴", defaultVehicle: "浙B·K7812", defaultDriver: "王海", remark: "日常进口柜线路" },
  { id: "XL-002", routeCode: "XL-SH-002", routeName: "洋山港至昆山保税区", origin: "上海洋山港", destination: "昆山综合保税区", viaPoints: "东海大桥、沪昆高速", routeState: "启用", estimatedRevenue: 3520, baseFreight: 3200, commissionType: "rate", commissionValue: 16, commissionRemark: "按预估收入 16% 计提", defaultVehicle: "沪D·A9021", defaultDriver: "赵亮", remark: "双拖需单独核价" },
  { id: "XL-003", routeCode: "XL-HZ-003", routeName: "萧山仓至梅山码头", origin: "杭州萧山仓", destination: "宁波梅山码头", viaPoints: "杭甬高速", routeState: "启用", estimatedRevenue: 2550, baseFreight: 2380, commissionType: "fixed", commissionValue: 350, commissionRemark: "夜间进港另补 80 元", defaultVehicle: "浙A·F2190", defaultDriver: "陈涛", remark: "出口柜线路" },
  { id: "XL-004", routeCode: "XL-SZ-004", routeName: "苏州园区至外高桥", origin: "苏州工业园区", destination: "上海外高桥五期", viaPoints: "京沪高速", routeState: "停用", estimatedRevenue: 1980, baseFreight: 1850, commissionType: "rate", commissionValue: 15, commissionRemark: "按实际确认收入核算", defaultVehicle: "苏E·T5568", defaultDriver: "刘军", remark: "暂停售价维护" },
];

const dispatchSeed = [
  { id: "PD-1001", waybillNo: "WB20260916001", orderDate: "2026-09-16", routeId: "XL-001", routeName: "北仑港至江北仓", origin: "宁波北仑港区二期", destination: "宁波江北物流园", dispatchTime: "2026-09-16 08:35", driverId: "SJ-1001", driverName: "王海", phone: "13800008881", vehicleId: "浙B·K7812", status: "运输中", currentNode: "在途", boxes: "TCLU8374621 / 40HQ", estimatedRevenue: 2860, commission: 420, note: "上午装柜", pushed: true, timeline: [{ node: "已派单", time: "2026-09-16 08:35", desc: "派单已推送至司机微信小程序", photos: [] }, { node: "已提货", time: "2026-09-16 10:12", desc: "司机已完成提货，上传装柜现场照片", photos: ["装柜现场-001.jpg"] }, { node: "在途", time: "2026-09-16 11:05", desc: "车辆驶离装货地，运输中", photos: ["运输途中-001.jpg"] }] },
  { id: "PD-1002", waybillNo: "WB20260916002", orderDate: "2026-09-16", routeId: "XL-002", routeName: "洋山港至昆山保税区", origin: "上海洋山港", destination: "昆山综合保税区", dispatchTime: "2026-09-16 09:10", driverId: "SJ-1002", driverName: "赵亮", phone: "13900006662", vehicleId: "沪D·A9021", status: "已派单", currentNode: "待提货", boxes: "MSKU4920183 / MSKU4920184", estimatedRevenue: 3520, commission: 563.2, note: "双拖作业，按现场指引进港", pushed: true, timeline: [{ node: "已派单", time: "2026-09-16 09:10", desc: "派单已推送至司机微信小程序", photos: [] }] },
  { id: "PD-1003", waybillNo: "WB20260916003", orderDate: "2026-09-15", routeId: "XL-003", routeName: "萧山仓至梅山码头", origin: "杭州萧山仓", destination: "宁波梅山码头", dispatchTime: "2026-09-15 16:40", driverId: "SJ-1004", driverName: "陈涛", phone: "13600002228", vehicleId: "浙A·F2190", status: "已完成", currentNode: "已送达", boxes: "CMAU6502739 / 40GP", estimatedRevenue: 2550, commission: 350, note: "夜间进港", pushed: true, timeline: [{ node: "已派单", time: "2026-09-15 16:40", desc: "派单已推送至司机微信小程序", photos: [] }, { node: "已提货", time: "2026-09-15 18:22", desc: "完成提货", photos: ["提货现场-003.jpg"] }, { node: "已送达", time: "2026-09-16 06:55", desc: "货柜已送达梅山码头", photos: ["送达凭证-003.jpg"] }] },
  { id: "PD-1004", waybillNo: "WB20260916004", orderDate: "2026-09-14", routeId: "XL-004", routeName: "苏州园区至外高桥", origin: "苏州工业园区", destination: "上海外高桥五期", dispatchTime: "2026-09-14 14:20", driverId: "SJ-1003", driverName: "刘军", phone: "13700003335", vehicleId: "苏E·T5568", status: "取消", currentNode: "待派单", boxes: "OOLU3087642 / 20GP", estimatedRevenue: 1980, commission: 297, note: "线路价格调整，原派单取消", pushed: true, timeline: [{ node: "已派单", time: "2026-09-14 14:20", desc: "派单已推送至司机微信小程序", photos: [] }, { node: "取消", time: "2026-09-14 15:05", desc: "未开始提货，后台撤销派单", photos: [] }] },
  { id: "PD-1005", waybillNo: "WB20260916005", orderDate: "2026-09-16", routeId: "XL-001", routeName: "北仑港至江北仓", origin: "宁波北仑港区二期", destination: "宁波江北物流园", dispatchTime: "", driverId: "", driverName: "待分配", phone: "-", vehicleId: "", status: "待派单", currentNode: "待派单", boxes: "待装箱", estimatedRevenue: 2860, commission: 420, note: "等待调度", pushed: false, timeline: [] },
];
const dispatches = window.DispatchStore.load(dispatchSeed);

const ACTIVE_DRIVER_DISPATCH_STATES = new Set(["已派单", "运输中"]);
const LEGACY_DISABLED_DRIVER_STATES = new Set(["离职", "待入职", "停岗"]);

function driverHasActiveDispatch(driverId) {
  return Boolean(driverId) && dispatches.some((dispatch) =>
    dispatch.driverId === driverId && ACTIVE_DRIVER_DISPATCH_STATES.has(dispatch.status)
  );
}

function syncDriverOperationalStates() {
  drivers.forEach((driver) => {
    if (LEGACY_DISABLED_DRIVER_STATES.has(driver.driverState)) {
      driver.driverState = "停用";
      return;
    }
    if (driver.certificationStatus !== "verified") {
      driver.driverState = "停用";
      return;
    }
    if (driver.driverState === "停用") return;
    if (driverHasActiveDispatch(driver.id)) {
      driver.driverState = "运输中";
      return;
    }
    if (driver.driverState === "在职" || driver.driverState === "运输中" || !["空闲", "停用"].includes(driver.driverState)) {
      driver.driverState = "空闲";
    }
  });
}

syncDriverOperationalStates();

function saveDispatches() {
  window.DispatchStore.save(dispatches);
}

function getWaybillContainers(waybill) {
  if (Array.isArray(waybill.containers) && waybill.containers.length) return waybill.containers;
  const boxType = String(waybill.boxType || "40HQ").replace(/\*\d+$/, "");
  return [
    { boxNo: waybill.boxNo1, sealNo: waybill.sealNo1, boxType, pickupPoint: waybill.pickupPoint1, returnPoint: waybill.returnPoint },
    { boxNo: waybill.boxNo2, sealNo: waybill.sealNo2, boxType, pickupPoint: waybill.pickupPoint2, returnPoint: waybill.returnPoint },
  ].filter((item, index) => index === 0 || (item.boxNo && item.boxNo !== "-"));
}

function formatWaybillBoxes(waybill) {
  return getWaybillContainers(waybill).map((container) => [
    container.boxNo && container.boxNo !== "-" ? container.boxNo : "待装箱",
    container.sealNo && container.sealNo !== "-" ? `封号 ${container.sealNo}` : "",
    container.boxType || "-",
  ].filter(Boolean).join(" / ")).join("；");
}

function createPendingDispatch(waybill, route) {
  const dispatch = {
    id: `PD-${Date.now()}-${waybill.waybillNo}`,
    dispatchMode: "pending",
    waybillNo: waybill.waybillNo,
    orderDate: waybill.orderDate,
    routeId: route?.id || "",
    routeName: route?.routeName || "未指定线路",
    origin: route?.origin || waybill.loadAddress,
    destination: route?.destination || "-",
    loadAddress: waybill.loadAddress,
    dispatchTime: "",
    driverId: "",
    driverName: "待分配",
    phone: "-",
    vehicleId: "",
    status: "待派单",
    currentNode: "待派单",
    boxes: formatWaybillBoxes(waybill),
    estimatedRevenue: route ? Number(route.estimatedRevenue) || 0 : waybill.receivable,
    commission: route ? calculateRouteCommission(route) : 0,
    note: "",
    pushed: false,
    timeline: [],
  };
  dispatches.unshift(dispatch);
  saveDispatches();
  return dispatch;
}

let routeCurrentPage = 1;
let routePageSize = 10;
let routeFormMode = "create";
let editingRouteId = "";
let deletingRouteId = "";
const selectedRouteIds = new Set();
let renderedRouteIds = [];

const routeQueryForm = document.querySelector("#routeQueryForm");
const routeBody = document.querySelector("#routeBody");
const routeDialog = document.querySelector("#routeDialog");
const routeForm = document.querySelector("#routeForm");
const deleteRouteDialog = document.querySelector("#deleteRouteDialog");
const routeSelectAll = document.querySelector("#routeSelectAll");
const routePageSizeSelect = document.querySelector("#routePageSize");
const routePageJump = document.querySelector("#routePageJump");
const routePrevPage = document.querySelector("#routePrevPage");
const routeNextPage = document.querySelector("#routeNextPage");
const routeCurrentPageButton = document.querySelector("#routeCurrentPage");
const routeMoreBtn = document.querySelector("#routeMoreBtn");
const routeMoreMenu = document.querySelector("#routeMoreMenu");

let dispatchCurrentPage = 1;
let dispatchPageSize = 10;
let deletingDispatchId = "";
const selectedDispatchIds = new Set();
let renderedDispatchIds = [];
const dispatchQueryForm = document.querySelector("#dispatchQueryForm");
const dispatchBody = document.querySelector("#dispatchBody");
const dispatchDialog = document.querySelector("#dispatchDialog");
const dispatchForm = document.querySelector("#dispatchForm");
const dispatchDetailDialog = document.querySelector("#dispatchDetailDialog");
const revokeDispatchDialog = document.querySelector("#revokeDispatchDialog");
const dispatchSelectAll = document.querySelector("#dispatchSelectAll");
const dispatchPageSizeSelect = document.querySelector("#dispatchPageSize");
const dispatchPageJump = document.querySelector("#dispatchPageJump");
const dispatchPrevPage = document.querySelector("#dispatchPrevPage");
const dispatchNextPage = document.querySelector("#dispatchNextPage");
const dispatchCurrentPageButton = document.querySelector("#dispatchCurrentPage");
const dispatchMoreBtn = document.querySelector("#dispatchMoreBtn");
const dispatchMoreMenu = document.querySelector("#dispatchMoreMenu");

function formatMoney(value) {
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: "CNY",
    maximumFractionDigits: 0,
  }).format(value);
}

function renderRows(rows) {
  tableBody.innerHTML = rows
    .map((row, index) => {
      const cells = columns
        .map((key) => {
          if (key === "auditState") {
            return `<td><span class="state-pill">${row[key]}</span></td>`;
          }
          if (moneyFields.has(key)) {
            return `<td class="money">${formatMoney(row[key])}</td>`;
          }
          return `<td>${row[key]}</td>`;
        })
        .join("");

      return `
        <tr>
          <td>
            <label class="checkbox-label">
              <input class="row-check" type="checkbox" ${index < 3 ? "checked" : ""} />
              可调度
            </label>
          </td>
          ${cells}
        </tr>
      `;
    })
    .join("");
}

function normalize(value) {
  return String(value || "").trim().toLowerCase();
}

function daysUntil(dateText) {
  const target = new Date(`${dateText}T00:00:00`);
  return Math.ceil((target - today) / 86400000);
}

function getDueInfo(vehicle, warningDays = 30) {
  const insuranceDates = [
    vehicle.insuranceDue,
    vehicle.commercialInsuranceExpiry,
    vehicle.mandatoryInsuranceExpiry,
    vehicle.cargoInsuranceExpiry,
  ].filter(Boolean);
  const inspectionDates = [
    vehicle.inspectionDue,
    vehicle.operatingPermitExpiry,
    vehicle.technicalLevelExpiry,
    vehicle.drivingLicenseExpiry,
  ].filter(Boolean);
  const insuranceDays = insuranceDates.length ? Math.min(...insuranceDates.map(daysUntil)) : Infinity;
  const inspectionDays = inspectionDates.length ? Math.min(...inspectionDates.map(daysUntil)) : Infinity;

  if (insuranceDays < 0 || inspectionDays < 0) {
    return { key: "expired", label: "已过期", rowClass: "expired-row" };
  }
  if (insuranceDays <= warningDays) {
    return { key: "insurance", label: "保险即将到期", rowClass: "warning-row" };
  }
  if (inspectionDays <= warningDays) {
    return { key: "inspection", label: "审验即将到期", rowClass: "warning-row" };
  }
  return { key: "normal", label: "正常", rowClass: "" };
}

function getVehicleStateClass(state) {
  if (state === "在用") return "active-state";
  if (state === "停用") return "stop-state";
  if (state === "维修中") return "maintenance-state";
  return "stop-state";
}

function filterRows(formData) {
  const status = formData.get("receiptStatus");
  return waybills.filter((item) => {
    const matchedWaybill = normalize(item.waybillNo).includes(normalize(formData.get("waybillNo")));
    const matchedCustomer = normalize(item.customerName).includes(normalize(formData.get("customerName")));
    const matchedAddress = normalize(item.loadAddress).includes(normalize(formData.get("loadAddress")));
    const matchedDispatch = normalize(item.dispatchNo).includes(normalize(formData.get("dispatchNo")));
    const matchedDate = !formData.get("orderDate") || item.orderDate === formData.get("orderDate");
    const matchedDestination =
      !formData.get("destination") || normalize(item.loadAddress).includes(normalize(formData.get("destination")));
    const matchedReceipt =
      status === "全部" || (status === "已回单" ? item.receivedReceipt === "是" : item.receivedReceipt === "否");

    return (
      matchedWaybill &&
      matchedCustomer &&
      matchedAddress &&
      matchedDispatch &&
      matchedDate &&
      matchedDestination &&
      matchedReceipt
    );
  });
}

function filterVehicles(formData) {
  const plateNo = normalize(formData.get("plateNo"));
  const vehicleState = formData.get("vehicleState");
  return vehicles.filter((item) => {
    const matchedPlate = normalize(item.plateNo).includes(plateNo);
    const matchedState = !vehicleState || item.vehicleState === vehicleState;
    return matchedPlate && matchedState;
  });
}

function getWarningDays() {
  const form = document.querySelector("#vehicleQueryForm");
  const value = Number(new FormData(form).get("warningDays"));
  return Number.isFinite(value) && value > 0 ? value : 30;
}

function renderVehicleRows(rows, warningDays = 30) {
  const vehicleBody = document.querySelector("#vehicleBody");
  if (!rows.length) {
    vehicleBody.innerHTML = '<tr><td class="no-data-cell" colspan="13">暂无符合条件的车辆档案</td></tr>';
    return;
  }

  vehicleBody.innerHTML = rows
    .map((vehicle) => {
      const dueInfo = getDueInfo(vehicle, warningDays);
      return `
        <tr class="${dueInfo.rowClass}">
          <td>${vehicle.plateNo}</td>
          <td>${vehicle.vehicleType}</td>
          <td>${vehicle.vin}</td>
          <td>${vehicle.engineNo}</td>
          <td>${vehicle.permitNo}</td>
          <td>${vehicle.ownership}</td>
          <td>${vehicle.driver}</td>
          <td><span class="state-pill ${getVehicleStateClass(vehicle.vehicleState)}">${vehicle.vehicleState}</span></td>
          <td>${vehicle.inspectionDue}</td>
          <td>${vehicle.insuranceDue}</td>
          <td><span class="due-pill ${dueInfo.key}">${dueInfo.label}</span></td>
          <td>${vehicle.attachments}</td>
          <td class="fixed-action-column">
            <div class="vehicle-action-group">
              <button class="link-btn" data-detail-plate="${vehicle.plateNo}" type="button">详情</button>
              <button class="link-btn" data-edit-plate="${vehicle.plateNo}" type="button">编辑</button>
              <button class="link-btn delete-btn" data-delete-plate="${vehicle.plateNo}" type="button">删除</button>
            </div>
          </td>
        </tr>
      `;
    })
    .join("");
}

function renderReminderCards(warningDays = 30) {
  const counts = vehicles.reduce(
    (summary, vehicle) => {
      const key = getDueInfo(vehicle, warningDays).key;
      summary[key] += 1;
      return summary;
    },
    { expired: 0, insurance: 0, inspection: 0, normal: 0 }
  );

  document.querySelector("#vehicleReminderCards").innerHTML = `
    <div class="reminder-card expired">
      <strong>已过期</strong>
      <span>${counts.expired}</span>
      <small>审验或保险已逾期</small>
    </div>
    <div class="reminder-card insurance">
      <strong>保险即将到期</strong>
      <span>${counts.insurance}</span>
      <small>${warningDays} 天内保险到期</small>
    </div>
    <div class="reminder-card inspection">
      <strong>审验即将到期</strong>
      <span>${counts.inspection}</span>
      <small>${warningDays} 天内审验到期</small>
    </div>
    <div class="reminder-card">
      <strong>正常车辆</strong>
      <span>${counts.normal}</span>
      <small>暂无临期事项</small>
    </div>
  `;
}

function renderVehicleDetailBase(vehicle) {
  if (!vehicle) {
    document.querySelector("#vehicleDetailBase").innerHTML = "";
    return;
  }

  const detailGroups = [
    {
      title: "基础资料",
      description: "车辆归属与当前使用信息",
      items: [
        ["车牌号码", vehicle.plateNo],
        ["驾驶员", vehicle.driver],
        ["所属车队", vehicle.fleet],
        ["车队名称", vehicle.fleetName],
        ["车辆所属", vehicle.ownership],
        ["车辆状态", vehicle.vehicleState],
      ],
    },
    {
      title: "车辆参数",
      description: "车型、识别信息与运输参数",
      items: [
        ["车辆类型", vehicle.vehicleType],
        ["车架号", vehicle.vin],
        ["发动机号", vehicle.engineNo],
        ["整备质量（吨）", vehicle.curbWeight],
        ["百公里油耗（升）", vehicle.fuelConsumption],
        ["核定载质量（吨）", vehicle.ratedLoad],
      ],
    },
    {
      title: "证照信息",
      description: "登记、技术等级和营运证照",
      items: [
        ["车辆登记证号", vehicle.registrationCertNo],
        ["车辆技术等级", vehicle.technicalLevel],
        ["车辆技术等级有效期", vehicle.technicalLevelExpiry],
        ["行驶证号", vehicle.drivingLicenseNo],
        ["行驶证有效期", vehicle.drivingLicenseExpiry],
        ["营运证号", vehicle.permitNo],
        ["营运证有效期", vehicle.operatingPermitExpiry],
        ["审验到期", vehicle.inspectionDue],
      ],
    },
    {
      title: "保险与附件",
      description: "车辆保单、到期日期与电子资料",
      items: [
        ["商业险单号", vehicle.commercialInsuranceNo],
        ["商业险有效期", vehicle.commercialInsuranceExpiry],
        ["强制险单号", vehicle.mandatoryInsuranceNo],
        ["强制险有效期", vehicle.mandatoryInsuranceExpiry],
        ["货物险单号", vehicle.cargoInsuranceNo],
        ["货物险有效期", vehicle.cargoInsuranceExpiry],
        ["保险到期", vehicle.insuranceDue],
        ["备注", vehicle.remark],
        ["附件资料", vehicle.attachments],
      ],
    },
  ];

  document.querySelector("#detailVehicleTitle").textContent = vehicle.plateNo;
  document.querySelector("#detailVehicleMeta").textContent = `${vehicle.vehicleType} / ${vehicle.ownership}`;
  const detailVehicleState = document.querySelector("#detailVehicleState");
  detailVehicleState.textContent = vehicle.vehicleState;
  detailVehicleState.className = `state-pill ${getVehicleStateClass(vehicle.vehicleState)}`;
  document.querySelector("#detailVehicleDriver").textContent = vehicle.driver || "—";
  document.querySelector("#detailVehicleFleet").textContent = vehicle.fleetName || vehicle.fleet || "—";
  document.querySelector("#detailVehicleInspectionDue").textContent = vehicle.inspectionDue || "—";
  document.querySelector("#detailVehicleInsuranceDue").textContent = vehicle.insuranceDue || "—";
  document.querySelector("#vehicleDetailBase").innerHTML = detailGroups
    .map(
      (group) => `
        <section class="vehicle-info-section" aria-label="${group.title}">
          <header>
            <div>
              <strong>${group.title}</strong>
              <span>${group.description}</span>
            </div>
            <small>${group.items.length} 项</small>
          </header>
          <dl class="vehicle-info-list">
            ${group.items
              .map(
                ([label, value]) => `
                  <div class="detail-item">
                    <dt>${label}</dt>
                    <dd>${value || "—"}</dd>
                  </div>
                `
              )
              .join("")}
          </dl>
        </section>
      `
    )
    .join("");

  const inspectionRecord = inspectionRecords.find((record) => record[0] === vehicle.plateNo);
  const inspectionInputs = document.querySelectorAll("#inspectionModule .form-grid input");
  const inspectionSelects = document.querySelectorAll("#inspectionModule .form-grid select");
  if (inspectionRecord && inspectionInputs.length) {
    inspectionInputs[0].value = inspectionRecord[0];
    inspectionInputs[1].value = inspectionRecord[2];
    inspectionInputs[2].value = inspectionRecord[3];
    inspectionInputs[3].value = inspectionRecord[4];
    inspectionInputs[4].value = inspectionRecord[5];
    inspectionSelects[0].value = inspectionRecord[1];
    inspectionSelects[1].value = inspectionRecord[6];
  }

  const insurancePolicy = insurancePolicies.find((policy) => policy[0] === vehicle.plateNo);
  const insuranceInputs = document.querySelectorAll("#insuranceModule .form-grid input");
  const insuranceSelect = document.querySelector("#insuranceModule .form-grid select");
  if (insurancePolicy && insuranceInputs.length) {
    insuranceInputs[0].value = insurancePolicy[0];
    insuranceInputs[1].value = insurancePolicy[2];
    insuranceInputs[2].value = insurancePolicy[3];
    insuranceInputs[3].value = insurancePolicy[4];
    insuranceInputs[4].value = insurancePolicy[5];
    insuranceInputs[5].value = insurancePolicy[6];
    insuranceInputs[6].value = insurancePolicy[7];
    insuranceSelect.value = insurancePolicy[1];
  }
}

function renderInspectionRows(plateNo = selectedVehicle?.plateNo || "") {
  const records = inspectionRecords.filter((record) => !plateNo || record[0] === plateNo);
  document.querySelector("#inspectionBody").innerHTML = records
    .map(
      (record) => `
        <tr>
          <td>${record[0]}</td>
          <td>${record[1]}</td>
          <td>${record[2]}</td>
          <td>${record[3]}</td>
          <td>${record[4]}</td>
          <td class="money">${formatMoney(record[5])}</td>
          <td>${record[6]}</td>
        </tr>
      `
    )
    .join("");
}

function renderInsuranceRows(plateNo = selectedVehicle?.plateNo || "") {
  const policies = insurancePolicies.filter((policy) => !plateNo || policy[0] === plateNo);
  document.querySelector("#insuranceBody").innerHTML = policies
    .map(
      (policy) => `
        <tr>
          <td>${policy[0]}</td>
          <td>${policy[1]}</td>
          <td>${policy[2]}</td>
          <td>${policy[3]}</td>
          <td class="money">${formatMoney(policy[4])}</td>
          <td>${policy[5]}</td>
          <td class="money">${formatMoney(policy[6])}</td>
          <td>${policy[7]}</td>
          <td>${policy[8]}</td>
        </tr>
      `
    )
    .join("");
}

function renderReminderRows(warningDays = 30, plateNo = selectedVehicle?.plateNo || "") {
  const source = plateNo ? vehicles.filter((vehicle) => vehicle.plateNo === plateNo) : vehicles;
  const rows = source
    .map((vehicle) => ({ vehicle, dueInfo: getDueInfo(vehicle, warningDays) }))
    .filter((item) => item.dueInfo.key !== "normal");

  document.querySelector("#reminderBody").innerHTML = rows
    .map(({ vehicle, dueInfo }) => {
      const suggestion =
        dueInfo.key === "expired"
          ? "立即补办审验或续保，暂停高风险派车"
          : dueInfo.key === "insurance"
            ? "联系保险公司续保并上传新保单"
            : "预约审验机构，登记下次到期日期";
      return `
        <tr class="${dueInfo.rowClass}">
          <td>${vehicle.plateNo}</td>
          <td>${vehicle.driver}</td>
          <td>${vehicle.insuranceDue}（${daysUntil(vehicle.insuranceDue)} 天）</td>
          <td>${vehicle.inspectionDue}（${daysUntil(vehicle.inspectionDue)} 天）</td>
          <td><span class="due-pill ${dueInfo.key}">${dueInfo.label}</span></td>
          <td>${suggestion}</td>
        </tr>
      `;
    })
    .join("");

  document.querySelector("#reminderText").textContent = `根据审验到期日、保险到期日提前 ${warningDays} 天预警`;
}

function getFilteredVehicles() {
  return filterVehicles(new FormData(vehicleQueryForm));
}

function renderVehiclePagination(total) {
  const totalPages = Math.max(1, Math.ceil(total / vehiclePageSize));
  vehicleCurrentPage = Math.min(Math.max(1, vehicleCurrentPage), totalPages);
  vehicleCurrentPageButton.textContent = vehicleCurrentPage;
  vehiclePrevPage.disabled = vehicleCurrentPage <= 1;
  vehicleNextPage.disabled = vehicleCurrentPage >= totalPages;
  vehiclePageJump.max = totalPages;
  vehiclePageJump.value = vehicleCurrentPage;
}

function renderVehiclePage(rows = vehicles, warningDays = 30) {
  vehiclePageSize = Number(vehiclePageSizeSelect.value) || 10;
  renderVehiclePagination(rows.length);
  const start = (vehicleCurrentPage - 1) * vehiclePageSize;
  const pageRows = rows.slice(start, start + vehiclePageSize);

  renderReminderCards(warningDays);
  renderVehicleRows(pageRows, warningDays);
  renderVehicleDetailBase(selectedVehicle);
  renderInspectionRows(selectedVehicle?.plateNo || "");
  renderInsuranceRows(selectedVehicle?.plateNo || "");
  renderReminderRows(warningDays, selectedVehicle?.plateNo || "");
  document.querySelector("#vehicleResultText").textContent = `共 ${rows.length} 条车辆档案，当前第 ${vehicleCurrentPage} / ${Math.max(1, Math.ceil(rows.length / vehiclePageSize))} 页`;
}

function openVehicleForm(mode, plateNo = "") {
  closeVehicleDetail();
  vehicleFormMode = mode;
  editingVehiclePlate = plateNo;
  vehicleForm.reset();

  const vehicle = vehicles.find((item) => item.plateNo === plateNo);
  document.querySelector("#vehicleFormTitle").textContent = mode === "edit" ? "编辑车辆档案" : "新增车辆档案";
  vehicleForm.dataset.attachments = vehicle?.attachments || "";
  const drivingLicenseAttachment = vehicle?.drivingLicenseAttachment || (vehicle?.attachments?.includes("行驶证") ? "行驶证扫描件" : "");
  const operatingPermitAttachment = vehicle?.operatingPermitAttachment || (vehicle?.attachments?.includes("营运证") ? "营运证照片" : "");
  window.AttachmentPicker?.setExisting(vehicleForm.elements.drivingLicense, drivingLicenseAttachment);
  window.AttachmentPicker?.setExisting(vehicleForm.elements.operatingPermit, operatingPermitAttachment);

  if (vehicle) {
    [
      "plateNo",
      "driver",
      "fleet",
      "fleetName",
      "engineNo",
      "curbWeight",
      "fuelConsumption",
      "ratedLoad",
      "registrationCertNo",
      "vehicleType",
      "technicalLevel",
      "technicalLevelExpiry",
      "drivingLicenseNo",
      "drivingLicenseExpiry",
      "permitNo",
      "operatingPermitExpiry",
      "commercialInsuranceNo",
      "commercialInsuranceExpiry",
      "mandatoryInsuranceNo",
      "mandatoryInsuranceExpiry",
      "cargoInsuranceNo",
      "cargoInsuranceExpiry",
      "ownership",
      "vehicleState",
      "vin",
      "inspectionDue",
      "insuranceDue",
      "remark",
    ].forEach(
      (fieldName) => {
        if (vehicleForm.elements[fieldName]) vehicleForm.elements[fieldName].value = vehicle[fieldName] || "";
      }
    );
  }

  vehicleDialog.showModal();
}

function closeVehicleForm() {
  if (vehicleDialog.open) vehicleDialog.close();
  vehicleForm.reset();
  vehicleFormMode = "create";
  editingVehiclePlate = "";
}

function getVehicleFormData() {
  const formData = new FormData(vehicleForm);
  const drivingLicenseAttachment = window.AttachmentPicker?.getValue(vehicleForm.elements.drivingLicense) || "";
  const operatingPermitAttachment = window.AttachmentPicker?.getValue(vehicleForm.elements.operatingPermit) || "";
  const retainedAttachments = (vehicleForm.dataset.attachments || "").split("、")
    .filter((name) => name && !name.includes("行驶证") && !name.includes("营运证") && name !== "未上传");
  const attachmentNames = [drivingLicenseAttachment, operatingPermitAttachment, ...retainedAttachments].filter(Boolean);

  return {
    plateNo: formData.get("plateNo").trim(),
    driver: formData.get("driver").trim(),
    fleet: formData.get("fleet").trim(),
    fleetName: formData.get("fleetName").trim(),
    vehicleType: formData.get("vehicleType").trim(),
    vin: formData.get("vin").trim(),
    engineNo: formData.get("engineNo").trim(),
    curbWeight: formData.get("curbWeight"),
    fuelConsumption: formData.get("fuelConsumption"),
    ratedLoad: formData.get("ratedLoad"),
    registrationCertNo: formData.get("registrationCertNo").trim(),
    technicalLevel: formData.get("technicalLevel").trim(),
    technicalLevelExpiry: formData.get("technicalLevelExpiry"),
    drivingLicenseNo: formData.get("drivingLicenseNo").trim(),
    drivingLicenseExpiry: formData.get("drivingLicenseExpiry"),
    permitNo: formData.get("permitNo").trim(),
    operatingPermitExpiry: formData.get("operatingPermitExpiry"),
    commercialInsuranceNo: formData.get("commercialInsuranceNo").trim(),
    commercialInsuranceExpiry: formData.get("commercialInsuranceExpiry"),
    mandatoryInsuranceNo: formData.get("mandatoryInsuranceNo").trim(),
    mandatoryInsuranceExpiry: formData.get("mandatoryInsuranceExpiry"),
    cargoInsuranceNo: formData.get("cargoInsuranceNo").trim(),
    cargoInsuranceExpiry: formData.get("cargoInsuranceExpiry"),
    ownership: formData.get("ownership"),
    vehicleState: formData.get("vehicleState"),
    inspectionDue: formData.get("inspectionDue"),
    insuranceDue: formData.get("insuranceDue"),
    remark: formData.get("remark").trim(),
    drivingLicenseAttachment,
    operatingPermitAttachment,
    attachments: attachmentNames.length ? attachmentNames.join("、") : "未上传",
  };
}

function requestDeleteVehicle(plateNo) {
  const vehicle = vehicles.find((item) => item.plateNo === plateNo);
  if (!vehicle) return;
  deletingVehiclePlate = plateNo;
  document.querySelector("#deleteVehicleText").textContent = `确认删除车辆 ${plateNo} 吗？关联的审验和保单记录也会一并移除。`;
  deleteVehicleDialog.showModal();
}

function closeDeleteVehicleDialog() {
  if (deleteVehicleDialog.open) deleteVehicleDialog.close();
  deletingVehiclePlate = "";
}

function deleteVehicle(plateNo) {
  const vehicleIndex = vehicles.findIndex((item) => item.plateNo === plateNo);
  if (vehicleIndex < 0) return;

  vehicles.splice(vehicleIndex, 1);
  [inspectionRecords, insurancePolicies].forEach((records) => {
    for (let index = records.length - 1; index >= 0; index -= 1) {
      if (records[index][0] === plateNo) records.splice(index, 1);
    }
  });

  if (selectedVehicle?.plateNo === plateNo) selectedVehicle = vehicles[0];
  closeDeleteVehicleDialog();
  closeVehicleDetail();
  closeVehicleForm();
  renderVehiclePage(getFilteredVehicles(), getWarningDays());
}

function getDriverExpiryInfo(driver) {
  const licenseDays = daysUntil(driver.licenseExpiry);
  const qualificationDays = daysUntil(driver.qualificationExpiry);
  if (licenseDays < 0 || qualificationDays < 0) return { key: "expired", label: "已过期", rowClass: "expired-row" };
  if (licenseDays <= 30 && qualificationDays <= 30) return { key: "warning", label: "多证件即将到期", rowClass: "warning-row" };
  if (licenseDays <= 30) return { key: "license", label: "驾驶证即将到期", rowClass: "warning-row" };
  if (qualificationDays <= 30) return { key: "qualification", label: "从业资格证即将到期", rowClass: "warning-row" };
  return { key: "normal", label: "正常", rowClass: "" };
}

function getDriverStateClass(state) {
  if (state === "空闲") return "active-state";
  if (state === "运输中") return "maintenance-state";
  return "stop-state";
}

function getCertificationInfo(status) {
  return {
    unverified: { label: "未认证", className: "" },
    pending: { label: "待审核", className: "pending" },
    verified: { label: "已认证", className: "verified" },
    rejected: { label: "未通过", className: "rejected" },
  }[status] || { label: "未认证", className: "" };
}

function canReviewDriverCertification(driver) {
  return driver.certificationStatus === "pending" && driver.driverState !== "运输中";
}

function maskCertificationId(value) {
  return String(value || "").replace(/^(\d{6})\d+(\w{4})$/, "$1********$2");
}

function openCertificationReview(driverId) {
  const driver = drivers.find((item) => item.id === driverId);
  if (!driver) return;
  reviewingDriverId = driverId;
  const status = getCertificationInfo(driver.certificationStatus);
  const files = driver.certificationFiles || {};
  certificationReviewContent.innerHTML = `
    <div class="certification-review-summary">
      <div><span>司机姓名</span><strong>${driver.name}</strong></div>
      <div><span>身份证号</span><strong>${maskCertificationId(driver.idCard)}</strong></div>
      <div><span>认证状态</span><strong><em class="certification-badge ${status.className}">${status.label}</em></strong></div>
      <div><span>联系电话</span><strong>${driver.phone}</strong></div>
      <div><span>准驾车型</span><strong>${driver.licenseClass}</strong></div>
      <div><span>提交时间</span><strong>${driver.certificationSubmittedAt || "尚未提交"}</strong></div>
    </div>
    <div class="certification-file-grid">
      <div class="certification-file-card"><i>身份</i><div><strong>身份证人像面</strong><span>${files.idCardFront || "未上传"}</span></div></div>
      <div class="certification-file-card"><i>身份</i><div><strong>身份证国徽面</strong><span>${files.idCardBack || "未上传"}</span></div></div>
      <div class="certification-file-card"><i>驾驶</i><div><strong>驾驶证照片</strong><span>${files.licenseAttachment || driver.licenseAttachment || "未上传"}</span></div></div>
      <div class="certification-file-card"><i>资格</i><div><strong>从业资格证</strong><span>${files.qualificationAttachment || driver.qualificationAttachment || "未上传"}</span></div></div>
    </div>`;
  certificationReviewNote.value = driver.certificationReason || "";
  const canReview = canReviewDriverCertification(driver);
  document.querySelector("#certificationDialogTitle").textContent = canReview ? "司机认证审核" : "司机认证资料";
  document.querySelector("#certificationDialogSubtitle").textContent = canReview ? "核验司机身份、驾驶证及从业资格资料" : "查看司机认证状态及已提交资料";
  document.querySelector("#certificationReviewNoteField").hidden = !canReview;
  document.querySelector("#cancelCertificationReviewBtn").textContent = canReview ? "取消" : "关闭";
  document.querySelector("#approveCertificationBtn").disabled = !canReview;
  document.querySelector("#approveCertificationBtn").hidden = !canReview;
  document.querySelector("#rejectCertificationBtn").disabled = !canReview;
  document.querySelector("#rejectCertificationBtn").hidden = !canReview;
  driverCertificationDialog.showModal();
}

function closeCertificationReview() {
  if (driverCertificationDialog.open) driverCertificationDialog.close();
  reviewingDriverId = "";
  certificationReviewNote.value = "";
}

function reviewDriverCertification(result) {
  const driver = drivers.find((item) => item.id === reviewingDriverId);
  if (!driver || !canReviewDriverCertification(driver)) return;
  const note = certificationReviewNote.value.trim();
  if (result === "rejected" && !note) {
    certificationReviewNote.focus();
    certificationReviewNote.setCustomValidity("驳回认证时请填写审核意见");
    certificationReviewNote.reportValidity();
    return;
  }
  certificationReviewNote.setCustomValidity("");
  driver.certificationStatus = result;
  driver.certificationReason = result === "rejected" ? note : "";
  driver.certificationReviewedAt = window.DispatchStore.nowText();
  driver.driverState = result === "verified" ? (driverHasActiveDispatch(driver.id) ? "运输中" : "空闲") : "停用";
  saveDriverCertification(driver);
  closeCertificationReview();
  renderDriverPage(getFilteredDrivers());
}

function filterDrivers(formData) {
  const name = normalize(formData.get("driverName"));
  const idCard = normalize(formData.get("idCard"));
  const phone = normalize(formData.get("phone"));
  const state = formData.get("driverState");
  const expiryType = formData.get("expiryType");

  return drivers.filter((driver) => {
    const licenseDays = daysUntil(driver.licenseExpiry);
    const qualificationDays = daysUntil(driver.qualificationExpiry);
    const matchesExpiry =
      !expiryType ||
      (expiryType === "驾驶证即将到期" && licenseDays >= 0 && licenseDays <= 30) ||
      (expiryType === "从业资格证即将到期" && qualificationDays >= 0 && qualificationDays <= 30) ||
      (expiryType === "已过期" && (licenseDays < 0 || qualificationDays < 0));

    return (
      driver.driverType === "自有司机" &&
      normalize(driver.name).includes(name) &&
      normalize(driver.idCard).includes(idCard) &&
      normalize(driver.phone).includes(phone) &&
      (!state || driver.driverState === state) &&
      matchesExpiry
    );
  });
}

function getFilteredDrivers() {
  return filterDrivers(new FormData(driverQueryForm));
}

function renderDriverSummaryCards() {
  const ownDrivers = drivers.filter((driver) => driver.driverType === "自有司机");
  const idleCount = ownDrivers.filter((driver) => driver.driverState === "空闲").length;
  const transportingCount = ownDrivers.filter((driver) => driver.driverState === "运输中").length;
  const disabledCount = ownDrivers.filter((driver) => driver.driverState === "停用").length;

  document.querySelector("#driverSummaryCards").innerHTML = `
    <div class="reminder-card driver-total-card">
      <strong>司机总数</strong>
      <span>${ownDrivers.length}</span>
      <small>已建立司机档案</small>
    </div>
    <div class="reminder-card driver-active-card">
      <strong>空闲司机</strong>
      <span>${idleCount}</span>
      <small>当前可参与派车</small>
    </div>
    <div class="reminder-card driver-onboarding-card">
      <strong>运输中司机</strong>
      <span>${transportingCount}</span>
      <small>当前已有运输任务</small>
    </div>
    <div class="reminder-card driver-warning-card">
      <strong>停用司机</strong>
      <span>${disabledCount}</span>
      <small>当前不参与派车</small>
    </div>
  `;
}

function updateDriverSelection() {
  const selectedOnPage = renderedDriverIds.filter((id) => selectedDriverIds.has(id)).length;
  driverSelectAll.checked = renderedDriverIds.length > 0 && selectedOnPage === renderedDriverIds.length;
  driverSelectAll.indeterminate = selectedOnPage > 0 && selectedOnPage < renderedDriverIds.length;
  document.querySelector("#driverSelectedText").textContent = `已选择 ${selectedDriverIds.size} 名司机`;
}

function renderDriverRows(rows) {
  renderedDriverIds = rows.map((driver) => driver.id);
  if (!rows.length) {
    driverBody.innerHTML = '<tr><td class="no-data-cell" colspan="14">暂无符合条件的司机档案</td></tr>';
    updateDriverSelection();
    return;
  }

  driverBody.innerHTML = rows
    .map((driver) => {
      const expiryInfo = getDriverExpiryInfo(driver);
      const certificationInfo = getCertificationInfo(driver.certificationStatus);
      const certificationAction = canReviewDriverCertification(driver)
        ? `<button class="link-btn" data-review-driver="${driver.id}" type="button">认证审核</button>`
        : `<button class="link-btn" data-view-certification="${driver.id}" type="button">查看认证资料</button>`;
      return `
        <tr class="${expiryInfo.rowClass}">
          <td><input class="driver-row-check" data-driver-id="${driver.id}" type="checkbox" ${selectedDriverIds.has(driver.id) ? "checked" : ""} /></td>
          <td><strong class="primary-text">${driver.name}</strong></td>
          <td>${driver.gender}</td>
          <td>${driver.phone}</td>
          <td>${driver.idCard}</td>
          <td><span class="state-pill ${getDriverStateClass(driver.driverState)}">${driver.driverState}</span></td>
          <td><span class="certification-badge ${certificationInfo.className}">${certificationInfo.label}</span></td>
          <td>${driver.fleet}</td>
          <td>${driver.entryDate}</td>
          <td>${driver.licenseClass}</td>
          <td>${driver.licenseExpiry}</td>
          <td>${driver.qualificationExpiry}</td>
          <td><span class="due-pill ${expiryInfo.key}">${expiryInfo.label}</span></td>
          <td class="fixed-action-column">
            <div class="vehicle-action-group">
              <button class="link-btn" data-detail-driver="${driver.id}" type="button">详情</button>
              ${certificationAction}
              <button class="link-btn" data-edit-driver="${driver.id}" type="button">编辑</button>
              <button class="link-btn delete-btn" data-delete-driver="${driver.id}" type="button">删除</button>
            </div>
          </td>
        </tr>`;
    })
    .join("");
  updateDriverSelection();
}

function renderDriverDetail(driver) {
  if (!driver) {
    document.querySelector("#driverDetailBase").innerHTML = "";
    return;
  }

  const certificationInfo = getCertificationInfo(driver.certificationStatus);
  const detailGroups = [
    {
      title: "基础资料",
      description: "身份、联系信息与当前在岗情况",
      items: [
        ["姓名", driver.name],
        ["性别", driver.gender],
        ["身份证号码", driver.idCard],
        ["手机号", driver.phone],
        ["住址", driver.address],
        ["紧急联系人", driver.emergencyContact],
        ["紧急联系电话", driver.emergencyPhone],
        ["入职日期", driver.entryDate],
        ["司机类型", driver.driverType],
        ["司机状态", driver.driverState],
        ["所属车队", driver.fleet],
        ["认证状态", certificationInfo.label],
      ],
    },
    {
      title: "驾驶证",
      description: "准驾资格、证件期限与电子附件",
      items: [
        ["驾驶证号", driver.licenseNo],
        ["准驾车型", driver.licenseClass],
        ["发证日期", driver.licenseIssueDate],
        ["有效期截止日期", driver.licenseExpiry],
        ["驾驶证附件", driver.licenseAttachment],
      ],
    },
    {
      title: "道路运输从业资格证",
      description: "从业资格与证件有效期",
      items: [
        ["资格证号", driver.qualificationNo],
        ["有效期截止日期", driver.qualificationExpiry],
        ["证件附件", driver.qualificationAttachment],
      ],
    },
    {
      title: "其他信息",
      description: "结算账户与档案备注",
      items: [
        ["银行卡号", driver.bankCard],
        ["开户银行", driver.bankName],
        ["备注", driver.remark],
      ],
    },
  ];

  document.querySelector("#detailDriverTitle").textContent = driver.name;
  document.querySelector("#detailDriverMeta").textContent = `${driver.driverType} / ${driver.licenseClass}`;
  const detailDriverState = document.querySelector("#detailDriverState");
  detailDriverState.textContent = driver.driverState;
  detailDriverState.className = `state-pill ${getDriverStateClass(driver.driverState)}`;
  document.querySelector("#detailDriverPhone").textContent = driver.phone || "—";
  document.querySelector("#detailDriverFleet").textContent = driver.fleet || "—";
  document.querySelector("#detailDriverEntryDate").textContent = driver.entryDate || "—";
  const detailDriverCertification = document.querySelector("#detailDriverCertification");
  detailDriverCertification.textContent = certificationInfo.label;
  detailDriverCertification.className = `certification-badge ${certificationInfo.className}`;
  document.querySelector("#driverDetailBase").innerHTML = detailGroups
    .map(
      (group) => `
        <section class="vehicle-info-section" aria-label="${group.title}">
          <header>
            <div>
              <strong>${group.title}</strong>
              <span>${group.description}</span>
            </div>
            <small>${group.items.length} 项</small>
          </header>
          <dl class="vehicle-info-list">
            ${group.items
              .map(
                ([label, value]) => `
                  <div class="detail-item">
                    <dt>${label}</dt>
                    <dd>${value || "—"}</dd>
                  </div>
                `
              )
              .join("")}
          </dl>
        </section>
      `
    )
    .join("");
}

function renderDriverPagination(total) {
  const totalPages = Math.max(1, Math.ceil(total / driverPageSize));
  driverCurrentPage = Math.min(Math.max(1, driverCurrentPage), totalPages);
  driverCurrentPageButton.textContent = driverCurrentPage;
  driverPrevPage.disabled = driverCurrentPage <= 1;
  driverNextPage.disabled = driverCurrentPage >= totalPages;
  driverPageJump.max = totalPages;
  driverPageJump.value = driverCurrentPage;
  document.querySelector("#driverTotalText").textContent = `共 ${total} 条记录`;
}

function renderDriverPage(rows = drivers) {
  driverPageSize = Number(driverPageSizeSelect.value) || 10;
  renderDriverPagination(rows.length);
  const start = (driverCurrentPage - 1) * driverPageSize;
  renderDriverSummaryCards();
  renderDriverRows(rows.slice(start, start + driverPageSize));
  document.querySelector("#driverResultText").textContent = `共 ${rows.length} 条司机档案，当前第 ${driverCurrentPage} / ${Math.max(1, Math.ceil(rows.length / driverPageSize))} 页`;
  document.querySelector("#driverActiveBadge").textContent = `空闲 ${availableOwnDrivers().length}`;
}

function openDriverDetail(driverId) {
  const driver = drivers.find((item) => item.id === driverId);
  if (!driver) return;
  selectedDriverDetail = driver;
  renderDriverDetail(driver);
  document.querySelector("#driverPage").classList.add("detail-mode");
  driverDetailPanel.classList.add("open");
  driverDetailPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function closeDriverDetail() {
  document.querySelector("#driverPage").classList.remove("detail-mode");
  driverDetailPanel.classList.remove("open");
}

function openDriverForm(mode, driverId = "") {
  driverFormMode = mode;
  editingDriverId = driverId;
  driverForm.reset();
  const driver = drivers.find((item) => item.id === driverId);
  document.querySelector("#driverFormTitle").textContent = mode === "edit" ? "编辑司机档案" : "新增司机档案";
  driverForm.dataset.licenseAttachment = driver?.licenseAttachment || "";
  driverForm.dataset.qualificationAttachment = driver?.qualificationAttachment || "";
  window.AttachmentPicker?.setExisting(driverForm.elements.licenseAttachment, driver?.licenseAttachment === "未上传" ? "" : driver?.licenseAttachment || "");
  window.AttachmentPicker?.setExisting(driverForm.elements.qualificationAttachment, driver?.qualificationAttachment === "未上传" ? "" : driver?.qualificationAttachment || "");

  if (driver) {
    [
      "name", "gender", "idCard", "phone", "address", "emergencyContact", "emergencyPhone", "entryDate",
      "driverState", "fleet", "licenseNo", "licenseClass", "licenseIssueDate", "licenseExpiry", "qualificationNo",
      "qualificationExpiry", "bankCard", "bankName", "remark",
    ].forEach((fieldName) => {
      driverForm.elements[fieldName].value = driver[fieldName];
    });
  }
  driverDialog.showModal();
}

function closeDriverForm() {
  if (driverDialog.open) driverDialog.close();
  driverForm.reset();
  driverFormMode = "create";
  editingDriverId = "";
}

function getDriverFormData() {
  const formData = new FormData(driverForm);
  const textFields = [
    "name", "gender", "idCard", "phone", "address", "emergencyContact", "emergencyPhone", "entryDate",
    "driverState", "fleet", "licenseNo", "licenseClass", "licenseIssueDate", "licenseExpiry", "qualificationNo",
    "qualificationExpiry", "bankCard", "bankName", "remark",
  ];
  const data = Object.fromEntries(textFields.map((fieldName) => [fieldName, String(formData.get(fieldName) || "").trim()]));
  data.driverType = "自有司机";
  data.licenseAttachment = window.AttachmentPicker?.getValue(driverForm.elements.licenseAttachment) || "未上传";
  data.qualificationAttachment = window.AttachmentPicker?.getValue(driverForm.elements.qualificationAttachment) || "未上传";
  return data;
}

function requestDeleteDriver(driverId) {
  const driver = drivers.find((item) => item.id === driverId);
  if (!driver) return;
  deletingDriverId = driverId;
  document.querySelector("#deleteDriverText").textContent = `确认删除司机 ${driver.name} 的档案吗？删除后将无法恢复。`;
  deleteDriverDialog.showModal();
}

function closeDeleteDriverDialog() {
  if (deleteDriverDialog.open) deleteDriverDialog.close();
  deletingDriverId = "";
}

function deleteDriver(driverId) {
  const index = drivers.findIndex((driver) => driver.id === driverId);
  if (index < 0) return;
  drivers.splice(index, 1);
  selectedDriverIds.delete(driverId);
  if (selectedDriverDetail?.id === driverId) selectedDriverDetail = null;
  closeDeleteDriverDialog();
  closeDriverDetail();
  renderDriverPage(getFilteredDrivers());
}

function calculateRouteCommission(route) {
  return route.commissionType === "rate"
    ? Number(route.estimatedRevenue) * Number(route.commissionValue) / 100
    : Number(route.commissionValue);
}

function filterRoutes(formData) {
  const routeCode = normalize(formData.get("routeCode"));
  const routeName = normalize(formData.get("routeName"));
  const origin = normalize(formData.get("origin"));
  const destination = normalize(formData.get("destination"));
  const routeState = formData.get("routeState");
  return fixedRoutes.filter((route) =>
    normalize(route.routeCode).includes(routeCode) &&
    normalize(route.routeName).includes(routeName) &&
    normalize(route.origin).includes(origin) &&
    normalize(route.destination).includes(destination) &&
    (!routeState || route.routeState === routeState)
  );
}

function getFilteredRoutes() {
  return filterRoutes(new FormData(routeQueryForm));
}

function updateRouteSelection() {
  const selectedOnPage = renderedRouteIds.filter((id) => selectedRouteIds.has(id)).length;
  routeSelectAll.checked = renderedRouteIds.length > 0 && selectedOnPage === renderedRouteIds.length;
  routeSelectAll.indeterminate = selectedOnPage > 0 && selectedOnPage < renderedRouteIds.length;
  document.querySelector("#routeSelectedText").textContent = `已选择 ${selectedRouteIds.size} 条线路`;
}

function renderRouteRows(rows) {
  renderedRouteIds = rows.map((route) => route.id);
  if (!rows.length) {
    routeBody.innerHTML = '<tr><td class="no-data-cell" colspan="11">暂无符合条件的固定线路</td></tr>';
    updateRouteSelection();
    return;
  }

  routeBody.innerHTML = rows.map((route) => {
    const commissionDisplay = route.commissionType === "rate" ? `${route.commissionValue}%` : formatMoney(route.commissionValue);
    return `
      <tr>
        <td><input class="route-row-check" data-route-id="${route.id}" type="checkbox" ${selectedRouteIds.has(route.id) ? "checked" : ""} /></td>
        <td><strong class="primary-text">${route.routeCode}</strong></td><td>${route.routeName}</td><td>${route.origin}</td><td>${route.destination}</td>
        <td class="money">${formatMoney(route.estimatedRevenue)}</td><td>${route.commissionType === "rate" ? "按收入比例提成" : "固定金额提成"}</td>
        <td>${commissionDisplay}<small class="commission-result">预计 ${formatMoney(calculateRouteCommission(route))}</small></td>
        <td><span class="route-state ${route.routeState === "启用" ? "enabled" : "disabled"}">${route.routeState}</span></td><td>${route.remark || "-"}</td>
        <td class="fixed-action-column"><div class="vehicle-action-group"><button class="link-btn" data-edit-route="${route.id}" type="button">编辑</button><button class="link-btn delete-btn" data-delete-route="${route.id}" type="button">删除</button></div></td>
      </tr>`;
  }).join("");
  updateRouteSelection();
}

function renderRoutePagination(total) {
  const totalPages = Math.max(1, Math.ceil(total / routePageSize));
  routeCurrentPage = Math.min(Math.max(1, routeCurrentPage), totalPages);
  routeCurrentPageButton.textContent = routeCurrentPage;
  routePrevPage.disabled = routeCurrentPage <= 1;
  routeNextPage.disabled = routeCurrentPage >= totalPages;
  routePageJump.max = totalPages;
  routePageJump.value = routeCurrentPage;
  document.querySelector("#routeTotalText").textContent = `共 ${total} 条记录`;
}

function renderRoutePage(rows = fixedRoutes) {
  routePageSize = Number(routePageSizeSelect.value) || 10;
  renderRoutePagination(rows.length);
  const start = (routeCurrentPage - 1) * routePageSize;
  renderRouteRows(rows.slice(start, start + routePageSize));
  document.querySelector("#routeResultText").textContent = `共 ${rows.length} 条线路，当前第 ${routeCurrentPage} / ${Math.max(1, Math.ceil(rows.length / routePageSize))} 页`;
  document.querySelector("#routeActiveBadge").textContent = `启用 ${fixedRoutes.filter((route) => route.routeState === "启用").length}`;
  refreshWaybillRouteOptions();
}

function populateRouteAssociations() {
  const vehicleSelect = document.querySelector("#routeDefaultVehicle");
  const driverSelect = document.querySelector("#routeDefaultDriver");
  vehicleSelect.innerHTML = '<option value="">不指定</option>' + vehicles.filter((vehicle) => vehicle.vehicleState === "在用").map((vehicle) => `<option>${vehicle.plateNo}</option>`).join("");
  driverSelect.innerHTML = '<option value="">不指定</option>' + enabledOwnDrivers().map((driver) => `<option>${driver.name}</option>`).join("");
}

function updateRouteCommissionPreview() {
  const type = routeForm.elements.commissionType.value;
  const revenue = Number(routeForm.elements.estimatedRevenue.value) || 0;
  const value = Number(routeForm.elements.commissionValue.value) || 0;
  document.querySelector("#routeCommissionLabel").textContent = type === "rate" ? "提成比例（%）" : "固定提成金额（元）";
  routeForm.elements.commissionValue.max = type === "rate" ? "100" : "";
  document.querySelector("#routeCommissionPreview").value = type === "rate" ? (revenue * value / 100).toFixed(2) : value.toFixed(2);
}

function openRouteForm(mode, routeId = "") {
  routeFormMode = mode;
  editingRouteId = routeId;
  routeForm.reset();
  populateRouteAssociations();
  const route = fixedRoutes.find((item) => item.id === routeId);
  document.querySelector("#routeFormTitle").textContent = mode === "edit" ? "编辑固定线路" : "新增固定线路";
  if (route) {
    ["routeName", "origin", "destination", "viaPoints", "routeState", "remark", "estimatedRevenue", "baseFreight", "commissionType", "commissionValue", "commissionRemark", "defaultVehicle", "defaultDriver"].forEach((fieldName) => {
      routeForm.elements[fieldName].value = route[fieldName];
    });
  }
  updateRouteCommissionPreview();
  routeDialog.showModal();
}

function closeRouteForm() {
  if (routeDialog.open) routeDialog.close();
  routeForm.reset();
  routeFormMode = "create";
  editingRouteId = "";
}

function getRouteFormData() {
  const formData = new FormData(routeForm);
  return {
    routeName: String(formData.get("routeName") || "").trim(),
    origin: String(formData.get("origin") || "").trim(), destination: String(formData.get("destination") || "").trim(),
    viaPoints: String(formData.get("viaPoints") || "").trim(), routeState: formData.get("routeState"), remark: String(formData.get("remark") || "").trim(),
    estimatedRevenue: Number(formData.get("estimatedRevenue")) || 0, baseFreight: Number(formData.get("baseFreight")) || 0, commissionType: formData.get("commissionType"),
    commissionValue: Number(formData.get("commissionValue")) || 0, commissionRemark: String(formData.get("commissionRemark") || "").trim(),
    defaultVehicle: formData.get("defaultVehicle"), defaultDriver: formData.get("defaultDriver"),
  };
}

let routeSequence = 0;
function getNextRouteCode() {
  routeSequence = Math.max(routeSequence, ...fixedRoutes.map((route) => {
    const match = /^XL-(?:[A-Z]+-)?(\d+)$/.exec(route.routeCode);
    return match ? Number(match[1]) : 0;
  }));
  return `XL-${String(++routeSequence).padStart(3, "0")}`;
}

function requestDeleteRoute(routeId) {
  const route = fixedRoutes.find((item) => item.id === routeId);
  if (!route) return;
  deletingRouteId = routeId;
  document.querySelector("#deleteRouteText").textContent = `确认删除线路 ${route.routeName}（${route.routeCode}）吗？删除后将无法恢复。`;
  deleteRouteDialog.showModal();
}

function closeDeleteRouteDialog() {
  if (deleteRouteDialog.open) deleteRouteDialog.close();
  deletingRouteId = "";
}

function deleteRoute(routeId) {
  const index = fixedRoutes.findIndex((route) => route.id === routeId);
  if (index < 0) return;
  fixedRoutes.splice(index, 1);
  selectedRouteIds.delete(routeId);
  closeDeleteRouteDialog();
  renderRoutePage(getFilteredRoutes());
}

function refreshWaybillRouteOptions() {
  const select = document.querySelector("#waybillRouteSelect");
  if (!select) return;
  const currentValue = select.value;
  select.innerHTML = '<option value="">请选择固定线路</option>' + fixedRoutes.filter((route) => route.routeState === "启用").map((route) => `<option value="${route.id}">${route.routeCode} / ${route.routeName}</option>`).join("");
  select.value = fixedRoutes.some((route) => route.id === currentValue) ? currentValue : "";
}

const waybillRouteMap = {
  WB20260916001: "XL-001",
  WB20260916002: "XL-002",
  WB20260916003: "XL-003",
  WB20260916004: "XL-004",
};

function getRouteForWaybill(waybillNo) {
  const waybill = waybills.find((item) => item.waybillNo === waybillNo);
  return fixedRoutes.find((route) => route.id === (waybillRouteMap[waybillNo] || waybill?.routeId)) || null;
}

function getDispatchStatusClass(status) {
  return { 待派单: "pending", 已派单: "assigned", 运输中: "moving", 已完成: "completed", 取消: "cancelled" }[status] || "pending";
}

const seedAutoDispatchIds = new Set(["PD-1001", "PD-1003"]);

function getDispatchMode(dispatch) {
  if (dispatch.status === "待派单") return "pending";
  if (dispatch.dispatchMode === "auto" || dispatch.dispatchMode === "manual") return dispatch.dispatchMode;
  return seedAutoDispatchIds.has(dispatch.id) ? "auto" : "manual";
}

function renderDispatchStats() {
  document.querySelector("#dispatchTotalStat").textContent = dispatches.length;
  document.querySelector("#dispatchAutoStat").textContent = dispatches.filter((item) => getDispatchMode(item) === "auto").length;
  document.querySelector("#dispatchManualStat").textContent = dispatches.filter((item) => getDispatchMode(item) === "manual").length;
  document.querySelector("#dispatchPendingStat").textContent = dispatches.filter((item) => getDispatchMode(item) === "pending").length;
  const mode = dispatchQueryForm.elements.dispatchMode.value;
  document.querySelectorAll("[data-dispatch-mode]").forEach((button) => {
    const active = button.dataset.dispatchMode === mode;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function populateDispatchFilters() {
  const routeFilter = document.querySelector("#dispatchRouteFilter");
  const driverFilter = document.querySelector("#dispatchDriverFilter");
  const vehicleFilter = document.querySelector("#dispatchVehicleFilter");
  const currentValues = { route: routeFilter.value, driver: driverFilter.value, vehicle: vehicleFilter.value };
  routeFilter.innerHTML = '<option value="">全部线路</option>' + fixedRoutes.map((route) => `<option value="${route.id}">${route.routeName}</option>`).join("");
  driverFilter.innerHTML = '<option value="">全部司机</option>' + drivers.filter((driver) => driver.driverType === "自有司机").map((driver) => `<option value="${driver.name}">${driver.name}</option>`).join("");
  vehicleFilter.innerHTML = '<option value="">全部车辆</option>' + vehicles.map((vehicle) => `<option value="${vehicle.plateNo}">${vehicle.plateNo}</option>`).join("");
  routeFilter.value = currentValues.route;
  driverFilter.value = currentValues.driver;
  vehicleFilter.value = currentValues.vehicle;
}

function filterDispatches(formData) {
  const waybillNo = normalize(formData.get("waybillNo"));
  const orderDate = formData.get("orderDate");
  const routeId = formData.get("routeId");
  const driverName = formData.get("driverName");
  const plateNo = formData.get("plateNo");
  const status = formData.get("dispatchStatus");
  const mode = formData.get("dispatchMode");
  return dispatches.filter((dispatch) =>
    normalize(dispatch.waybillNo).includes(waybillNo) &&
    (!orderDate || dispatch.orderDate === orderDate) &&
    (!routeId || dispatch.routeId === routeId) &&
    (!driverName || dispatch.driverName === driverName) &&
    (!plateNo || dispatch.vehicleId === plateNo) &&
    (!status || dispatch.status === status) &&
    (!mode || getDispatchMode(dispatch) === mode)
  );
}

function getFilteredDispatches() {
  return filterDispatches(new FormData(dispatchQueryForm));
}

function updateDispatchSelection() {
  const selectedOnPage = renderedDispatchIds.filter((id) => selectedDispatchIds.has(id)).length;
  dispatchSelectAll.checked = renderedDispatchIds.length > 0 && selectedOnPage === renderedDispatchIds.length;
  dispatchSelectAll.indeterminate = selectedOnPage > 0 && selectedOnPage < renderedDispatchIds.length;
  document.querySelector("#dispatchSelectedText").textContent = `已选择 ${selectedDispatchIds.size} 条派单`;
}

function renderDispatchRows(rows) {
  renderedDispatchIds = rows.map((dispatch) => dispatch.id);
  if (!rows.length) {
    dispatchBody.innerHTML = '<tr><td class="no-data-cell" colspan="13">暂无符合条件的派单记录</td></tr>';
    updateDispatchSelection();
    return;
  }

  dispatchBody.innerHTML = rows.map((dispatch) => `
    <tr>
      <td><input class="dispatch-row-check" data-dispatch-id="${dispatch.id}" type="checkbox" ${selectedDispatchIds.has(dispatch.id) ? "checked" : ""} /></td>
      <td><strong class="primary-text">${dispatch.waybillNo}</strong></td><td><span class="dispatch-mode ${getDispatchMode(dispatch)}">${{ auto: "自动派单", manual: "手动派单", pending: "待分配" }[getDispatchMode(dispatch)]}</span></td><td>${dispatch.routeName}</td><td>${dispatch.origin}</td><td>${dispatch.destination}</td><td>${dispatch.dispatchTime || "-"}</td>
      <td>${dispatch.driverName}</td><td>${dispatch.phone}</td><td>${dispatch.vehicleId || "-"}</td><td><span class="dispatch-status ${getDispatchStatusClass(dispatch.status)}">${dispatch.status}</span></td><td><span class="dispatch-node">${dispatch.currentNode}</span></td>
      <td class="fixed-action-column"><div class="vehicle-action-group"><button class="link-btn" data-view-dispatch="${dispatch.id}" type="button">查看</button>${["待派单", "已派单"].includes(dispatch.status) ? `<button class="link-btn delete-btn revoke-btn" data-revoke-dispatch="${dispatch.id}" type="button">撤销</button>` : ""}</div></td>
    </tr>`).join("");
  updateDispatchSelection();
}

function renderDispatchPagination(total) {
  const totalPages = Math.max(1, Math.ceil(total / dispatchPageSize));
  dispatchCurrentPage = Math.min(Math.max(1, dispatchCurrentPage), totalPages);
  dispatchCurrentPageButton.textContent = dispatchCurrentPage;
  dispatchPrevPage.disabled = dispatchCurrentPage <= 1;
  dispatchNextPage.disabled = dispatchCurrentPage >= totalPages;
  dispatchPageJump.max = totalPages;
  dispatchPageJump.value = dispatchCurrentPage;
  document.querySelector("#dispatchTotalText").textContent = `共 ${total} 条记录`;
}

function renderDispatchPage(rows = dispatches) {
  dispatchPageSize = Number(dispatchPageSizeSelect.value) || 10;
  populateDispatchFilters();
  renderDispatchStats();
  renderDispatchPagination(rows.length);
  const start = (dispatchCurrentPage - 1) * dispatchPageSize;
  renderDispatchRows(rows.slice(start, start + dispatchPageSize));
  document.querySelector("#dispatchResultText").textContent = `共 ${rows.length} 条派单，当前第 ${dispatchCurrentPage} / ${Math.max(1, Math.ceil(rows.length / dispatchPageSize))} 页`;
  document.querySelector("#dispatchActiveBadge").textContent = `运输中 ${dispatches.filter((dispatch) => dispatch.status === "运输中").length}`;
}

function populateDispatchFormOptions() {
  const waybillSelect = document.querySelector("#dispatchWaybillSelect");
  const driverSelect = document.querySelector("#dispatchDriverSelect");
  const vehicleSelect = document.querySelector("#dispatchVehicleSelect");
  waybillSelect.innerHTML = '<option value="">请选择已有运单</option>' + waybills.filter((waybill) =>
    !dispatches.some((dispatch) => dispatch.waybillNo === waybill.waybillNo && ["已派单", "运输中", "已完成"].includes(dispatch.status))
  ).map((waybill) => `<option value="${waybill.waybillNo}">${waybill.waybillNo} / ${waybill.customerName}</option>`).join("");
  driverSelect.innerHTML = '<option value="">请选择司机</option>' + availableOwnDrivers().map((driver) => `<option value="${driver.id}">${driver.name} / ${driver.phone}</option>`).join("");
  vehicleSelect.innerHTML = '<option value="">请选择车辆</option>' + vehicles.filter((vehicle) => vehicle.vehicleState === "在用").map((vehicle) => `<option value="${vehicle.plateNo}">${vehicle.plateNo} / ${vehicle.vehicleType}</option>`).join("");
}

function updateDispatchFormFromWaybill() {
  const waybill = waybills.find((item) => item.waybillNo === dispatchForm.elements.waybillId.value);
  const route = waybill ? getRouteForWaybill(waybill.waybillNo) : null;
  dispatchForm.elements.driverId.value = "";
  dispatchForm.elements.vehicleId.value = "";
  dispatchForm.elements.driverId.disabled = !waybill;
  dispatchForm.elements.vehicleId.disabled = !waybill;
  document.querySelector("#dispatchRouteName").value = route ? `${route.routeCode} / ${route.routeName}` : "";
  document.querySelector("#dispatchOrigin").value = route?.origin || waybill?.loadAddress || "";
  document.querySelector("#dispatchDestination").value = route?.destination || "";
  document.querySelector("#dispatchLoadAddress").value = waybill?.loadAddress || "";
  document.querySelector("#dispatchBoxes").value = waybill ? formatWaybillBoxes(waybill) : "";
  document.querySelector("#dispatchRevenue").value = route ? formatMoney(route.estimatedRevenue) : "";
  document.querySelector("#dispatchCommission").value = route ? formatMoney(calculateRouteCommission(route)) : "";
}

function openDispatchForm() {
  dispatchForm.reset();
  populateDispatchFormOptions();
  dispatchForm.elements.waybillId.value = "";
  updateDispatchFormFromWaybill();
  dispatchDialog.showModal();
}

function closeDispatchForm() {
  if (dispatchDialog.open) dispatchDialog.close();
  dispatchForm.reset();
  dispatchForm.elements.waybillId.value = "";
  updateDispatchFormFromWaybill();
}

function openDispatchDetail(dispatchId) {
  const dispatch = dispatches.find((item) => item.id === dispatchId);
  if (!dispatch) return;
  document.querySelector("#dispatchDetailSubTitle").textContent = `${dispatch.waybillNo} / ${dispatch.routeName}`;
  const timeline = dispatch.timeline.length ? dispatch.timeline.map((item, index) => `
    <div class="timeline-item ${index === dispatch.timeline.length - 1 ? "current" : ""}"><span class="timeline-dot"></span><div class="timeline-main"><strong>${item.node}</strong><time>${item.time}</time><p>${item.desc}</p>${item.photos.length ? `<div class="photo-list">${item.photos.map((photo) => `<span class="photo-chip">▧ ${photo}</span>`).join("")}</div>` : ""}</div></div>`).join("") : '<div class="empty-detail">暂无节点上报记录</div>';
  document.querySelector("#dispatchDetailContent").innerHTML = `
    <div class="dispatch-detail-summary"><div><span>派单状态</span><strong class="dispatch-status ${getDispatchStatusClass(dispatch.status)}">${dispatch.status}</strong></div><div><span>当前节点</span><strong>${dispatch.currentNode}</strong></div><div><span>司机 / 车辆</span><strong>${dispatch.driverName} / ${dispatch.vehicleId || "待分配"}</strong></div><div><span>消息推送</span><strong class="push-success">${dispatch.pushed ? "已推送小程序" : "待推送"}</strong></div></div>
    <div class="dispatch-info-grid"><div><span>派单方式</span><strong>${{ auto: "自动派单", manual: "手动派单", pending: "待分配" }[getDispatchMode(dispatch)]}</strong></div><div><span>起运地</span><strong>${dispatch.origin}</strong></div><div><span>目的地</span><strong>${dispatch.destination}</strong></div><div><span>装卸地址</span><strong>${dispatch.loadAddress || dispatch.origin}</strong></div><div><span>箱信息</span><strong>${dispatch.boxes}</strong></div><div><span>预估收入 / 司机提成</span><strong>${formatMoney(dispatch.estimatedRevenue)} / ${formatMoney(dispatch.commission)}</strong></div><div><span>联系电话</span><strong>${dispatch.phone}</strong></div><div><span>派单备注</span><strong>${dispatch.note || "-"}</strong></div></div>
    <section class="timeline-section"><div class="detail-section-title"><strong>运输节点时间线</strong><span>司机小程序最新上报记录</span></div><div class="timeline">${timeline}</div></section>`;
  dispatchDetailDialog.showModal();
}

function requestRevokeDispatch(dispatchId) {
  const dispatch = dispatches.find((item) => item.id === dispatchId);
  if (!dispatch || !["待派单", "已派单"].includes(dispatch.status)) return;
  deletingDispatchId = dispatchId;
  document.querySelector("#revokeDispatchText").textContent = `确认撤销 ${dispatch.waybillNo} 的派单吗？司机小程序单据将同步回收。`;
  revokeDispatchDialog.showModal();
}

function closeRevokeDispatchDialog() {
  if (revokeDispatchDialog.open) revokeDispatchDialog.close();
  deletingDispatchId = "";
}

function revokeDispatch(dispatchId) {
  const dispatch = dispatches.find((item) => item.id === dispatchId);
  if (!dispatch) return;
  dispatch.status = "取消";
  dispatch.currentNode = "待派单";
  dispatch.timeline.push({ node: "取消", time: "2026-09-16 11:20", desc: "未开始提货，后台撤销派单并回收小程序单据", photos: [] });
  syncDriverOperationalStates();
  saveDispatches();
  closeRevokeDispatchDialog();
  renderDispatchPage(getFilteredDispatches());
  renderDriverPage(getFilteredDrivers());
}

function switchModule(moduleName) {
  const target = moduleName || "archives";
  document.querySelectorAll(".detail-tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.module === target);
  });
  document.querySelectorAll(".vehicle-module").forEach((module) => {
    module.classList.toggle("active", module.id === `${target}Module`);
  });
}

function openVehicleDetail(plateNo, moduleName = "detailBase") {
  const vehicle = vehicles.find((item) => item.plateNo === plateNo) || vehicles[0];
  selectedVehicle = vehicle;
  renderVehiclePage(filterVehicles(new FormData(document.querySelector("#vehicleQueryForm"))), getWarningDays());
  document.querySelector("#vehiclePage").classList.add("detail-mode");
  document.querySelector("#vehicleDetailPanel").classList.add("open");
  closeVehicleForm();
  switchModule(moduleName);
  document.querySelector("#vehicleDetailPanel").scrollIntoView({ behavior: "smooth", block: "start" });
}

function closeVehicleDetail() {
  document.querySelector("#vehiclePage").classList.remove("detail-mode");
  document.querySelector("#vehicleDetailPanel").classList.remove("open");
  switchModule("archives");
}

function switchPage(pageName) {
  const meta = pageMeta[pageName] || pageMeta.waybill;
  const activeNavPage = meta.navPage || pageName;
  pageTitle.textContent = meta.title;
  pageKicker.textContent = meta.kicker;

  Object.entries(pageViews).forEach(([key, view]) => {
    view.classList.toggle("active", key === meta.view);
  });

  document.querySelectorAll("[data-page]").forEach((item) => {
    const isVehicleTab =
      item.classList.contains("tab") && item.dataset.page === "vehicle" && meta.view === "vehicle" && pageName !== "home";
    item.classList.toggle("active", item.classList.contains("tab") && (item.dataset.page === pageName || isVehicleTab));
    item.classList.toggle("selected", item.classList.contains("nav-child") && item.dataset.page === activeNavPage);
  });

  document.querySelectorAll(".nav-section").forEach((section) => {
    section.classList.toggle("active", Boolean(section.querySelector(".nav-child.selected")));
  });

  if (meta.view === "vehicle") {
    renderVehiclePage(filterVehicles(new FormData(document.querySelector("#vehicleQueryForm"))), getWarningDays());
    closeVehicleDetail();
  }
  if (meta.view === "driver") {
    closeDriverDetail();
    renderDriverPage(getFilteredDrivers());
  }
  if (meta.view === "route") {
    renderRoutePage(getFilteredRoutes());
  }
  if (meta.view === "dispatch") {
    renderDispatchPage(getFilteredDispatches());
  }
  if (meta.view === "autoDispatch") {
    window.AutoDispatchManager?.refresh();
  }
  if (meta.view === "customer") {
    window.CustomerManager?.render();
  }
}

renderRows(waybills);
selectAll.indeterminate = true;
renderVehiclePage();
renderDriverPage();
renderRoutePage();
renderDispatchPage();

selectAll.addEventListener("change", () => {
  document.querySelectorAll(".row-check").forEach((checkbox) => {
    checkbox.checked = selectAll.checked;
  });
  selectAll.indeterminate = false;
});

tableBody.addEventListener("change", (event) => {
  if (!event.target.matches(".row-check")) return;
  const checks = [...document.querySelectorAll(".row-check")];
  const checkedCount = checks.filter((item) => item.checked).length;
  selectAll.checked = checkedCount === checks.length;
  selectAll.indeterminate = checkedCount > 0 && checkedCount < checks.length;
});

moreBtn.addEventListener("click", () => {
  moreMenu.classList.toggle("open");
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".action-bar")) {
    moreMenu.classList.remove("open");
  }
});

function getCurrentOrderDate() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function getNextWaybillNo(orderDate) {
  const datePart = orderDate.replaceAll("-", "");
  const prefix = `WB${datePart}`;
  const maxNumber = waybills.reduce((max, item) => {
    const number = item.waybillNo?.startsWith(prefix) ? item.waybillNo.slice(prefix.length) : "";
    return /^\d{3,}$/.test(number) ? Math.max(max, Number(number)) : max;
  }, 0);
  return `${prefix}${String(maxNumber + 1).padStart(3, "0")}`;
}

function setGeneratedWaybillFields(orderDate) {
  const waybillNo = getNextWaybillNo(orderDate);
  waybillForm.elements.waybillNo.value = waybillNo;
  waybillForm.elements.orderDate.value = orderDate;
  document.querySelector("#generatedWaybillNo").textContent = waybillNo;
  document.querySelector("#generatedOrderDate").textContent = orderDate;
  return waybillNo;
}

function updateContainerCount() {
  document.querySelector("#waybillContainerCount").textContent = waybillContainerBody.querySelectorAll("tr").length;
}

function createContainerRow(values = {}) {
  const route = fixedRoutes.find((item) => item.id === waybillForm.elements.routeId.value);
  const row = document.createElement("tr");
  row.innerHTML = `
    <td><input class="container-box-no" placeholder="请输入箱号" /></td>
    <td><input class="container-seal-no" placeholder="请输入封号" /></td>
    <td><select class="container-box-type"><option>40HQ</option><option>40GP</option><option>20GP</option><option>45HQ</option></select></td>
    <td><input class="container-pickup-point" placeholder="请输入提箱点" /></td>
    <td><input class="container-return-point" placeholder="请输入还箱点" /></td>
    <td><button class="fee-delete container-delete" type="button">删除</button></td>`;
  waybillContainerBody.appendChild(row);
  row.querySelector(".container-box-no").value = values.boxNo || "";
  row.querySelector(".container-seal-no").value = values.sealNo || "";
  row.querySelector(".container-box-type").value = values.boxType || "40HQ";
  row.querySelector(".container-pickup-point").value = values.pickupPoint || "";
  const returnPoint = values.returnPoint || route?.destination || "";
  const returnInput = row.querySelector(".container-return-point");
  returnInput.value = returnPoint;
  returnInput.dataset.routeValue = values.returnPoint ? "" : returnPoint;
  updateContainerCount();
  return row;
}

function getContainerRows() {
  return [...waybillContainerBody.querySelectorAll("tr")].map((row) => ({
    boxNo: row.querySelector(".container-box-no").value.trim(),
    sealNo: row.querySelector(".container-seal-no").value.trim(),
    boxType: row.querySelector(".container-box-type").value,
    pickupPoint: row.querySelector(".container-pickup-point").value.trim(),
    returnPoint: row.querySelector(".container-return-point").value.trim(),
  }));
}

function createFeeRow(type, values = {}) {
  const isReceivable = type === "receivable";
  const body = isReceivable ? receivableFeeBody : payableFeeBody;
  const row = document.createElement("tr");
  row.innerHTML = `
    <td><select class="fee-target"><option>${isReceivable ? "客户" : "供应商"}</option><option>${isReceivable ? "供应商" : "司机"}</option><option>其他</option></select></td>
    <td><input class="fee-unit" placeholder="单位名称" /></td>
    <td><select class="fee-kind"><option>运费</option><option>装卸费</option><option>压夜费</option><option>过路费</option><option>油费</option><option>司机提成</option><option>其他</option></select></td>
    <td><input class="fee-quantity" type="number" min="0" step="0.01" value="1" /></td>
    <td><input class="fee-price" type="number" min="0" step="0.01" value="0" /></td>
    <td><input class="fee-amount" value="0.00" readonly /></td>
    <td><input class="fee-settled" type="number" min="0" step="0.01" value="0" /></td>
    <td><input class="fee-outstanding" value="0.00" readonly /></td>
    <td class="fee-check-cell"><input class="fee-check" type="checkbox" /></td>
    <td><button class="fee-delete" type="button">删除</button></td>`;
  body.appendChild(row);
  row.querySelector(".fee-target").value = values.target || (isReceivable ? "客户" : "供应商");
  row.querySelector(".fee-unit").value = values.unit || "";
  row.querySelector(".fee-kind").value = values.kind || "运费";
  row.querySelector(".fee-quantity").value = values.quantity ?? 1;
  row.querySelector(".fee-price").value = values.price ?? 0;
  row.querySelector(".fee-settled").value = values.settled ?? 0;
  row.querySelector(".fee-check").checked = Boolean(values.invoice);
  updateFeeRow(row);
}

function updateFeeRow(row) {
  const quantity = Number(row.querySelector(".fee-quantity").value) || 0;
  const price = Number(row.querySelector(".fee-price").value) || 0;
  const settled = Number(row.querySelector(".fee-settled").value) || 0;
  const amount = quantity * price;
  row.querySelector(".fee-amount").value = amount.toFixed(2);
  row.querySelector(".fee-outstanding").value = Math.max(0, amount - settled).toFixed(2);
  updateWaybillTotals();
}

function getFeeRows(type) {
  const body = type === "receivable" ? receivableFeeBody : payableFeeBody;
  return [...body.querySelectorAll("tr")].map((row) => ({
    target: row.querySelector(".fee-target").value,
    unit: row.querySelector(".fee-unit").value.trim(),
    kind: row.querySelector(".fee-kind").value,
    quantity: Number(row.querySelector(".fee-quantity").value) || 0,
    price: Number(row.querySelector(".fee-price").value) || 0,
    amount: Number(row.querySelector(".fee-amount").value) || 0,
    settled: Number(row.querySelector(".fee-settled").value) || 0,
    invoice: row.querySelector(".fee-check").checked,
  }));
}

function updateWaybillTotals() {
  if (!receivableFeeBody || !payableFeeBody) return;
  const receivable = getFeeRows("receivable").reduce((sum, item) => sum + item.amount, 0);
  const payable = getFeeRows("payable").reduce((sum, item) => sum + item.amount, 0);
  document.querySelector("#waybillReceivableTotal").textContent = formatMoney(receivable);
  document.querySelector("#waybillPayableTotal").textContent = formatMoney(payable);
  document.querySelector("#waybillProfitTotal").textContent = formatMoney(receivable - payable);
}

let selectedWaybillCustomer = "";
let lastCustomerAddress = "";
let lastRouteAddress = "";

function fillWaybillFromCustomer() {
  const customer = window.CustomerManager?.getActiveCustomerByName(waybillForm.elements.customerName.value);
  const addressField = waybillForm.elements.loadAddress;
  if (!customer) {
    if (selectedWaybillCustomer && addressField.value === lastCustomerAddress) addressField.value = "";
    selectedWaybillCustomer = "";
    lastCustomerAddress = "";
    return;
  }
  if (selectedWaybillCustomer === customer.customerName) return;
  const address = [customer.loadAddress, customer.unloadAddress].filter(Boolean).join(" / ");
  addressField.value = address;
  selectedWaybillCustomer = customer.customerName;
  lastCustomerAddress = address;
  lastRouteAddress = "";
}

function fillWaybillFromRoute() {
  const route = fixedRoutes.find((item) => item.id === waybillForm.elements.routeId.value);
  if (!route) return;
  const addressField = waybillForm.elements.loadAddress;
  const customer = window.CustomerManager?.getActiveCustomerByName(waybillForm.elements.customerName.value);
  if (!customer && (!addressField.value.trim() || addressField.value === lastRouteAddress)) {
    lastRouteAddress = `${route.origin} / ${route.destination}`;
    addressField.value = lastRouteAddress;
  }
  waybillContainerBody.querySelectorAll(".container-return-point").forEach((input) => {
    if (!input.value.trim() || input.value === input.dataset.routeValue) {
      input.value = route.destination;
      input.dataset.routeValue = route.destination;
    }
  });
}

function loadRouteFee(type) {
  const route = fixedRoutes.find((item) => item.id === waybillForm.elements.routeId.value);
  if (!route) {
    window.alert("请先选择固定线路。");
    return;
  }
  const body = type === "receivable" ? receivableFeeBody : payableFeeBody;
  body.innerHTML = "";
  if (type === "receivable") {
    createFeeRow(type, { target: "客户", unit: waybillForm.elements.customerName.value, kind: "运费", price: route.estimatedRevenue });
  } else {
    createFeeRow(type, { target: "供应商", unit: "", kind: "运费", price: route.baseFreight });
    createFeeRow(type, { target: "司机", unit: route.defaultDriver || "", kind: "司机提成", price: calculateRouteCommission(route) });
  }
}

function openWaybillForm() {
  waybillForm.reset();
  selectedWaybillCustomer = "";
  lastCustomerAddress = "";
  lastRouteAddress = "";
  refreshWaybillRouteOptions();
  setGeneratedWaybillFields(getCurrentOrderDate());
  waybillForm.elements.auditState.value = "草拟";
  waybillForm.elements.dispatchable.checked = true;
  waybillContainerBody.innerHTML = "";
  receivableFeeBody.innerHTML = "";
  payableFeeBody.innerHTML = "";
  createContainerRow();
  createFeeRow("receivable");
  createFeeRow("payable");
  addDialog.showModal();
}

function closeWaybillForm() {
  if (addDialog.open) addDialog.close();
  waybillForm.reset();
}

addBtn.addEventListener("click", openWaybillForm);
document.querySelector("#closeWaybillFormBtn").addEventListener("click", closeWaybillForm);
document.querySelector("#cancelWaybillFormBtn").addEventListener("click", closeWaybillForm);

document.querySelectorAll(".add-fee-row").forEach((button) => {
  button.addEventListener("click", () => createFeeRow(button.dataset.feeType));
});

document.querySelector("#addContainerRowBtn").addEventListener("click", () => createContainerRow());
waybillContainerBody.addEventListener("click", (event) => {
  const deleteButton = event.target.closest(".container-delete");
  if (!deleteButton) return;
  deleteButton.closest("tr").remove();
  if (!waybillContainerBody.querySelector("tr")) createContainerRow();
  updateContainerCount();
});

document.querySelectorAll(".default-fee").forEach((button) => {
  button.addEventListener("click", () => loadRouteFee(button.dataset.feeType));
});

[receivableFeeBody, payableFeeBody].forEach((body) => {
  body.addEventListener("input", (event) => {
    if (event.target.matches(".fee-quantity, .fee-price, .fee-settled")) updateFeeRow(event.target.closest("tr"));
  });
  body.addEventListener("click", (event) => {
    const deleteButton = event.target.closest(".fee-delete");
    if (!deleteButton) return;
    deleteButton.closest("tr").remove();
    updateWaybillTotals();
  });
});

waybillForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const orderDate = getCurrentOrderDate();
  const waybillNo = setGeneratedWaybillFields(orderDate);
  const formData = new FormData(waybillForm);
  const receivableFees = getFeeRows("receivable");
  const payableFees = getFeeRows("payable");
  const containers = getContainerRows();
  const boxTypes = [...new Set(containers.map((item) => item.boxType).filter(Boolean))];
  const returnPoints = [...new Set(containers.map((item) => item.returnPoint).filter(Boolean))];
  const receivable = receivableFees.reduce((sum, item) => sum + item.amount, 0);
  const payable = payableFees.reduce((sum, item) => sum + item.amount, 0);
  const customer = window.CustomerManager?.getActiveCustomerByName(formData.get("customerName"));
  const route = fixedRoutes.find((item) => item.id === formData.get("routeId"));
  const newWaybill = {
    waybillNo,
    orderDate,
    routeId: formData.get("routeId") || "",
    customerId: customer?.customerNo || "-",
    customerName: String(formData.get("customerName") || "").trim(),
    billNo: String(formData.get("billNo") || "").trim() || "-",
    loadAddress: String(formData.get("loadAddress") || "").trim(),
    dispatchNo: `PC-${waybillNo.slice(-8)}`,
    dispatchDate: "-",
    containers,
    boxNo1: containers[0]?.boxNo || "-",
    sealNo1: containers[0]?.sealNo || "-",
    boxNo2: containers[1]?.boxNo || "-",
    sealNo2: containers[1]?.sealNo || "-",
    boxType: boxTypes.join(" / ") || "-",
    boxQuantity: containers.length,
    auditState: "草拟",
    needReceipt: formData.get("needReceipt") ? "是" : "否",
    receivedReceipt: formData.get("receivedReceipt") ? "是" : "否",
    receiptDate: formData.get("receiptDate"),
    remark: String(formData.get("remark") || "").trim() || "-",
    freight: payable,
    receivable,
    entryDate: orderDate,
    profit: receivable - payable,
    payable,
    carrier: "-",
    returnPoint: returnPoints.join(" / ") || "-",
    dispatchable: Boolean(formData.get("dispatchable")),
    pickupPoint1: containers[0]?.pickupPoint || "",
    pickupPoint2: containers[1]?.pickupPoint || "",
    plateNo: "",
    driverId: "",
    driverName: "",
    arrived: false,
    arrivalDate: "",
    receivableFees,
    payableFees,
  };
  waybills.unshift(newWaybill);
  if (formData.get("routeId")) waybillRouteMap[waybillNo] = formData.get("routeId");
  saveWaybills();
  createPendingDispatch(newWaybill, route);
  dispatchQueryForm.reset();
  dispatchCurrentPage = 1;
  renderDispatchPage(getFilteredDispatches());
  window.AutoDispatchManager?.refresh();
  closeWaybillForm();
  renderRows(waybills);
  resultText.textContent = `共 ${waybills.length} 条记录，已新增运单 ${waybillNo}`;
});

addDialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeWaybillForm();
});

queryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const rows = filterRows(new FormData(queryForm));
  renderRows(rows);
  resultText.textContent = `共 ${rows.length} 条记录，审核状态均为草拟`;
});

document.querySelectorAll("[data-page]").forEach((item) => {
  item.addEventListener("click", () => switchPage(item.dataset.page));
});

document.querySelectorAll(".detail-tab").forEach((tab) => {
  tab.addEventListener("click", () => switchModule(tab.dataset.module));
});

vehicleQueryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const warningDays = Number(formData.get("warningDays")) || 30;
  vehicleCurrentPage = 1;
  renderVehiclePage(filterVehicles(formData), warningDays);
});

document.querySelector("#addVehicleBtn").addEventListener("click", () => {
  openVehicleForm("create");
});

document.querySelector("#closeVehicleFormBtn").addEventListener("click", () => {
  closeVehicleForm();
});

document.querySelector("#cancelVehicleFormBtn").addEventListener("click", () => {
  closeVehicleForm();
});

vehicleForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = getVehicleFormData();
  const existingVehicle = vehicles.find((item) => item.plateNo === editingVehiclePlate);
  const duplicateVehicle = vehicles.find((item) => item.plateNo === data.plateNo && item !== existingVehicle);

  if (duplicateVehicle) {
    vehicleForm.elements.plateNo.setCustomValidity("车牌号码已存在，请确认后再保存。");
    vehicleForm.elements.plateNo.reportValidity();
    return;
  }
  vehicleForm.elements.plateNo.setCustomValidity("");

  if (vehicleFormMode === "edit" && existingVehicle) {
    const oldPlateNo = existingVehicle.plateNo;
    Object.assign(existingVehicle, data);
    if (oldPlateNo !== data.plateNo) {
      [inspectionRecords, insurancePolicies].forEach((records) => {
        records.forEach((record) => {
          if (record[0] === oldPlateNo) record[0] = data.plateNo;
        });
      });
    }
    selectedVehicle = existingVehicle;
  } else {
    vehicles.unshift(data);
    selectedVehicle = data;
  }

  vehicleCurrentPage = 1;
  closeVehicleForm();
  renderVehiclePage(getFilteredVehicles(), getWarningDays());
});

document.querySelector("#vehicleBody").addEventListener("click", (event) => {
  const detailButton = event.target.closest("[data-detail-plate]");
  const editButton = event.target.closest("[data-edit-plate]");
  const deleteButton = event.target.closest("[data-delete-plate]");
  if (detailButton) openVehicleDetail(detailButton.dataset.detailPlate);
  if (editButton) openVehicleForm("edit", editButton.dataset.editPlate);
  if (deleteButton) requestDeleteVehicle(deleteButton.dataset.deletePlate);
});

document.querySelector("#cancelDeleteVehicleBtn").addEventListener("click", () => {
  closeDeleteVehicleDialog();
});

document.querySelector("#confirmDeleteVehicleBtn").addEventListener("click", () => {
  if (deletingVehiclePlate) deleteVehicle(deletingVehiclePlate);
});

vehicleDialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeVehicleForm();
});

deleteVehicleDialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeDeleteVehicleDialog();
});

vehicleForm.elements.plateNo.addEventListener("input", () => {
  vehicleForm.elements.plateNo.setCustomValidity("");
});

vehicleDialog.addEventListener("click", (event) => {
  const bounds = vehicleDialog.getBoundingClientRect();
  const isBackdrop =
    event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
  if (isBackdrop) closeVehicleForm();
});

deleteVehicleDialog.addEventListener("click", (event) => {
  const bounds = deleteVehicleDialog.getBoundingClientRect();
  const isBackdrop =
    event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
  if (isBackdrop) closeDeleteVehicleDialog();
});

vehiclePageSizeSelect.addEventListener("change", () => {
  vehicleCurrentPage = 1;
  renderVehiclePage(getFilteredVehicles(), getWarningDays());
});

vehiclePrevPage.addEventListener("click", () => {
  vehicleCurrentPage -= 1;
  renderVehiclePage(getFilteredVehicles(), getWarningDays());
});

vehicleNextPage.addEventListener("click", () => {
  vehicleCurrentPage += 1;
  renderVehiclePage(getFilteredVehicles(), getWarningDays());
});

vehiclePageJump.addEventListener("change", () => {
  vehicleCurrentPage = Number(vehiclePageJump.value) || 1;
  renderVehiclePage(getFilteredVehicles(), getWarningDays());
});

document.querySelector("#backToVehicleListBtn").addEventListener("click", () => {
  closeVehicleDetail();
});

document.querySelector("#messageAlertBtn").addEventListener("click", () => {
  const warningDays = getWarningDays();
  const pending = vehicles
    .map((vehicle) => ({ vehicle, dueInfo: getDueInfo(vehicle, warningDays) }))
    .filter((item) => item.dueInfo.key !== "normal")
    .map((item) => `${item.vehicle.plateNo}：${item.dueInfo.label}`);

  window.alert(`车辆到期提醒\n${pending.join("\n") || "暂无待提醒车辆"}`);
});

driverQueryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  driverCurrentPage = 1;
  renderDriverPage(filterDrivers(new FormData(event.currentTarget)));
});

document.querySelector("#addDriverBtn").addEventListener("click", () => openDriverForm("create"));
document.querySelector("#closeDriverFormBtn").addEventListener("click", closeDriverForm);
document.querySelector("#cancelDriverFormBtn").addEventListener("click", closeDriverForm);
document.querySelector("#backToDriverListBtn").addEventListener("click", closeDriverDetail);

driverForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = getDriverFormData();
  const existingDriver = drivers.find((driver) => driver.id === editingDriverId);
  const duplicateIdCard = drivers.find((driver) => driver.idCard === data.idCard && driver !== existingDriver);
  if (duplicateIdCard) {
    driverForm.elements.idCard.setCustomValidity("该身份证号码已存在，请确认后再保存。");
    driverForm.elements.idCard.reportValidity();
    return;
  }
  driverForm.elements.idCard.setCustomValidity("");

  if (driverFormMode === "edit" && existingDriver) {
    if (existingDriver.certificationStatus !== "verified") data.driverState = "停用";
    else if (driverHasActiveDispatch(existingDriver.id) && data.driverState !== "停用") data.driverState = "运输中";
    Object.assign(existingDriver, data);
  } else {
    const nextDriverNumber = Math.max(1000, ...drivers.map((driver) => Number(driver.id.replace(/\D/g, "")) || 0)) + 1;
    data.id = `SJ-${nextDriverNumber}`;
    data.certificationStatus = "unverified";
    data.driverState = "停用";
    drivers.unshift(data);
    saveDriverCertification(data);
  }
  driverCurrentPage = 1;
  closeDriverForm();
  renderDriverPage(getFilteredDrivers());
});

driverBody.addEventListener("change", (event) => {
  const checkbox = event.target.closest(".driver-row-check");
  if (!checkbox) return;
  if (checkbox.checked) selectedDriverIds.add(checkbox.dataset.driverId);
  else selectedDriverIds.delete(checkbox.dataset.driverId);
  updateDriverSelection();
});

driverBody.addEventListener("click", (event) => {
  const detailButton = event.target.closest("[data-detail-driver]");
  const editButton = event.target.closest("[data-edit-driver]");
  const deleteButton = event.target.closest("[data-delete-driver]");
  const reviewButton = event.target.closest("[data-review-driver]");
  const viewCertificationButton = event.target.closest("[data-view-certification]");
  if (detailButton) openDriverDetail(detailButton.dataset.detailDriver);
  if (reviewButton) openCertificationReview(reviewButton.dataset.reviewDriver);
  if (viewCertificationButton) openCertificationReview(viewCertificationButton.dataset.viewCertification);
  if (editButton) openDriverForm("edit", editButton.dataset.editDriver);
  if (deleteButton) requestDeleteDriver(deleteButton.dataset.deleteDriver);
});

driverSelectAll.addEventListener("change", () => {
  renderedDriverIds.forEach((id) => {
    if (driverSelectAll.checked) selectedDriverIds.add(id);
    else selectedDriverIds.delete(id);
  });
  renderDriverPage(getFilteredDrivers());
});

driverPageSizeSelect.addEventListener("change", () => {
  driverCurrentPage = 1;
  renderDriverPage(getFilteredDrivers());
});

driverPrevPage.addEventListener("click", () => {
  driverCurrentPage -= 1;
  renderDriverPage(getFilteredDrivers());
});

driverNextPage.addEventListener("click", () => {
  driverCurrentPage += 1;
  renderDriverPage(getFilteredDrivers());
});

driverPageJump.addEventListener("change", () => {
  driverCurrentPage = Number(driverPageJump.value) || 1;
  renderDriverPage(getFilteredDrivers());
});

driverMoreBtn.addEventListener("click", () => driverMoreMenu.classList.toggle("open"));
document.querySelector("#exportDriverBtn").addEventListener("click", () => {
  driverMoreMenu.classList.remove("open");
  window.alert(`已准备导出 ${getFilteredDrivers().length} 条司机档案。`);
});
document.querySelector("#batchDriverStatusBtn").addEventListener("click", () => {
  driverMoreMenu.classList.remove("open");
  window.alert(selectedDriverIds.size ? `已选择 ${selectedDriverIds.size} 名司机。` : "请先勾选司机档案。");
});

document.querySelector("#cancelDeleteDriverBtn").addEventListener("click", closeDeleteDriverDialog);
document.querySelector("#confirmDeleteDriverBtn").addEventListener("click", () => {
  if (deletingDriverId) deleteDriver(deletingDriverId);
});
document.querySelector("#closeCertificationReviewBtn").addEventListener("click", closeCertificationReview);
document.querySelector("#cancelCertificationReviewBtn").addEventListener("click", closeCertificationReview);
document.querySelector("#approveCertificationBtn").addEventListener("click", () => reviewDriverCertification("verified"));
document.querySelector("#rejectCertificationBtn").addEventListener("click", () => reviewDriverCertification("rejected"));
certificationReviewNote.addEventListener("input", () => certificationReviewNote.setCustomValidity(""));

driverForm.elements.idCard.addEventListener("input", () => driverForm.elements.idCard.setCustomValidity(""));
driverDialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeDriverForm();
});
deleteDriverDialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeDeleteDriverDialog();
});
driverCertificationDialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeCertificationReview();
});

driverDialog.addEventListener("click", (event) => {
  const bounds = driverDialog.getBoundingClientRect();
  const isBackdrop =
    event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
  if (isBackdrop) closeDriverForm();
});

deleteDriverDialog.addEventListener("click", (event) => {
  const bounds = deleteDriverDialog.getBoundingClientRect();
  const isBackdrop =
    event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
  if (isBackdrop) closeDeleteDriverDialog();
});
driverCertificationDialog.addEventListener("click", (event) => {
  const bounds = driverCertificationDialog.getBoundingClientRect();
  const isBackdrop =
    event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
  if (isBackdrop) closeCertificationReview();
});

document.addEventListener("click", (event) => {
  if (!event.target.closest("#driverMoreBtn") && !event.target.closest("#driverMoreMenu")) {
    driverMoreMenu.classList.remove("open");
  }
});

routeQueryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  routeCurrentPage = 1;
  renderRoutePage(filterRoutes(new FormData(event.currentTarget)));
});

document.querySelector("#addRouteBtn").addEventListener("click", () => openRouteForm("create"));
document.querySelector("#closeRouteFormBtn").addEventListener("click", closeRouteForm);
document.querySelector("#cancelRouteFormBtn").addEventListener("click", closeRouteForm);

routeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = getRouteFormData();
  const existingRoute = fixedRoutes.find((route) => route.id === editingRouteId);
  if (routeFormMode === "edit" && existingRoute) Object.assign(existingRoute, data);
  else fixedRoutes.unshift({ id: `XL-${Date.now()}`, routeCode: getNextRouteCode(), ...data });
  routeCurrentPage = 1;
  closeRouteForm();
  renderRoutePage(getFilteredRoutes());
});

routeForm.elements.commissionType.addEventListener("change", updateRouteCommissionPreview);
routeForm.elements.estimatedRevenue.addEventListener("input", updateRouteCommissionPreview);
routeForm.elements.commissionValue.addEventListener("input", updateRouteCommissionPreview);

routeBody.addEventListener("change", (event) => {
  const checkbox = event.target.closest(".route-row-check");
  if (!checkbox) return;
  if (checkbox.checked) selectedRouteIds.add(checkbox.dataset.routeId);
  else selectedRouteIds.delete(checkbox.dataset.routeId);
  updateRouteSelection();
});

routeBody.addEventListener("click", (event) => {
  const editButton = event.target.closest("[data-edit-route]");
  const deleteButton = event.target.closest("[data-delete-route]");
  if (editButton) openRouteForm("edit", editButton.dataset.editRoute);
  if (deleteButton) requestDeleteRoute(deleteButton.dataset.deleteRoute);
});

routeSelectAll.addEventListener("change", () => {
  renderedRouteIds.forEach((id) => {
    if (routeSelectAll.checked) selectedRouteIds.add(id);
    else selectedRouteIds.delete(id);
  });
  renderRoutePage(getFilteredRoutes());
});

routePageSizeSelect.addEventListener("change", () => {
  routeCurrentPage = 1;
  renderRoutePage(getFilteredRoutes());
});
routePrevPage.addEventListener("click", () => {
  routeCurrentPage -= 1;
  renderRoutePage(getFilteredRoutes());
});
routeNextPage.addEventListener("click", () => {
  routeCurrentPage += 1;
  renderRoutePage(getFilteredRoutes());
});
routePageJump.addEventListener("change", () => {
  routeCurrentPage = Number(routePageJump.value) || 1;
  renderRoutePage(getFilteredRoutes());
});

routeMoreBtn.addEventListener("click", () => routeMoreMenu.classList.toggle("open"));
document.querySelector("#exportRouteBtn").addEventListener("click", () => {
  routeMoreMenu.classList.remove("open");
  window.alert(`已准备导出 ${getFilteredRoutes().length} 条固定线路。`);
});
document.querySelector("#batchRouteStateBtn").addEventListener("click", () => {
  routeMoreMenu.classList.remove("open");
  window.alert(selectedRouteIds.size ? `已选择 ${selectedRouteIds.size} 条线路。` : "请先勾选线路档案。");
});

document.querySelector("#cancelDeleteRouteBtn").addEventListener("click", closeDeleteRouteDialog);
document.querySelector("#confirmDeleteRouteBtn").addEventListener("click", () => {
  if (deletingRouteId) deleteRoute(deletingRouteId);
});
routeDialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeRouteForm();
});
deleteRouteDialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeDeleteRouteDialog();
});
routeDialog.addEventListener("click", (event) => {
  const bounds = routeDialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeRouteForm();
});
deleteRouteDialog.addEventListener("click", (event) => {
  const bounds = deleteRouteDialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeDeleteRouteDialog();
});

document.addEventListener("click", (event) => {
  if (!event.target.closest("#routeMoreBtn") && !event.target.closest("#routeMoreMenu")) routeMoreMenu.classList.remove("open");
});

document.querySelector("#waybillRouteSelect").addEventListener("change", (event) => {
  fillWaybillFromRoute(event.target.value);
});
waybillForm.elements.customerName.addEventListener("input", fillWaybillFromCustomer);
waybillForm.elements.customerName.addEventListener("change", fillWaybillFromCustomer);

dispatchQueryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  dispatchCurrentPage = 1;
  renderDispatchPage(filterDispatches(new FormData(event.currentTarget)));
});

document.querySelector("#dispatchStats").addEventListener("click", (event) => {
  const button = event.target.closest("[data-dispatch-mode]");
  if (!button) return;
  dispatchQueryForm.reset();
  dispatchQueryForm.elements.dispatchMode.value = button.dataset.dispatchMode;
  dispatchCurrentPage = 1;
  renderDispatchPage(getFilteredDispatches());
});

dispatchQueryForm.elements.dispatchMode.addEventListener("change", () => {
  dispatchCurrentPage = 1;
  renderDispatchPage(getFilteredDispatches());
});

document.querySelector("#addDispatchBtn").addEventListener("click", openDispatchForm);
document.querySelector("#closeDispatchFormBtn").addEventListener("click", closeDispatchForm);
document.querySelector("#cancelDispatchFormBtn").addEventListener("click", closeDispatchForm);
document.querySelector("#dispatchWaybillSelect").addEventListener("change", updateDispatchFormFromWaybill);

dispatchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const waybill = waybills.find((item) => item.waybillNo === dispatchForm.elements.waybillId.value);
  const driver = drivers.find((item) => item.id === dispatchForm.elements.driverId.value);
  const vehicle = vehicles.find((item) => item.plateNo === dispatchForm.elements.vehicleId.value);
  const route = waybill ? getRouteForWaybill(waybill.waybillNo) : null;
  const driverIsAvailable = driver && availableOwnDrivers().some((item) => item.id === driver.id);
  if (!waybill || !driver || !vehicle || !route || !driverIsAvailable) return;
  const dispatchTime = window.DispatchStore.nowText();

  const assigned = {
    dispatchMode: "manual",
    waybillNo: waybill.waybillNo,
    orderDate: waybill.orderDate,
    routeId: route.id,
    routeName: route.routeName,
    origin: route.origin,
    destination: route.destination,
    loadAddress: waybill.loadAddress,
    dispatchTime,
    driverId: driver.id,
    driverName: driver.name,
    phone: driver.phone,
    vehicleId: vehicle.plateNo,
    status: "已派单",
    currentNode: "待提货",
    boxes: formatWaybillBoxes(waybill),
    estimatedRevenue: route.estimatedRevenue,
    commission: calculateRouteCommission(route),
    note: dispatchForm.elements.note.value.trim(),
    pushed: true,
    timeline: [{ node: "已派单", time: dispatchTime, desc: "派单已推送至司机微信小程序", photos: [] }],
  };
  const pending = dispatches.find((item) => item.waybillNo === waybill.waybillNo && item.status === "待派单");
  if (pending) Object.assign(pending, assigned);
  else dispatches.unshift({ id: `PD-${Date.now()}`, ...assigned });
  driver.driverState = "运输中";
  waybill.dispatchDate = dispatchTime.slice(0, 10);
  waybill.plateNo = vehicle.plateNo;
  waybill.driverId = driver.id;
  waybill.driverName = driver.name;
  saveWaybills();
  saveDispatches();
  window.AutoDispatchManager?.refresh();
  renderRows(filterRows(new FormData(queryForm)));
  dispatchCurrentPage = 1;
  closeDispatchForm();
  dispatchQueryForm.reset();
  dispatchQueryForm.elements.dispatchMode.value = "manual";
  renderDispatchPage(getFilteredDispatches());
});

dispatchBody.addEventListener("change", (event) => {
  const checkbox = event.target.closest(".dispatch-row-check");
  if (!checkbox) return;
  if (checkbox.checked) selectedDispatchIds.add(checkbox.dataset.dispatchId);
  else selectedDispatchIds.delete(checkbox.dataset.dispatchId);
  updateDispatchSelection();
});

dispatchBody.addEventListener("click", (event) => {
  const viewButton = event.target.closest("[data-view-dispatch]");
  const revokeButton = event.target.closest("[data-revoke-dispatch]");
  if (viewButton) openDispatchDetail(viewButton.dataset.viewDispatch);
  if (revokeButton) requestRevokeDispatch(revokeButton.dataset.revokeDispatch);
});

dispatchSelectAll.addEventListener("change", () => {
  renderedDispatchIds.forEach((id) => {
    if (dispatchSelectAll.checked) selectedDispatchIds.add(id);
    else selectedDispatchIds.delete(id);
  });
  renderDispatchPage(getFilteredDispatches());
});

dispatchPageSizeSelect.addEventListener("change", () => {
  dispatchCurrentPage = 1;
  renderDispatchPage(getFilteredDispatches());
});
dispatchPrevPage.addEventListener("click", () => {
  dispatchCurrentPage -= 1;
  renderDispatchPage(getFilteredDispatches());
});
dispatchNextPage.addEventListener("click", () => {
  dispatchCurrentPage += 1;
  renderDispatchPage(getFilteredDispatches());
});
dispatchPageJump.addEventListener("change", () => {
  dispatchCurrentPage = Number(dispatchPageJump.value) || 1;
  renderDispatchPage(getFilteredDispatches());
});

dispatchMoreBtn.addEventListener("click", () => dispatchMoreMenu.classList.toggle("open"));
document.querySelector("#exportDispatchBtn").addEventListener("click", () => {
  dispatchMoreMenu.classList.remove("open");
  window.alert(`已准备导出 ${getFilteredDispatches().length} 条派单台账。`);
});
document.querySelector("#batchDispatchStatusBtn").addEventListener("click", () => {
  dispatchMoreMenu.classList.remove("open");
  window.alert(selectedDispatchIds.size ? `已选择 ${selectedDispatchIds.size} 条派单。` : "请先勾选派单记录。");
});

document.querySelector("#closeDispatchDetailBtn").addEventListener("click", () => {
  if (dispatchDetailDialog.open) dispatchDetailDialog.close();
});
document.querySelector("#cancelRevokeDispatchBtn").addEventListener("click", closeRevokeDispatchDialog);
document.querySelector("#confirmRevokeDispatchBtn").addEventListener("click", () => {
  if (deletingDispatchId) revokeDispatch(deletingDispatchId);
});

dispatchDialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeDispatchForm();
});
dispatchDetailDialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  dispatchDetailDialog.close();
});
revokeDispatchDialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeRevokeDispatchDialog();
});

document.addEventListener("click", (event) => {
  if (!event.target.closest("#dispatchMoreBtn") && !event.target.closest("#dispatchMoreMenu")) dispatchMoreMenu.classList.remove("open");
});

window.addEventListener("storage", (event) => {
  if (event.key === DRIVER_CERTIFICATION_STORAGE_KEY) {
    loadDriverCertifications();
    syncDriverOperationalStates();
    renderDriverPage(getFilteredDrivers());
    if (driverCertificationDialog.open && reviewingDriverId) {
      const driverId = reviewingDriverId;
      closeCertificationReview();
      openCertificationReview(driverId);
    }
    return;
  }
  if (event.key !== window.DispatchStore.STORAGE_KEY) return;
  window.DispatchStore.replace(dispatches, window.DispatchStore.load(dispatchSeed));
  syncDriverOperationalStates();
  renderDispatchPage(getFilteredDispatches());
  renderDriverPage(getFilteredDrivers());
  window.AutoDispatchManager?.refresh();
  if (dispatchDetailDialog.open) dispatchDetailDialog.close();
});

window.addEventListener("message", (event) => {
  const message = event.data;
  if (!message || typeof message !== "object") return;
  if (message.type === "dispatch-sync-request") {
    event.source?.postMessage({ type: "dispatch-sync-data", dispatches }, "*");
  }
  if (message.type === "dispatch-update" && Array.isArray(message.dispatches)) {
    window.DispatchStore.replace(dispatches, message.dispatches);
    syncDriverOperationalStates();
    saveDispatches();
    renderDispatchPage(getFilteredDispatches());
    renderDriverPage(getFilteredDrivers());
    window.AutoDispatchManager?.refresh();
    event.source?.postMessage({ type: "dispatch-sync-data", dispatches }, "*");
  }
});

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState !== "visible") return;
  window.DispatchStore.replace(dispatches, window.DispatchStore.load(dispatchSeed));
  syncDriverOperationalStates();
  renderDispatchPage(getFilteredDispatches());
  renderDriverPage(getFilteredDrivers());
  window.AutoDispatchManager?.refresh();
});
