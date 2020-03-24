// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //备注栏是否有信息
    isInfo: false,
    // 服务热线的样式
    display: "fixed",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    console.log(options)
    var that = this;
    var screenHeight, heights
    that.setData({
      warehouse: options.warehouse == "undefined" ? "-" : options.warehouse,
      id: options.id == "undefined" ? "-" : options.id,
      market: options.market == "undefined" ? "-" : options.market,
      address: options.address == "undefined" ? "-" : options.address,
      time: options.time == "undefined" ? "-" : options.time,
      tel: options.tel == "undefined" ? "-" : options.tel,
      state: options.state == "undefined" ? "-" : options.state
    })
    wx.getSystemInfo({
      success: function(res) {
        screenHeight = res.screenHeight
      }
    });
    //创建节点选择器
    var query = wx.createSelectorQuery();
    query.select('.main').boundingClientRect()
    query.exec(function(res) {
      //res就是 所有标签为xxxx的元素的信息 的数组
      // console.log(res);
      //取高度
      heights = res[0].height;
      if (screenHeight - heights <= 124) {
        that.setData({
          display: '',
        })
      } else {
        that.setData({
          display: 'fixed',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  //填写备注
  remarks() {
    wx.navigateTo({
      url: '../remarks/remarks',
    })
  },
})