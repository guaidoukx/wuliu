// pages/trains/trains.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    circular: true,
    longitude: 121.598586,
    latitude: 31.239637
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.lat)
    let plugin = requirePlugin('myPlugin');
    let key = '3BGBZ-YDME6-UPPSK-EIC7O-NLVLZ-A2FDX'; //使用在腾讯位置服务申请的key
    let referer = 'wxbd01dc5b31432f51'; //调用插件的小程序的名称
    let startPoint = JSON.stringify({ //起点
      'name': '中国技术交易大厦',
      'latitude': 39.984154,
      'longitude': 116.30749
    });
    let endPoint = JSON.stringify({ //终点
      'name': '北京西站',
      'latitude': options.lat,
      'longitude': options.lng
    });
    wx.getLocation({
      success(res) {
        // wx.navigateTo({
        //   url: 'plugin://myPlugin/route-plan?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
        // });
      },
      fail: function() {
        wx.getSetting({
          success: function(res) {
            var statu = res.authSetting;
            if (!statu['scope.userLocation']) {
              wx.showModal({
                title: '是否授权当前位置',
                content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
                success: function(tip) {
                  console.log(1)
                  if (tip.confirm) {
                    console.log(1)
                    wx.openSetting({
                      success: function(data) {
                        if (data.authSetting["scope.userLocation"] === true) {
                          wx.showToast({
                            title: '授权成功',
                            icon: 'success',
                            duration: 1000
                          })
                          wx.getLocation({
                            success(res) {
                              that.setData({
                                currentLon: res.longitude,
                                currentLat: res.latitude,
                              });
                            },
                          });
                        } else {
                          wx.showToast({
                            title: '授权失败',
                            icon: 'success',
                            duration: 1000
                          })
                          wx.navigateBack({
                            delta: -1
                          });
                        }
                      }
                    })
                  } else {
                    wx.navigateBack({
                      delta: -1
                    });
                  }
                }
              })
            }
          },
          fail: function(res) {
            wx.showToast({
              title: '调用授权窗口失败',
              icon: 'success',
              duration: 1000
            })
            wx.navigateBack({
              delta: -1
            });
          }
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

  }
})