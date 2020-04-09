// pages/trains/trains.js
import api from "../../utils/api.js";
var app = getApp();
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
    longitude: 121.473717,
    latitude: 31.23035,
    markers: [{
      iconPath: '/image/locationRed.png',
      id: 0,
      latitude: 34.796491,
      longitude: 113.665299,
      width: 33,
      height: 33
    }],
    loadList: [{
      market: "market1",
      address: "address1",
      lngDes: 121.598343,
      latDes: 31.189051,
      warehouse: "warehouse1",
      addressOri: "addressOri1",
      lng: 121.467606,
      lat: 31.211815
    }, {
      market: "market2",
      address: "address2",
      lngDes: 121.503204,
      latDes: 31.297182,
      warehouse: "warehouse2",
      addressOri: "addressOri2",
      lng: 121.486145,
      lat: 31.202543
    }], // 待取货
    onList: [{
      market: "market3",
      address: "address3",
      lngDes: 121.598343,
      latDes: 31.189051,
      warehouse: "warehouse3",
      addressOri: "addressOri3",
      lng: 121.501831,
      lat: 31.282627
    }, {
      market: "market4",
      address: "address4",
      lngDes: 121.454979,
      latDes: 31.197163,
      warehouse: "warehouse4",
      addressOri: "addressOri4",
      lng: 121.417313,
      lat: 31.22571
    }], // 待配送
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    var that = this
    var onList = that.data.onList
    var loadList = that.data.loadList
    console.log(onList)
    var markers = new Array()
    var latSum = 0
    var lngSum = 0
    for (var i = 0; i < onList.length; i++){
      var lng = onList[i].lngDes
      var lat = onList[i].latDes
      var name = onList[i].warehouse
      var address  = onList[i].addressOri
      latSum += lat
      lngSum += lng
      var marker = {
        iconPath: "/image/locationYellow.png",
        title: address,
        latitude: lat,
        longitude: lng,
        width: 30,
        height: 30
      }
      markers.push(marker)
      // that.data.markers[that.data.markers.length] = marker
    }
    for (var i = 0; i < loadList.length; i++) {
      var lng = loadList[i].lng
      var lat = loadList[i].lat
      var name = loadList[i].market
      var address = loadList[i].address
      latSum += lat
      lngSum += lng
      var marker = {
        iconPath: "/image/locationRed.png",
        title: address,
        latitude: lat,
        longitude: lng,
        width: 30,
        height: 30
      }
      markers.push(marker)
      // that.data.markers[that.data.markers.length] = marker
    }
    var latCenter = latSum / markers.length
    var lngCenter = lngSum / markers.length
    this.setData({
      markers:markers,
      longitude: lngCenter,
      latitude: latCenter,
    })
    
    console.log("有吗",this.data.markers)
    // wx.getLocation({
    //   type: 'wgs84', //返回可以用于wx.openLocation的经纬度
    //   success: (res) => {
    //     that.setData({
    //       markers: this.data.markers,
    //       scale: 12,
    //       // longitude: res.longitude,
    //       // latitude: res.latitude
    //     })
    //   }
    // });
    
    // wx.getLocation({
    //   success(res) {
    //     // wx.navigateTo({
    //     //   url: 'plugin://myPlugin/route-plan?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
    //     // });
    //   },
    //   fail: function() {
    //     wx.getSetting({
    //       success: function(res) {
    //         var statu = res.authSetting;
    //         if (!statu['scope.userLocation']) {
    //           wx.showModal({
    //             title: '是否授权当前位置',
    //             content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
    //             success: function(tip) {
    //               console.log(1)
    //               if (tip.confirm) {
    //                 console.log(1)
    //                 wx.openSetting({
    //                   success: function(data) {
    //                     if (data.authSetting["scope.userLocation"] === true) {
    //                       wx.showToast({
    //                         title: '授权成功',
    //                         icon: 'success',
    //                         duration: 1000
    //                       })
    //                       wx.getLocation({
    //                         success(res) {
    //                           that.setData({
    //                             currentLon: res.longitude,
    //                             currentLat: res.latitude,
    //                           });
    //                         },
    //                       });
    //                     } else {
    //                       wx.showToast({
    //                         title: '授权失败',
    //                         icon: 'success',
    //                         duration: 1000
    //                       })
    //                       wx.navigateBack({
    //                         delta: -1
    //                       });
    //                     }
    //                   }
    //                 })
    //               } else {
    //                 wx.navigateBack({
    //                   delta: -1
    //                 });
    //               }
    //             }
    //           })
    //         }
    //       },
    //       fail: function(res) {
    //         wx.showToast({
    //           title: '调用授权窗口失败',
    //           icon: 'success',
    //           duration: 1000
    //         })
    //         wx.navigateBack({
    //           delta: -1
    //         });
    //       }
    //     })
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.mapCtx = wx.createMapContext('map')
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