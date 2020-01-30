var server = 'https://mock-wuliu.com/';
var api = {
  ordersView: server + "delivery/view",
  ordersLoad: server + "delivery/load",
  ordersFinish: server + "delivery/finish",
  ordersHidden: server + "delivery/hidden",

  driversCertify: server + "drivers/certify",
  driversEdit: server + "drivers/edit"
};

export default api;