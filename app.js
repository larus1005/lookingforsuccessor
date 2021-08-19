//app.js
App({
  editTabbar: function () {
    let tabbar = this.globalData.tabBar;
    let currentPages = getCurrentPages();
    let _this = currentPages[currentPages.length - 1];
    let pagePath = _this.route;
    (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
    for (let i in tabbar.list) {
      tabbar.list[i].selected = false;
      (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
    }
    _this.setData({
      tabbar: tabbar
    });
  },
  getSystemInfo: function () {
    let t = this;
    wx.getSystemInfo({
      success: function (res) {
        t.globalData.systemInfo = res;
      }
    });
  },

  onLaunch: function () {
    wx.hideTabBar();
    this.getSystemInfo();

    // 云函数
    wx.cloud.init({
      traceUser: true,
    })
  },
  onShow: function () {
    //隐藏系统tabba

    wx.hideTabBar()
   




  },
  globalData: {
    userInfo: null,
    systemInfo: null, //客户端设备信息
    tabBar: {
      "backgroundColor": "#fff",
      "color": "#C0C0C0",
      "selectedColor": "#2F88E5",
      "redDot": false,
      "list": [{
          "pagePath": "/pages/index/index",
          "iconPath": "icon/icon_home.png",
          "selectedIconPath": "icon/icon_home_HL.png",
          "text": "实习圈"
        },
        {
          "pagePath": "/pages/release/release",
          "iconPath": "icon/icon_release.png",
          "isSpecial": true,
          "text": "发布"
        },
        {
          "pagePath": "/pages/user/user",
          "iconPath": "icon/icon_mine.png",
          "selectedIconPath": "icon/icon_mine_HL.png",
          "text": "我的"
        }
      ]
    },
    currentCity: '全国',
    chooseCity: '例如：上海市',
  }
})