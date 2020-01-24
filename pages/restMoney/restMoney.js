// pages/restMoney/restMoney.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex1: true,
    currentIndex2: false,
    recharge:[
      { id: 1, money: "1000.00", time: "2019-03-26" },
      { id: 2, money: "1000.00", time: "2019-03-26" },
      { id: 3, money: "1000.00", time: "2019-03-26" },
      { id: 4, money: "1000.00", time: "2019-03-26" },
    ],
    consume:[
      { id: 1, money: "1000.00", index: "A20192438", time: "2019-03-26" },
      { id: 2, money: "1000.00", index: "A20192438", time: "2019-03-26" },
      { id: 3, money: "1000.00", index: "A20192438", time: "2019-03-26" },
      { id: 4, money: "1000.00", index: "A20192438", time: "2019-03-26" }
    ],
    height:''
  },
  onLoad(){
    var that = this;
    var screenHeight, heights
    wx.getSystemInfo({
      success: function (res) {
        screenHeight = res.screenHeight
      }
    });
    // heights = screenHeight-382
    // this.setData({
    //   height:heights
    // })
  },
  //点击充值跳转充值页面
  chongzhi(){
    wx.navigateTo({
      url: '../chongzhi/chongzhi',
    })
  },
  currentIndex1: function (e) {
    this.setData({
      currentIndex1: true,
      currentIndex2: false,
    })
  },
  currentIndex2: function (e) {
    this.setData({
      currentIndex1: false,
      currentIndex2: true,
    })
  },
})