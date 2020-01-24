// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: 121.598586,
    latitude: 31.239637
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success(res) {

        const speed = res.speed
        const accuracy = res.accuracy
        // console.log(longitude,latitude,)
        that.setData({
          latitude :res.latitude,
          longitude : res.longitude
        })
        
        var marker = {
          id: 1,
          latitude: res.latitude,
          longitude: res.longitude,
          width: 50,
          height: 50
        }
        var markers = new Array();
        markers.push(marker);

        // that.setData({ latitude: latitude, longitude: longitude, markers: markers });

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

  }
})