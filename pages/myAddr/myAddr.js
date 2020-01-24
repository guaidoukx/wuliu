// pages/myAddr/myAddr.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addrList:[
      {id:1,tel:13636363636,name:"小猪佩奇",addr:"浙大网新智慧立方D幢202室",index:1},
      { id: 2, tel: 13636363636, name: "小猪佩奇", addr: "浙大网新智慧立方D幢202室", index: 2,checked:true },
      { id: 3, tel: 13636363636, name: "小猪佩奇", addr: "浙大网新智慧立方D幢202室", index: 1 },
      { id: 4, tel: 13636363636, name: "小猪佩奇", addr: "浙大网新智慧立方D幢202室", index: 1 },
    ],
    // 服务热线的样式
    display:"fixed",
    height:"188rpx"
  },
  onLoad(){
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
          height:"188rpx"
        })
      } else {
        that.setData({
          display: 'fixed',
          height: "88rpx"
        })
      }
    })
  },
  //默认地址切换
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  //跳转到添加地址栏
  addAddr(){
    wx.navigateTo({
      url: '../addAddr/addAddr',
    })
  },
  //编辑地址
  editAddr(){
    wx.navigateTo({
      url: '../editAddr/editAddr',
    })
  }
})