// pages/usage/usage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storageIntroduce:true,
    howStorage:true,
    howRetrieved:true,
    feeScale:true,
    insurance:true,
    storageLimit:true,
    protocol:true,
    display: 'fixed'
  },
  onLoad:function(){
    var that=this;
    var screenHeight,heights
    wx.getSystemInfo({
      success:function(res){
        screenHeight = res.screenHeight
        // console.log(res.screenHeight)
      }
    });
    //创建节点选择器
    var query = wx.createSelectorQuery();
    query.select('.usage').boundingClientRect()
    query.exec(function (res) {
      //res就是 所有标签为usage的元素的信息 的数组
      // console.log(res);
      //取高度
      heights = res[0].height;
      if (screenHeight - heights <= 200) {
        that.setData({
          display: ''
        })
      } else {
        that.setData({
          display: 'fixed'
        })
      }
    })
  },
  //黑洞仓储介绍
  storageIntroduce(){
    this.onLoad();
    var storageIntroduces = !this.data.storageIntroduce
    this.setData({ storageIntroduce:storageIntroduces})
  },
  //如何让存放物品
  howStorage() {
    this.onLoad();
    var howStorages = !this.data.howStorage
    this.setData({ howStorage: howStorages })
  },
  //如何取回物品
  howRetrieved() {
    this.onLoad();
    var howRetrieveds = !this.data.howRetrieved
    this.setData({ howRetrieved: howRetrieveds })
  },
  //收费标准
  feeScale() {
    this.onLoad();
    var feeScales = !this.data.feeScale
    this.setData({ feeScale: feeScales })
  },
  //安全保障
  insurance() {
    this.onLoad();
    var insurances = !this.data.insurance
    this.setData({ insurance:  insurances })
  },
  //存放品限制
  storageLimit() {
    this.onLoad();
    var storageLimits = !this.data.storageLimit
    this.setData({ storageLimit: storageLimits })
  },
  //用户服务协议
  protocol() {
    this.onLoad();
    var protocols = !this.data.protocol
    this.setData({ protocol: protocols })
  },
  onHide(){
    this.setData({
      storageIntroduce: true,
      howStorage: true,
      howRetrieved: true,
      feeScale: true,
      insurance: true,
      storageLimit: true,
      protocol: true,
      display: 'fixed'
    })
  }
})