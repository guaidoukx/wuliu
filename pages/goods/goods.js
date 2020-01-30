// pages/goods/goods.js
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

    loadNum: 3, //待入仓个数
    // inNum: 3, //在仓个数
    outNum: 2, //出仓个数
    finishNum: 4, //已完成个数
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
    loadList: [{
        "dispatch_id": "A19060121",
        "warehouse": "沪华东路基地",
        "market": "联华超市（丰店）",
        "time": "2020-01-01 09:34:23",
        "address": "普陀区宜君路与黄陵路交叉口西北50米",
        "lng": 119.713753,
        "lat": 29.104773
      },
      {
        "dispatch_id": "A19060122",
        "warehouse": "现代物流",
        "market": "联华超市（欧阳店）",
        "time": "2020-01-01 09:34:23",
        "address": "普陀区雪松路358号",
        "lng": 119.701172,
        "lat": 29.092951
      },
      {
        "dispatch_id": "A19060123",
        "warehouse": "全方新桥配送中心",
        "market": "联华超市（友谊店）",
        "time": "2020-01-01 09:34:23",
        "address": "崇明区凤凰街198号",
        "lng": 119.69311,
        "lat": 29.09914
      }
    ],
    onList: [{
        "dispatch_id": "A19060124",
        "warehouse": "沪华东路基地",
        "market": "联华超市（水丰店）",
        "time": "2020-01-01 09:34:23",
        "address": "宝山区友谊路164号",
        "lng": 119.659271,
        "lat": 29.098244
      },
      {
        "dispatch_id": "A19060125",
        "warehouse": "沪华东路基地",
        "market": "联华超市（火丰店）",
        "time": "2020-01-08 09:34:23",
        "address": "长宁区虹桥路1023号",
        "lng": 119.664482,
        "lat": 29.09337
      }
    ],
    finishList: [{
        "dispatch_id": "A19060126",
        "warehouse": "沪华东路基地",
        "market": "联华超市（浦东店）",
        "time": "2020-01-01 09:34:23",
        "address": "闵行区景谷路162-166号",
        "lng": 119.499031,
        "lat": 29.004316
      },
      {
        "dispatch_id": "A19060127",
        "warehouse": "新桥基地",
        "market": "联华超市（水店）",
        "time": "2020-01-08 09:34:23",
        "address": "普陀区雪松路358号",
        "lng": 119.687492,
        "lat": 29.138479
      },
      {
        "dispatch_id": "A19060128",
        "warehouse": "沪华东路基地",
        "market": "快客（浦东新区店）",
        "time": "2020-01-01 09:34:23",
        "address": "浦东新区锦绣路2466弄60号",
        "lng": 119.629829,
        "lat": 29.199953
      },
      {
        "dispatch_id": "A19060129",
        "warehouse": "沪华东路基地",
        "market": "联华超市（丰店）",
        "time": "2020-01-08 09:34:23",
        "address": "浦东新区唐镇新雅东路29号",
        "lng": 119.600601,
        "lat": 29.121239
      }
    ],
    //配送数据

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
  //待取货查看详情
  loadDetails(e) {
    // this.requestId = e.currentTarget.dispatch_id
    // console.log(e.currentTarget.dispatch_id)
    let index = e.currentTarget.dataset.index
    let a = this.data.loadList[index]
    console.log(a)
    wx.navigateTo({
      url: '../details/details?dispatch_id=' + a.dispatch_id + "&time=" + a.time + "&market=" + a.market + "&address=" + a.address + "&warehouse=" + a.warehouse + "&tel=" + a.tel
    })
  },

  onDetails(e) {
    // this.requestId = e.currentTarget.dispatch_id
    // console.log(e.currentTarget.dispatch_id)
    let index = e.currentTarget.dataset.index
    console.log(index)
    let a = this.data.onList[index]
    console.log(a)
    wx.navigateTo({
      url: '../details/details?dispatch_id=' + a.dispatch_id + "&time=" + a.time + "&market=" + a.market + "&address=" + a.address + "&warehouse=" + a.warehouse + "&tel=" + a.tel
    })
  },

  finishDetails(e) {
    // this.requestId = e.currentTarget.dispatch_id
    // console.log(e.currentTarget.dispatch_id)
    let index = e.currentTarget.dataset.index
    let a = this.data.finishList[index]
    console.log(a)
    wx.navigateTo({
      url: '../details/details?dispatch_id=' + a.dispatch_id + "&time=" + a.time + "&market=" + a.market + "&address=" + a.address + "&warehouse=" + a.warehouse + "&tel=" + a.tel
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
  //页面卸载
  onHide: function() {
    this.setData({
      isCheckbox: false,
      select_all: false,
      kong2: false
    })
  },
})