// pages/mine/mine.js
Page({
  data: {
    hasUserInfo: false,
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
  //个人中心的我的余额,点击跳转到我的余额
  phoneNumLook() {
    wx.navigateTo({
      url: '../phoneNum/phoneNum',
    })
  },
  //个人中心的意见反馈,点击跳转到意见反馈
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
    this.data.hasUserInfo = false;
    this.onLoad();
  }
})