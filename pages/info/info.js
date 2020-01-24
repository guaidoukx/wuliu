// pages/info/info.js
Page({
  data: {
    info:[
      {
        id: 0, name: "服务器升级公告", content: "亲爱的用户：因数据中心割接，从即日起到 1 月 9 日中午 12 点，我们将对服务器做一些优化和升级，本次服务器升级涉及范围广，因此会对功能有较大影响，在此期间我们将暂停部分功能，在此期间，您仍可使用搜索、浏览等功能。我们有完善的数据安全措施，您的图片等数据不会受到任何影响，请放心。抱歉给您带来不便。", time: "2019-01-03 15:00:34", notice: true,
      },
      {
        id: 1, name: "服务器升级公告", content: "亲爱的用户：因数据中心割接，从即日起到 1 月 9 日中午 12 点，我们将对服务器做一些优化和升级，本次服务器升级涉及范围广，因此会对功能有较大影响，在此期间我们将暂停部分功能，在此期间，您仍可使用搜索、浏览等功能。我们有完善的数据安全措施，您的图片等数据不会受到任何影响，请放心。抱歉给您带来不便。", time: "2019-01-03 15:00:34", notice: true,
      },
    ],
    display:"fixed"
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
          display: ''
        })
      } else {
        that.setData({
          display: 'fixed'
        })
      }
    })
  },
  //服务器升级消息
  notice(e) {
    this.onLoad();
    var id=e.currentTarget.id
    var notices = !this.data.info[id].notice
    var notice="info["+id+"].notice"
    this.setData({ 
      [notice] : notices  
    })
  },
  onHide(){
    var infos=this.data.info
    for(i in infos){
      infos[i].notice=true
    }
    this.setData({
      info:infos
    })
  }
})