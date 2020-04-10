//app.js
//"appid": "wxbd01dc5b31432f51",
import api from "./utils/api.js";
let socketMsgQueue = [] // 消息队列（消息请求前，判断连接是否可用，可用直接发消息，否则进入队列）
let isLoading = false
App({
  onLaunch: function () {

    wx.getSystemInfo({
      success: (res) => {
        this.globalData.statusBarHeight = res.statusBarHeight
        console.log('statusBarHeight' + JSON.stringify(res))
      }
    })

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  globalData: {
    userInfo: null,
    statusBarHeight: '',
    navigationBarHeight: '',
    xyl:2343,
    header: { // store sessionId
      'Cookie': wx.getStorageSync('sessionId')
    },
    driverInfo: {
      'id': wx.getStorageSync('driverId'),
      'name': wx.getStorageSync('driverName'),
      'tel': wx.getStorageSync('driverTel'),
      'number': wx.getStorageSync('driverNumber'),
    },
    onList: [],
    loadList: [],
    that: '',
    localSocket: {}, // Websocket对象，表示全局的连接
    callback: function () { } // 每个页面初始化时，更新此回调函数
  },

  /**
   * websocket
   */
  showLoad() {
    if (!isLoading) {
      wx.showLoading({
        title: '请稍后...',
      })
      isLoading = true
    }
  },
  hideLoad() {
    wx.hideLoading()
    isLoading = false
  },
  /*initSocket() {
    let that = this
    that.globalData.localSocket = wx.connectSocket({
      // url: 'wss://test.enzhico.net/app'
      url: api.wsView,
      header: {
        'content-type': 'application/json'
      },
    })
    that.showLoad()
    that.globalData.localSocket.onOpen(function (res) {
      console.log('WebSocket连接已打开！readyState=' + that.globalData.localSocket.readyState)
      that.hideLoad()
      while (socketMsgQueue.length > 0) {
        var msg = socketMsgQueue.shift();
        that.sendSocketMessage(msg);
      }
    })
    that.globalData.localSocket.onMessage(function (res) {
      that.hideLoad()
      that.globalData.callback(res)
    })
    that.globalData.localSocket.onError(function (res) {
      console.log('readyState=' + that.globalData.localSocket.readyState)
    })
    that.globalData.localSocket.onClose(function (res) {
      console.log('WebSocket连接已关闭！readyState=' + that.globalData.localSocket.readyState)
      that.initSocket()
    })
  },*/
  //统一发送消息
  sendSocketMessage: function (msg) {
    if (this.globalData.localSocket.readyState === 1) {
      this.showLoad()
      this.globalData.localSocket.send({
        data: JSON.stringify(msg)
      })
    } else {
      socketMsgQueue.push(msg)
    }
  },
  onShow: function (options) {
    if (this.globalData.localSocket.readyState !== 0 && this.globalData.localSocket.readyState !== 1 && this.globalData.header.Cookie != '') {
      console.log('开始尝试连接WebSocket！readyState=' + this.globalData.localSocket.readyState)
      this.initSocket()
    }
  },


  /**
   * 设置监听器
   */

  setWatcher(data, page) { // 接收index.js传过来的data对象和watch对象
    var watch = page.watch
    Object.keys(watch).forEach(v => { // 将watch对象内的key遍历
      this.observe(data, v, watch[v], page); // 监听data内的v属性，传入watch内对应函数以调用
    })
  },
  observe(obj, key, watchFun, page) {
    var val = obj[key]; // 给该属性设默认值
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      set: function (value) {
        val = value;
        watchFun(value, val); // 赋值(set)时，调用对应函数
      },
      get: function () {
        return val;
      }
    })
  }
})

/**
 * mock数据
 * 1.orders 
 * 2.drivers
 */
var Mock = require("./utils/WxMock.js");
Mock.mock(api.ordersHistory, {
  "code": 200,
  "data|3-7": [
    {
      "id|+1": 1,
      "starttime": function () {
        return Mock.Random.datetime()
      },
      "endtime": function () {
        return Mock.Random.datetime()
      },
      "state|1": [0, 1, 2]
    }
  ],
  "success": 0,
  "message": "请求成功。"
})
Mock.mock(api.ordersAll, {
  "code": 200,
  "data|3-5": [
    {
      "dispatchid|+1": 1,
      "routeid|+1": 1,
      "runid|+1": 1,
      "starttime": function () {
        return Mock.Random.datetime()
      },
      "endtime": function () {
        return Mock.Random.datetime()
      },
      "state|1": [0, 1],
      "data|3-7": [
        {
          "state|1": [0, 1, 2],
          "id|+1": 1,
          "market|1": ["邯郸路一号店", "张江一号店", "张江二号店"],
          "address|1": ["杨浦区国权路1888号", "普陀区金沙江路2345号", "浦东新区张衡路980号"],
          "tel|1": ["5789837", "2736483", "5395847"],
          "warehouse|1": ["一号仓", "二号仓", "三号门店"],
          "time": function () {
            return Mock.Random.datetime()
          },
          "deadline": function () {
            return Mock.Random.datetime()
          },
          "order|+1": 1,
          "type|1": [0, 1, 3, 4, 5],
          "state|1": [0, 1, 2],
          "lat|1": [31.289619, 31.23832],
          "lng|1": [121.510323, 121.36568]
        }
      ]
    }
  ],
  "success": 0,
  "message": "请求成功。"
})
Mock.mock(api.ordersView, {
  "code": 200,
  "dispatchid": 'cd123',
  "runid": 2,
  "routeid": 1,
  "data|3-7": [
    {
      "id|+1": 1,
      "market|1": ["邯郸路一号店", "张江一号店", "张江二号店"],
      "address|1": ["杨浦区国权路1888号", "普陀区金沙江路2345号", "浦东新区张衡路980号"],
      "tel|1": ["5789837", "2736483", "5395847"],
      "warehouse|1": ["一号仓", "二号仓", "三号门店"],
      "time": function () {
        return Mock.Random.datetime()
      },
      "deadline": function () {
        return Mock.Random.datetime()
      },
      "order|+1": 1,
      "type|1": [0, 1, 3, 4, 5],
      "state|1": [0, 1, 2],
      "lat|1": [31.289619, 31.23832],
      "lng|1": [121.510323, 121.36568]
    }
  ],
  "success": 0,
  "message": "请求成功。"
})
Mock.mock(api.ordersLoad, {
  "code": 200,
  "success": 0,
  "message": "完成取货状态更新成功。"
})
Mock.mock(api.ordersFinish, {
  "code": 200,
  "success": 0,
  "message": "完成配送状态更新成功。"
})
Mock.mock(api.ordersHidden, {
  "code": 200,
  "success": 0,
  "message": "删除配送单成功。"
})
Mock.mock(api.driversCertify, {
  "code": 200,
  "data": {
    "sessionId|1": ['C5350F9B17F28887BC17D3E45A4A4A94', 'E1920F9B17F28887BC1K9EE45A4A4A94'],
    "id|+1":1,
    "tel|1": ['13987608888', '15628798896'],
    "number|1": ['898755', '98877667']
  },
  "success": 0,
  "message": "认证成功。"
})
Mock.mock(api.driversEdit, {
  "code": 200,
  "success": 0,
  "message": "修改成功。"
})
Mock.mock(api.driversEditName, {
  "code": 200,
  "success": 0,
  "message": "修改成功。"
})
Mock.mock(api.driversEditTel, {
  "code": 200,
  "success": 0,
  "message": "修改成功。"
})
Mock.mock(api.driversEditNumber, {
  "code": 200,
  "success": 0,
  "message": "修改成功。"
})