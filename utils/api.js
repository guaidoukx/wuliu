var server = 'https://mock-wuliu.com/';
var api = {
  orderHistory: server + "delivery/history",
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