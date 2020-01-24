// pages/goods/goods.js
var dispathc_list;
Page({


  /**
   * 页面的初始数据
   */
  data: {
    //页面切换
    currentIndex1: true, //待入仓
    currentIndex2: false, //在仓
    currentIndex3: false, //出仓
    currentIndex4: false, //已完成



    loadNum: 3, //待入仓个数
    inNum: 3, //在仓个数
    outNum: 2, //出仓个数
    finishNum: 4, //已完成个数
    //checkbox是否显示
    isCheckbox: false,
    //是否全选
    select_all: false,
    //待入仓数据
    loadList: [{
        id: 1,
        num: "D19060122",
        time: "2019-03-02"
      },
      {
        id: 2,
        num: "D19060123",
        time: "2019-03-02"
      }
    ],

    //在仓数据
    inList: [{
        id: 1,
        num: "A19060122",
        time: "2019-03-02"
      },
      {
        id: 2,
        num: "A19060123",
        time: "2019-03-02"
      },
      {
        id: 3,
        num: "A19060124",
        time: "2019-03-02"
      },
      {
        id: 4,
        num: "A19060124",
        time: "2019-03-02"
      },
    ],
    //出仓数据
    outList: [{
        id: 1,
        num: "A19060125",
        time: "2019-03-02"
      },
      {
        id: 2,
        num: "A19060126",
        time: "2019-03-02"
      },
      {
        id: 3,
        num: "A19060127",
        time: "2019-03-02"
      },
      {
        id: 4,
        num: "A19060127",
        time: "2019-03-02"
      },
    ],
    //已完成数据
    dispatch_list: [{
        "id": 1,
        "warehouse": "沪华东路基地",
        "market": "联华超市（水丰店）",
        "time": "2020-01-01 09:34:23"
      },
      {
        "id": 2,
        "warehouse": "现代物流",
        "market": "联华超市（欧阳店）",
        "time": "2020-01-01 09:34:23"
      },
      {
        "id": 5,
        "warehouse": "全方新桥配送中心",
        "market": "联华超市（友谊店）",
        "time": "2020-01-01 09:34:23"
      }
    ],
    onList: [{
        "id": 1,
        "warehouse": "沪华东路基地",
        "market": "联华超市（水丰店）",
        "time": "2020-01-01 09:34:23"
      },
      {
        "id": 85678,
        "warehouse": "沪华东路基地",
        "market": "联华超市（水丰店）",
        "time": "2020-01-08 09:34:23"
      }
    ],
    finishList: [{
        "id": 1,
        "warehouse": "沪华东路基地",
        "market": "联华超市（水丰店）",
        "time": "2020-01-01 09:34:23"
      },
      {
        "id": 85678,
        "warehouse": "新桥基地",
        "market": "联华超市（水店）",
        "time": "2020-01-08 09:34:23"
      },
      {
        "id": 1,
        "warehouse": "沪华东路基地",
        "market": "快客（浦东新区店）",
        "time": "2020-01-01 09:34:23"
      },
      {
        "id": 85678,
        "warehouse": "沪华东路基地",
        "market": "联华超市（丰店）",
        "time": "2020-01-08 09:34:23"
      }
    ],
    //配送数据

    //在仓的导航栏样式
    kong2: false
  },
  //待入仓
  currentIndex1: function(e) {
    // this.onShow()
    this.setData({
      kong2: false,
      currentIndex1: true,
      currentIndex2: false,
      currentIndex3: false,
      currentIndex4: false
    })
  },
  //在仓
  currentIndex2: function(e) {
    // this.onShow(),
    this.setData({
      kong2: true,
      currentIndex1: false,
      currentIndex2: true,
      currentIndex3: false,
      currentIndex4: false
    })
  },
  //出仓
  currentIndex3: function(e) {
    // this.onShow()
    this.setData({
      kong2: false,
      currentIndex1: false,
      currentIndex2: false,
      currentIndex3: true,
      currentIndex4: false
    })
  },
  //已完成
  currentIndex4: function(e) {
    // this.onShow()
    this.setData({
      kong2: false,
      currentIndex1: false,
      currentIndex2: false,
      currentIndex3: false,
      currentIndex4: true
    })
  },
  //点击在仓下的取回物品
  inGetBack(e) {
    // console.log(e.currentTarget.id)
    //设置全局对象
    var app = getApp();
    app.requestId = e.currentTarget.id
    wx.navigateTo({
      url: '../inGetBack/inGetBack?id=' + e.currentTarget.id,
    })
  },
  //点击待入仓的修改信息
  loadEdit() {
    wx.navigateTo({
      url: '../loadEdit/loadEdit',
    })
  },
  //点击已完成的查看详情
  finishLook() {
    wx.navigateTo({
      url: '../finishDetails/finishDetails',
    })
  },
  //点击已完成的查看详情
  outLook() {
    wx.navigateTo({
      url: '../outDetails/outDetails',
    })
  },
  //待入仓查看详情
  loadDetails() {
    wx.navigateTo({
      url: '../details/details',
    })
  },
  //在仓查看详情
  inDetails() {
    wx.navigateTo({
      url: '../inDetails/inDetails',
    })
  },
  //在仓延期
  delay() {
    wx.navigateTo({
      url: '../delay/delay',
    })
  },
  //点击管理
  guanli() {
    var isCheckboxs = !this.data.isCheckbox
    this.setData({
      isCheckbox: isCheckboxs
    })
  },
  //全选与反全选
  selectall: function() {
    var that = this;
    for (let i = 0; i < that.data.inList.length; i++) {
      that.data.inList[i].checked = !that.data.select_all
    }
    that.setData({
      inList: that.data.inList,
      select_all: (!that.data.select_all)
    })
  },
  //删除订单
  delOrder(e) {
    var finishList = this.data.finishList
    var finishList = finishList.filter((v, i) => {
      return v.num !== e.target.id
    })
    this.setData({
      finishList: finishList
    })
  },
  //页面卸载
  onHide: function() {
    this.setData({
      isCheckbox: false,
      select_all: false,
      kong2: false
    })
  },
})