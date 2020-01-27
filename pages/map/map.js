// pages/map/map.js
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     longitude: 121.598586,
//     latitude: 31.239637
//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function(options) {
//     console.log(options)

//     var that = this
//     wx.getLocation({
//       type: 'wgs84',
//       success(res) {

//         const speed = res.speed
//         const accuracy = res.accuracy
//         // console.log(longitude,latitude,)
//         that.setData({
//           latitude :res.latitude,
//           longitude : res.longitude
//         })

//         var marker = {
//           id: 1,
//           latitude: res.latitude,
//           longitude: res.longitude,
//           width: 50,
//           height: 50
//         }
//         var markers = new Array();
//         markers.push(marker);

//         // that.setData({ latitude: latitude, longitude: longitude, markers: markers });

//       }
//     })

//     // let plugin = requirePlugin('routePlan');
//     // let key = '3BGBZ-YDME6-UPPSK-EIC7O-NLVLZ-A2FDX';  //使用在腾讯位置服务申请的key
//     // let referer = 'wxbd01dc5b31432f51';   //调用插件的小程序的名称
//     // let startPoint = JSON.stringify({  //起点
//     //   'name': '中国技术交易大厦',
//     //   'latitude': 39.984154,
//     //   'longitude': 116.30749
//     // });
//     // let endPoint = JSON.stringify({  //终点
//     //   'name': '北京西站',
//     //   'latitude': 39.894806,
//     //   'longitude': 116.321592
//     // });
//     // wx.navigateTo({
//     //   url: 'plugin://routePlan/route-plan?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
//     // });

//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function() {

//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function() {

//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function() {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function() {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function() {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function() {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function() {

//   }
// })
// const app = getApp()
// let plugin = requirePlugin("myPlugin")
// let routeInfo = {
//   startLat: 28.218651,
//   startLng: 112.918801,
//   startName: "湖南商学院",   // 起点名称 选填
//   endLat: 28.194104,    // 终点纬度必传
//   endLng: 113.013206,  //终点经度 必传
//   endName: "长沙火车站",  //终点名称 必传
// }

Page({
  data: {
  },
  onLoad: function (options){
    console.log(options.lat)
    let plugin = requirePlugin('myPlugin');
    let key = '3BGBZ-YDME6-UPPSK-EIC7O-NLVLZ-A2FDX';  //使用在腾讯位置服务申请的key
    let referer = 'wxbd01dc5b31432f51';   //调用插件的小程序的名称
    let startPoint = JSON.stringify({  //起点
      'name': '中国技术交易大厦',
      'latitude': 39.984154,
      'longitude': 116.30749
    });
    let endPoint = JSON.stringify({  //终点
      'name': '北京西站',
      'latitude': options.lat,
      'longitude': options.lng
    });
    wx.navigateTo({
      url: 'plugin://myPlugin/route-plan?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
    });
  }
})

// let plugin = requirePlugin('myPlugin');
// let key = '3BGBZ-YDME6-UPPSK-EIC7O-NLVLZ-A2FDX';  //使用在腾讯位置服务申请的key
// let referer = 'wxbd01dc5b31432f51';   //调用插件的app的名称
// let endPoint = JSON.stringify({  //终点
//   'name': '吉野家(北京西站北口店)',
//   'latitude': 39.89631551,
//   'longitude': 116.323459711
// });
// wx.navigateTo({
//   url: 'plugin://myPlugin/route-plan?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
// });