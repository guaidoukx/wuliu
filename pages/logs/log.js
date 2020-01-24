// pages/logs/log.js
Page({
  data: {

  },
  //手机登录
  mobileLog(){
    wx.navigateTo({
      url: '../mobileLog/mobileLog',
    })
  },
  //获取手机号
  getPhoneNumber(e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  },
  //是否弹出阴影
  toggleDialog(){
   wx.switchTab({
     url: '../index/index',
   })
  },
  //拒绝
  reject(){
    
  }
})