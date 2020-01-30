//app.js
import api from "./utils/api.js";
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
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    statusBarHeight: '',
    navigationBarHeight: '',
    xyl:2343
  }
})

/**
 * mock数据
 * 1.orders 
 * 2.drivers
 */
var Mock = require("./utils/WxMock.js");
Mock.mock(api.ordersView, {
  "code": 200,
  "data|1-7": [
    {
      "id|+1": 1,
      "market|1": ["邯郸路一号店", "张江一号店", "张江二号店"],
      "market_loc|1": ["杨浦区国权路1888号", "普陀区金沙江路2345号", "浦东新区张衡路980号"],
      "market_tel|1": ["5789837", "2736483", "5395847"],
      "warehouse|1": ["一号仓", "二号仓", "三号门店"],
      "warehouse_loc|1": ["杨浦区国权路900号", "普陀区金沙江路10号", "浦东新区哥白尼路90号"],
      "time": function () {
        return Mock.Random.datetime()
      },
      "state|1": [0, 1, 2]
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
  "success": 0,
  "message": "认证成功。"
})
Mock.mock(api.driversEdit, {
  "code": 200,
  "success": 0,
  "message": "修改成功。"
})