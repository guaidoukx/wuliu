// pages/historyDispatch/historyDispatch.js
import api from "../../utils/api.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dispatchHistoryList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
  },
  // 请求数据
  getData: function () {
    let that = this;
    wx.request({
      url: api.ordersAll,
      header: getApp().globalData.header,
      method: 'GET',
      success: function (res) {
        console.log('All orders：', res);
        // let map = ["配送单", "退货单", "换货单", "调货单", "上货单", "其他"];
        if (res.success == 0) {
          res = res.data;
          /*
          let list = [];
          for (let order of res) {
            order.type = map[order.type];
            list.push(order);
          }*/
          that.setData({
            dispatchHistoryList: res
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

  orderHistory(e) {
    let index = e.currentTarget.dataset.index
    let a = this.data.dispatchHistoryList[index].data
    wx.navigateTo({
      url: '../historyOrder/historyOrder?dispatchHistoryList=' + JSON.stringify(a)
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

  }
})