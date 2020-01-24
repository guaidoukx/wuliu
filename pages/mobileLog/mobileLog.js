// pages/mobileLog/mobileLog.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
  },
  radioClick: function (event) {
    if(this.data.index==0){
      this.setData({index: 1})
    }else{
      this.setData({ index: 0 })
    }  
  },
  //登录
  log(){
    wx.switchTab({
      url: '../index/index',
    })
  }
  // radioChange: function (e) {
  //   console.log(e)
  //   if (e.detail.value == 0) {
  //     this.setData({ index: 1 })
  //   } else {
  //     this.setData({ index: 0 })
  //   }  
  // },
})