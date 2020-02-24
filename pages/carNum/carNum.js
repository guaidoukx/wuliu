// pages/carNum/carNum.js
import api from "../../utils/api.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    number: ''
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    let value = e.detail.value;
    let that = this
    wx.request({
      url: api.driversEditNumber,
      header: getApp().globalData.header,
      data: {
        id: that.data.id,
        number: value.editItem,
      },
      success: function (res) {
        if (res.success == 0 && value.editItem != '') {
          var pages = getCurrentPages();
          var currPage = pages[pages.length - 1];   //当前页面
          var prevPage = pages[pages.length - 2];  //上一个页面
          prevPage.setData({
            number: value.editItem,
          })

          // 全局变量
          getApp().globalData.driverInfo.number = value.editItem;

          // 缓存
          wx.setStorage({
            key: 'driverNumber',
            data: value.editItem
          })

          wx.showToast({
            title: '修改成功！',
            icon: 'success',
            duration: 2000
          })
          setTimeout(function () {
            wx.navigateBack()
          }, 2000)
        } else {
          console.log(res.message);
          wx.showToast({
            title: '请重试！',
            icon: 'fail',
            duration: 2000
          })
          wx.hideToast()
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      number: options.number
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