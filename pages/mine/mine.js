// pages/mine/mine.js
Page({
  data: {
    hasUserInfo: false,
    id: '', 
    name: '',
    tel: '',
    number: '',
    header: '',
  },

  onLoad: function() {
    var that = this;
    
    

    if (getApp().globalData.header.Cookie != '') { // 全局变量
      this.setData({
        header: getApp().globalData.header,       //获取app.js中的请求头
        id: getApp().globalData.driverInfo.id,
        name: getApp().globalData.driverInfo.name,
        tel: getApp().globalData.driverInfo.tel,
        number: getApp().globalData.driverInfo.number,
      })
    }
    if (this.data.header != '') {
      that.setData({
        hasUserInfo: true
      });
    } else {
      that.setData({
        hasUserInfo: false
      });
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
      url: '../realName/realName',
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
      url: '../name/name?name=' + this.data.name + "&id=" + this.data.id,
    })
  },
  //个人中心的工号,点击跳转到工号
  idLook() {
    wx.navigateTo({
      url: '../id/id?id=' + this.data.id,
    })
  },
  //个人中心的手机号,点击跳转到手机号
  phoneNumLook() {
    wx.navigateTo({
      url: '../phoneNum/phoneNum?tel=' + this.data.tel + "&id=" + this.data.id,
    })
  },

  //个人中心的车牌号,点击跳转到车牌号
  carNumLook() {
    wx.navigateTo({
      url: '../carNum/carNum?number=' + this.data.number + "&id=" + this.data.id,
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
            name: '',
            tel: '',
            number: ''
          })
          getApp().globalData.header.Cookie = ''
          getApp().globalData.driverInfo.id = ''
          getApp().globalData.driverInfo.name = ''
          getApp().globalData.driverInfo.tel = ''
          getApp().globalData.driverInfo.number = ''
          that.onLoad();
        }
      }
    })
  }
})