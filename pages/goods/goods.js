// pages/goods/goods.js
import api from "../../utils/api.js";
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //页面切换
    currentIndex1: true, //待入仓
    currentIndex2: false, //在仓
    currentIndex3: false, //出仓
    currentIndex4: false, //已完成
    
    loadNum: 0,   // 待取货的配送单数量
    outNum: 0,    // 配送中的配送单数量
    finishNum: 0, // 已完成的配送单数量
    hiddenNum: 0, // 删除/隐藏的配送单数量

    loadList: [],      // 待取货
    onList: [],        // 配送中
    finishList: [],    // 已完成
    hiddenList: [],    // 删除/隐藏
    driverId: '',      // 驾驶员工号
    //checkbox是否显示
    isCheckbox: false,
    //是否全选
    select_all: false,
    //待入仓数据
    // loadList: [
    //   { id: 1, num: "D19060122", time: "2019-03-02" },
    //   { id: 2, num: "D19060123", time: "2019-03-02" }
    // ],
    //在仓数据
    // inList: [
    //   { id: 1, num: "A19060122", time: "2019-03-02" },
    //   { id: 2, num: "A19060123", time: "2019-03-02" },
    //   { id: 3, num: "A19060124", time: "2019-03-02" },
    //   { id: 4, num: "A19060124", time: "2019-03-02" },
    // ],
    //出仓数据
    // outList: [
    //   { id: 1, num: "A19060125", time: "2019-03-02" },
    //   { id: 2, num: "A19060126", time: "2019-03-02" },
    //   { id: 3, num: "A19060127", time: "2019-03-02" },
    //   { id: 4, num: "A19060127", time: "2019-03-02" },
    // ],
    //已完成数据
    
    /*
    loadList: [{
        "id": "A19060121",
        "warehouse": "沪华东路基地",
        "market": "联华超市（丰店）",
        "time": "2020-01-01 09:34:23",
        "address": "普陀区宜君路与黄陵路交叉口西北50米",
        "lng": 119.713753,
        "lat": 29.104773
      },
      {
        "id": "A19060122",
        "warehouse": "现代物流",
        "market": "联华超市（欧阳店）",
        "time": "2020-01-01 09:34:23",
        "address": "普陀区雪松路358号",
        "lng": 119.701172,
        "lat": 29.092951
      },
      {
        "id": "A19060123",
        "warehouse": "全方新桥配送中心",
        "market": "联华超市（友谊店）",
        "time": "2020-01-01 09:34:23",
        "address": "崇明区凤凰街198号",
        "lng": 119.69311,
        "lat": 29.09914
      }
    ],
    onList: [{
        "id": "A19060124",
        "warehouse": "沪华东路基地",
        "market": "联华超市（水丰店）",
        "time": "2020-01-01 09:34:23",
        "address": "宝山区友谊路164号",
        "lng": 119.659271,
        "lat": 29.098244
      },
      {
        "id": "A19060125",
        "warehouse": "沪华东路基地",
        "market": "联华超市（火丰店）",
        "time": "2020-01-08 09:34:23",
        "address": "长宁区虹桥路1023号",
        "lng": 119.664482,
        "lat": 29.09337
      }
    ],
    finishList: [{
        "id": "A19060126",
        "warehouse": "沪华东路基地",
        "market": "联华超市（浦东店）",
        "time": "2020-01-01 09:34:23",
        "address": "闵行区景谷路162-166号",
        "lng": 119.499031,
        "lat": 29.004316
      },
      {
        "id": "A19060127",
        "warehouse": "新桥基地",
        "market": "联华超市（水店）",
        "time": "2020-01-08 09:34:23",
        "address": "普陀区雪松路358号",
        "lng": 119.687492,
        "lat": 29.138479
      },
      {
        "id": "A19060128",
        "warehouse": "沪华东路基地",
        "market": "快客（浦东新区店）",
        "time": "2020-01-01 09:34:23",
        "address": "浦东新区锦绣路2466弄60号",
        "lng": 119.629829,
        "lat": 29.199953
      },
      {
        "id": "A19060129",
        "warehouse": "沪华东路基地",
        "market": "联华超市（丰店）",
        "time": "2020-01-08 09:34:23",
        "address": "浦东新区唐镇新雅东路29号",
        "lng": 119.600601,
        "lat": 29.121239
      }
    ],
    */

    //在仓的导航栏样式
    kong2: false
  },
  //待入仓
  currentIndex1: function(e) {
    // this.onShow()
    this.setData({
      kong2: false,
      currentIndex1: true,
      currentIndex2: false,
      currentIndex3: false,
      currentIndex4: false
    })
  },
  //在仓
  currentIndex2: function(e) {
    // this.onShow(),
    this.setData({
      kong2: true,
      currentIndex1: false,
      currentIndex2: true,
      currentIndex3: false,
      currentIndex4: false
    })
  },
  //出仓
  currentIndex3: function(e) {
    // this.onShow()
    this.setData({
      kong2: false,
      currentIndex1: false,
      currentIndex2: false,
      currentIndex3: true,
      currentIndex4: false
    })
  },
  //已完成
  currentIndex4: function(e) {
    // this.onShow()
    this.setData({
      kong2: false,
      currentIndex1: false,
      currentIndex2: false,
      currentIndex3: false,
      currentIndex4: true
    })
  },
  onLoad: function () {
    getApp().globalData.that = this
    getApp().setWatcher(getApp().globalData.header, this)
    if (getApp().globalData.header.Cookie != '') {
      this.data.driverId = getApp().globalData.header.id
      this.getData()
    } else {
      this.setData({
        loadList: [],
        onList: [],
        finishList: [],
        hiddenList: [],

        loadNum: 0,
        outNum: 0,
        finishNum: 0,
        hiddenNum: 0,
      })
    }
  },
  watch: {
    Cookie: (newValue) => {
      console.log('【监听】cookie 改变。', newValue);
      // console.log(getApp().globalData.that)
      if (newValue == '') {
        getApp().globalData.that.setData({
          loadList: [],
          onList: [],
          finishList: [],
          hiddenList: [],

          loadNum: 0,
          outNum: 0,
          finishNum: 0,
          hiddenNum: 0,
        })
        console.log('【清空】订单列表。');
      } else {
        console.log('【刷新】订单列表。');
        getApp().globalData.that.getData()
      }
    },
  },
  // 请求数据
  getData: function () {
    let that = this;
    let load_list = [], delivery_list = [], finish_list = [];
    // console.log('----------@,', getApp().globalData.header.Cookie)
    wx.request({
      url: api.ordersView,
      header: getApp().globalData.header,
      method: 'GET',
      data: {
        id: that.data.driverId
      },
      success: function (res) {
        console.log('All orders：', res);
        if (res.success == 0) {
          res = res.data;
          for (let order of res) {
            switch (order.state) {
              case 0:
                load_list.push(order);
                break;
              case 1:
                delivery_list.push(order);
                // console.log(1, order);
                break;
              case 2:
                finish_list.push(order);
                // console.log(2, order);
                break;
              case 3:
                // 删除/隐藏状态
                // console.log(3, order);
                break;
              default:
                console.log("There is something wrong with the state of the orders.");
            }
          }
          that.setData({
            loadList: load_list,
            onList: delivery_list,
            finishList: finish_list,

            loadNum: load_list.length,
            outNum: delivery_list.length,
            finishNum: finish_list.length,
          })
        } else {
          console.log(res.message);
          wx.showToast({
            title: '请重试！',
            icon: 'none',
            duration: 2000
          })
          wx.hideToast()
        }
      },
      fail: function () {
        wx.showToast({
          title: '无法连接到服务器！',
          icon: 'none',
          duration: 2000
        })
        wx.hideToast()
        console.log("server: no service.")
      }
    })
  },
  //点击在仓下的取回物品
  inGetBack(e) {
    // console.log(e.currentTarget.id)
    //设置全局对象

    app.requestId = e.currentTarget.id
    wx.navigateTo({
      url: '../inGetBack/inGetBack?id=' + e.currentTarget.id,
    })
  },
  //点击待入仓的修改信息
  loadEdit() {
    wx.navigateTo({
      url: '../loadEdit/loadEdit',
    })
  },
  //点击已完成的查看详情
  finishLook() {
    wx.navigateTo({
      url: '../finishDetails/finishDetails',
    })
  },
  //点击已完成的查看详情
  outLook() {
    wx.navigateTo({
      url: '../outDetails/outDetails',
    })
  },
  //查看详情，详情页显示内容的传参接口，需要的都从这儿传
  loadDetails(e) {
    // this.requestId = e.currentTarget.id
    // console.log(e.currentTarget.id)
    let index = e.currentTarget.dataset.index
    let a = this.data.loadList[index]
    console.log(a)
    wx.navigateTo({
      url: '../details/details?id=' + a.id + "&time=" + a.time + "&market=" + a.market + "&address=" + a.address + "&warehouse=" + a.warehouse + "&tel=" + a.tel + "&state=" + a.state
    })
  },

  onDetails(e) {
    // this.requestId = e.currentTarget.id
    // console.log(e.currentTarget.id)
    let index = e.currentTarget.dataset.index
    console.log(index)
    let a = this.data.onList[index]
    console.log(a)
    wx.navigateTo({
      url: '../details/details?id=' + a.id + "&time=" + a.time + "&market=" + a.market + "&address=" + a.address + "&warehouse=" + a.warehouse + "&tel=" + a.tel + "&state=" + a.state
    })
  },

  finishDetails(e) {
    // this.requestId = e.currentTarget.id
    // console.log(e.currentTarget.id)
    let index = e.currentTarget.dataset.index
    let a = this.data.finishList[index]
    console.log(a)
    wx.navigateTo({
      url: '../details/details?id=' + a.id + "&time=" + a.time + "&market=" + a.market + "&address=" + a.address + "&warehouse=" + a.warehouse + "&tel=" + a.tel + "&state=" + a.state
    })
  },

  toMapLoad(e) {
    let index = e.currentTarget.dataset.index
    let dispatch = this.data.loadList[index]
    let plugin = requirePlugin('myPlugin');
    let key = '3BGBZ-YDME6-UPPSK-EIC7O-NLVLZ-A2FDX'; //使用在腾讯位置服务申请的key
    let referer = 'wxbd01dc5b31432f51'; //调用插件的小程序的名称
    let endPoint = JSON.stringify({ //终点
      'name': dispatch.address,
      'latitude': dispatch.lat,
      'longitude': dispatch.lng
    });

    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log("res.longitude,res.latitude", res.longitude, res.latitude, )
        let startPoint = JSON.stringify({ //起点
          'name': '我的位置',
          'latitude': res.latitude,
          'longitude': res.longitude
        });
        wx.navigateTo({
          url: 'plugin://myPlugin/route-plan?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint + "&navigation=1"
        });
      },
      fail: function() {
        wx.getSetting({
          success: function(res) {
            var statu = res.authSetting;
            if (!statu['scope.userLocation']) {
              wx.showModal({
                title: '是否授权当前位置',
                content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
                success: function(tip) {
                  console.log(1)
                  if (tip.confirm) {
                    console.log(1)
                    wx.openSetting({
                      success: function(data) {
                        if (data.authSetting["scope.userLocation"] === true) {
                          wx.showToast({
                            title: '授权成功',
                            icon: 'success',
                            duration: 1000
                          })
                          wx.getLocation({
                            success(res) {
                              let startPoint = JSON.stringify({ //起点
                                'name': '我的位置',
                                'latitude': res.latitude,
                                'longitude': res.longitude
                              });
                              wx.navigateTo({
                                url: 'plugin://myPlugin/route-plan?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint + "&navigation=1"
                              });
                            },
                          });
                        } else {
                          wx.showToast({
                            title: '授权失败',
                            icon: 'success',
                            duration: 1000
                          })
                          wx.navigateBack({
                            delta: -1
                          });
                        }
                      }
                    })
                  } else {
                    wx.navigateBack({
                      delta: -1
                    });
                  }
                }
              })
            }
          },
          fail: function(res) {
            wx.showToast({
              title: '调用授权窗口失败',
              icon: 'success',
              duration: 1000
            })
            wx.navigateBack({
              delta: -1
            });
          }
        })
      }
    })
  },

  toMapOn(e) {
    let index = e.currentTarget.dataset.index
    let dispatch = this.data.onList[index]
    let plugin = requirePlugin('myPlugin');
    let key = '3BGBZ-YDME6-UPPSK-EIC7O-NLVLZ-A2FDX'; //使用在腾讯位置服务申请的key
    let referer = 'wxbd01dc5b31432f51'; //调用插件的小程序的名称
    let endPoint = JSON.stringify({ //终点
      'name': dispatch.address,
      'latitude': dispatch.lat,
      'longitude': dispatch.lng
    });
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log("res.longitude,res.latitude", res.longitude, res.latitude)
        let startPoint = JSON.stringify({ //起点
          'name': '我的位置',
          'latitude': res.latitude,
          'longitude': res.longitude
        });
      }
    })

    wx.navigateTo({
      url: 'plugin://myPlugin/route-plan?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint + "&navigation=1"
    });
    // wx.navigateTo({
    //   url: '../map/map?lat=' + a.lat + "&lng=" + a.lng,
    // })
  },

  //在仓查看详情
  inDetails() {
    wx.navigateTo({
      url: '../inDetails/inDetails',
    })
  },
  //在仓延期
  delay() {
    wx.navigateTo({
      url: '../delay/delay',
    })
  },
  //点击管理
  guanli() {
    var isCheckboxs = !this.data.isCheckbox
    this.setData({
      isCheckbox: isCheckboxs
    })
  },
  //全选与反全选
  selectall: function() {
    var that = this;
    for (let i = 0; i < that.data.inList.length; i++) {
      that.data.inList[i].checked = !that.data.select_all
    }
    that.setData({
      inList: that.data.inList,
      select_all: (!that.data.select_all)
    })
  },
  /*
  //删除订单
  delOrder(e) {
    var finishList = this.data.finishList
    var finishList = finishList.filter((v, i) => {
      return v.num !== e.target.id
    })
    this.setData({
      finishList: finishList
    })
  },
  */
  //页面卸载
  onHide: function() {
    this.setData({
      isCheckbox: false,
      select_all: false,
      kong2: false
    })
  },
  // btn: 完成取货
  orderLoad: function (e) {
    let that = this;
    wx.request({
      url: api.ordersLoad,
      header: getApp().globalData.header,
      method: 'POST',
      data: {
        id: e.target.id,
      },
      success: function (res) {
        wx.showModal({
          title: '提示',
          content: '请确认已完成取货。',
          success: function (data) {
            if (data.confirm) {
              if (res.success == 0) {
                let loadList = that.data.loadList
                let tmpLoad = loadList.filter((v, i) => {
                  return v.id != e.target.id
                });
                let onList = that.data.onList;
                let tmpOn = loadList.filter((v, i) => {
                  return v.id == e.target.id
                });
                tmpOn[0].state = 1;
                onList.push(tmpOn[0]);
                // console.log(tmp)
                that.setData({
                  loadList: tmpLoad,
                  onList: onList,
                  loadNum: tmpLoad.length,
                  outNum: onList.length
                })
              }
            } 
          }
        })
      },
      fail: function () {
        wx.showToast({
          title: '无法连接到服务器！',
          icon: 'fail',
          duration: 2000
        })
        wx.hideToast()
        console.log("server: no service.")
      }
    })
  },
  // btn：完成配送
  orderFinish: function (e) {
    let that = this;
    wx.request({
      url: api.ordersFinish,
      header: getApp().globalData.header,
      method: 'POST',
      data: {
        id: e.target.id,
      },
      success: function (res) {
        wx.showModal({
          title: '提示',
          content: '请确认已取货。',
          success: function (data) {
            if (data.confirm) {
              if (res.success == 0) {
                let onList = that.data.onList
                let tmpOnList = onList.filter((v, i) => {
                  return v.id != e.target.id
                });
                let finishList = that.data.finishList;
                let tmp = onList.filter((v, i) => {
                  return v.id == e.target.id
                });
                tmp[0].state = 2;
                finishList.push(tmp[0]);
                // console.log(tmp)
                that.setData({
                  onList: tmpOnList,
                  finishList: finishList,
                  outNum: tmpOnList.length,
                  finishNum: finishList.length
                })
                // console.log('order finished.');
              }
            } 
          }
        })
      },
      fail: function () {
        wx.showToast({
          title: '无法连接到服务器！',
          icon: 'fail',
          duration: 2000
        })
        wx.hideToast()
        console.log("server: no service.")
      }
    })
  },
  // btn: 删除/隐藏订单
  orderDelete: function (e) {
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确认删除配送单？',
      success: function (data) {
        if (data.confirm) {
          wx.request({
            url: api.ordersHidden,
            header: getApp().globalData.header,
            method: 'POST',
            data: {
              id: e.target.id,
            },
            success: function (res) {
              if (res.success == 0) {
                let finishList = that.data.finishList;
                let tmpfinish = finishList.filter((v, i) => {
                  return v.id != e.target.id
                });
                let hiddenList = that.data.hiddenList
                let tmpHidden = finishList.filter((v, i) => {
                  return v.id == e.target.id
                });
                tmpHidden[0].state = 3;
                hiddenList.push(tmpHidden[0]);
                that.setData({
                  finishList: tmpfinish,
                  hiddenList: hiddenList,
                  finishNum: tmpfinish.length,
                  hiddenNum: hiddenList.length
                })
              }
            },
            fail: function () {
              wx.showToast({
                title: '无法连接到服务器！',
                icon: 'fail',
                duration: 2000
              })
              wx.hideToast()
              console.log("server: no service.")
            }
          })
        } 
      }
    })
  },
})