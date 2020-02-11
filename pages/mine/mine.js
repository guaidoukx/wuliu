// pages/mine/mine.js
Page({
  data: {
    hasUserInfo: false,
    id: '', 
    name: '',
    header: '',
  },

  onLoad: function() {
    var that = this;
    wx.getUserInfo({
      success(res) {
        that.setData({
          hasUserInfo: true
        });
      },
      
    })

    if (getApp().globalData.header.Cookie != '') { // 全局变量
      this.setData({
        header: getApp().globalData.header,       //获取app.js中的请求头
        id: getApp().globalData.driverInfo.id,
        name: getApp().globalData.driverInfo.name
      })
    }
  },

  logIn() {
    var that = this;
    wx.getUserInfo({
      success(res) {
        that.setData({
          hasUserInfo: true
        });
      },
      fail: function () {
        wx.getSetting({
          success: function (res) {
            var statu = res.authSetting;
            if (!statu['scope.userInfo']) {
              wx.showModal({
                title: '是否授权用户信息',
                content: '需要获取您用户信息（昵称、头像）,否则无法登录',
                success: function (tip) {
                  console.log(1)
                  if (tip.confirm) {
                    console.log(2)
                    wx.openSetting({
                      success: function (data) {
                        if (data.authSetting["scope.userInfo"] === true) {
                          wx.showToast({
                            title: '授权成功',
                            icon: 'success',
                            duration: 1000
                          })
                          that.data.hasUserInfo = true;
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
          fail: function (res) {
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
    wx.navigateTo({
      url: '../mobileLog/mobileLog',
    })
  },

  //个人中心的消息,点击跳转到我的消息
  info() {
    wx.navigateTo({
      url: '../info/info',
    })
  },
  //个人中心的实名认证,点击跳转到实名认证
  nameLook() {
    wx.navigateTo({
      url: '../name/name',
    })
  },
  // 编辑信息
  driversEdit() {
    if (this.data.id != '') {
      wx.navigateTo({
        url: '../driversEdit/driversEdit?id=' + this.data.id,
      })
    } else {
      wx.showToast({
        title: '请先前往实名认证！',
        icon: 'none',
        duration: 2000
      })
    }
  },
  // 身份认证
  realName() {
    wx.navigateTo({
      url: '../name/name',
    })
  },
  //个人中心的手机号,点击跳转到手机号
  phoneNumLook() {
    wx.navigateTo({
      url: '../phoneNum/phoneNum',
    })
  },

  //个人中心的车牌号,点击跳转到车牌号
  carNumLook() {
    wx.navigateTo({
      url: '../carNum/carNum',
    })
  },
  //我的地址
  addr() {
    wx.navigateTo({
      url: '../myAddr/myAddr',
    })
  },
  //退出登录
  signOut() {
    let that = this
    wx.showModal({
      title: '提示',
      content: '请确认是否要退出登录。',
      success: function (data) {
        if (data.confirm) {
          that.data.hasUserInfo = false;
          // 清空缓存、全局变量
          wx.clearStorage()
          that.setData({
            header: '',
            id: '',
            name: ''
          })
          getApp().globalData.header.Cookie = ''
          getApp().globalData.driverInfo.id = ''
          getApp().globalData.driverInfo.name = ''
          that.onLoad();
        }
      }
    })
  }
})