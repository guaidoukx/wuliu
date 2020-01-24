// pages/inDetails/inDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //是否显示阴影(点击延期)
    isShow: false,
    //备注栏是否有信息
    isInfo: false,
    //是否收起
    displays: true,
    //备注栏的高度
    remark_height: 180,
    // 服务热线的样式
    display: "fixed",
    height: "18rpx",
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
      }
    });
    //创建节点选择器
    var query = wx.createSelectorQuery();
    query.select('.main').boundingClientRect()
    query.exec(function (res) {
      //res就是 所有标签为xxxx的元素的信息 的数组
      //取高度
      heights = res[0].height;
      if (screenHeight - heights <= 124) {
        that.setData({
          display: '',
          height: "18rpx"
        })
      } else {
        that.setData({
          display: 'fixed',
          height: "88rpx"
        })
      }
    })
  },
  //填写备注
  remarks() {
    wx.navigateTo({
      url: '../remarks/remarks',
    })
  },
  //收起
  shouqi() {
    this.setData({
      displays: !this.data.displays,
      remark_height: 180
    }),
      this.onLoad()
  },
  //展开
  zhankai() {
    this.setData({
      displays: !this.data.displays,
      remark_height: 90
    }),
      this.onLoad()
  }
})