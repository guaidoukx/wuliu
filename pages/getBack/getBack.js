// pages/getBack/getBack.js
Page({
  data: {
    info: "请选择省/市/区",
    //省市区
    region: ['', '', ''],
    //年月日
    dates:['','',''],
    // 服务热线的样式
    display: "fixed",
    height: "188rpx"
  },
  onLoad: function (options) {
    var that = this;
    var screenHeight, heights
    wx.getSystemInfo({
      success: function (res) {
        screenHeight = res.screenHeight
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
  },
  bindRegionChange: function (e) {
    console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value,
      info: ""
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var dates = e.detail.value.split("-")
    console.log(dates)
    this.setData({
      date: e.detail.value,
      dates:dates
    })
  },
})