import api from "../../utils/api.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let currList = JSON.parse(options.dispatchHistoryList)
    let map = ["配送单", "退货单", "换货单", "调货单", "上货单", "其他"];
    //for (let order of currList) {
    //  order.type = map[order.type];
    //}
    this.setData({
      list: currList == "undefined" ? "-" : currList
    });
    // this.getData();
    var screenHeight, heights
    wx.getSystemInfo({
      success: function (res) {
        screenHeight = res.screenHeight
        // console.log(res.screenHeight)
      }
    });

  },
  // 请求数据
  getData: function () {
    let that = this;
    let unfinish_list = [], finish_list = [], list = [];
    // console.log('----------@,', getApp().globalData.header.Cookie)
    wx.request({
      url: api.ordersHistory,
      header: getApp().globalData.header,
      success: function (res) {
        console.log('All orders：', res);
        if (res.success == 0) {
          res = res.data;
          list = res;
          console.log(res);
          that.setData({
            list: list,
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})