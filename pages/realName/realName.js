// pages/realName/realName.js
import api from "../../utils/api.js";
import WxValidate from "../../utils/WxValidate";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 服务热线的样式
    display: "fixed",
    height: "188rpx"
  },
  formSubmit: function (e) {
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
    let value = e.detail.value;
    if (!this.WxValidate.checkForm(value)) {
      let error = this.WxValidate.errorList[0];
      wx.showToast({
        title: error.msg,
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    wx.request({
      url: api.driversCertify,
      method: 'POST',
      data: {
        id: value.id,
        name: value.name
      },
      success: function (res) {
        // console.log(res)
        if (res.success == 0 && value.id != '') {
          var pages = getCurrentPages();
          // console.log('pages-------',pages);
          var currPage = pages[pages.length - 1];   //当前页面
          // console.log('currPage-------', currPage)
          var prevPage = pages[pages.length - 2];  //上一个页面
          // console.log('prevPage-------', prevPage)
          var id = value.id;
          prevPage.setData({
            id: id,
            name: value.name,
            tel: res.data.tel,
            number: res.data.number,
            header: res.data.sessionId,
            hasUserInfo: true
          })

          // 全局变量
          console.log('sessionId: ', res.data.sessionId)
          getApp().globalData.header.Cookie = 'JSESSIONID=' + res.data.sessionId;
          getApp().globalData.driverInfo.id = value.id;
          getApp().globalData.driverInfo.name = value.name;
          getApp().globalData.driverInfo.tel = res.data.tel;
          getApp().globalData.driverInfo.number = res.data.number;

          // 缓存
          wx.setStorage({
            key: 'sessionId',
            data: 'JSESSIONID=' + res.data.sessionId,
            success: function () {
              console.log('sessionId has been saved. sessionId = ', res.data.sessionId)
            }
          })
          wx.setStorage({
            key: 'driverId',
            data: value.id
          })
          wx.setStorage({
            key: 'driverName',
            data: value.name
          })
          wx.setStorage({
            key: 'driverTel',
            data: res.data.tel
          })
          wx.setStorage({
            key: 'driverNumber',
            data: res.data.number
          })

          wx.showToast({
            title: '登录成功！',
            icon: 'success',
            duration: 2000
          })
          setTimeout(function () {
            wx.navigateBack()
          }, 2000)
        } else {
            //console.log(res.message);
            wx.showToast({
              title: '请重试！',
              icon: 'none',
              duration: 2000
            })
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var screenHeight, heights
    wx.getSystemInfo({
      success: function (res) {
        screenHeight = res.screenHeight
        // console.log(res.screenHeight)
      }
    });
    //创建节点选择器
    var query = wx.createSelectorQuery();
    query.select('.main').boundingClientRect()
    query.exec(function (res) {
      //res就是 所有标签为xxxx的元素的信息 的数组
      // console.log(res);
      //取高度
      heights = res[0].height;
      if (screenHeight - heights <= 124) {
        that.setData({
          display: '',
          height: "188rpx"
        })
      } else {
        that.setData({
          display: 'fixed',
          height: "88rpx"
        })
      }
    })
    this.initValidate();
  },
  initValidate() {
    let rules = {
      id: {
        required: true
      },
      name: {
        required: true,
        rangelength: [2,8]
      }
    }

    let message = {
      id: {
        required: '请输入工号'
      },
      name: {
        required: '请输入姓名'
      },
    }
    this.WxValidate = new WxValidate(rules, message);
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