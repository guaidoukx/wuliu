var server = 'https://mock-wuliu.com/';
// var server = 'http://10.141.209.224:5050/';
var api = {
  orderHistory: server + "history/history",
  orderAll: server + "history/all",
  ordersView: server + "delivery/view",
  ordersLoad: server + "delivery/load",
  ordersFinish: server + "delivery/finish",
  ordersHidden: server + "delivery/hidden",

  driversCertify: server + "drivers/certify",
  driversEdit: server + "drivers/edit",
  driversEditName: server + "drivers/name",
  driversEditTel: server + "drivers/tel",
  driversEditNumber: server + "drivers/number",
};

export default api;