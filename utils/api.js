let server = 'https://mock-wuliu.com/';
// let server = 'http://10.141.209.224:5050/';
let wsServer = 'ws://mock-wuliu.com/';
// let wsServer = 'ws://10.141.209.224/';
var api = {
  orderHistory: server + "history/history",
  orderAll: server + "history/all",
  ordersNew: server + "delivery/new",
  ordersView: server + "delivery/view",
  ordersLoad: server + "delivery/load",
  ordersFinish: server + "delivery/finish",
  ordersHidden: server + "delivery/hidden",

  driversCertify: server + "drivers/certify",
  driversEdit: server + "drivers/edit",
  driversEditName: server + "drivers/name",
  driversEditTel: server + "drivers/tel",
  driversEditNumber: server + "drivers/number",

  wsView: wsServer + "ws/view",
  wsOrderNew: wsServer + "ws/new"
};

export default api;