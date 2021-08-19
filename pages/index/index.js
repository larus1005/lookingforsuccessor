const app = getApp()
import * as watch from "../../utils/watch.js";
Page({
  data: {
    //自定义tabbar
    tabbar: {},
    userInfo: {},
    logged: false,
    // 城市
    // 后端给的数据
    citys: '',
    positions: [],
    location: '',
    type: ["产品", "运营"],
    typeList: [
      ["产品", "运营"],
      ["技术"],
      ["职能", "设计"]
    ],
    // 查找岗位和公司传值
    search: '',
    // 我定义的当前城市
    currentCity: app.globalData.currentCity,
    // banner
    bannerList: [],
    current: 'tab1',
    // tab栏
    tabs: [{
        id: 0,
        name: "产品",
        isActive: true
      },
      {
        id: 1,
        name: "技术",
        isActive: false
      },
      {
        id: 2,
        name: "其他",
        isActive: false
      }
    ],
    avatarUrl: '',
    nickname: ''
  },
  handleReset() {
    app.globalData.currentCity = '全国',
      this.setData({
        search: '',
        currentCity: app.globalData.currentCity
      })
  },
  // 获取用户信息
  onGetUserInfo(e) {
    if (!this.data.logged && e.detail.userInfo) {
      wx.cloud.callFunction({
        name: 'login',
        data: {
          avatarUrl: e.detail.userInfo.avatarUrl,
          nickname: e.detail.userInfo.nickName,
        },
        success: res => {
          const userInfo = e.detail.userInfo
          const logged = true
          wx.setStorageSync('userInfo', userInfo)
          wx.switchTab({
            url: '../index/index',
          })
          this.setData({
            logged,
            userInfo
          })

        },
        fail: err => {
          console.error(err)
        }
      })

    }
  },
  // 按照岗位和公司搜索
  getPositionsByNameOrCompany(e) {
    const db = wx.cloud.database({});
    wx.cloud.callFunction({
      name: 'getPositionsByNameOrCompany',
      data: {
        name: db.RegExp({
          regexp: this.data.search,
          options: 'i',
        }),
        company: db.RegExp({
          regexp: this.data.search,
          options: 'i',
        }),
        // 点击tab修改type
        type: this.data.type,
      }
    }).then(res => {
      this.setData({
        positions: res.result.data.list
      })
    }).catch(console.error)
  },
  // 处理搜索框内容实现按岗位和公司
  handleSearch(e) {
    const search = e.detail.value
    this.setData({
      search
    })
    this.getPositions()
  },
  // 切换tab栏+内容
  handleTabsItem(e) {
    const index = e.detail;
    let {
      tabs,
      type
    } = this.data
    type = this.data.typeList[index]
    wx.setStorage({
      data: type,
      key: 'type',
    })
    tabs.forEach((v, i) => v.isActive = i === index);
    this.setData({
      tabs,
      type
    })

    // if (this.data.search === '') {
    //   this.getPositionsByLocation()
    // } else {
    //   this.getPositionsByNameOrCompany()
    // }
    this.getPositions()
  },
  getBanner: function (e) {
    wx.cloud.callFunction({
      name: 'getBanner',
    }).then(res => {
      this.setData({
        bannerList: res.result.data.data[0].banner
      })
    }).catch(console.error)
  },
  // 利用微信API获取系统信息
  getTopHeight() {

  },
  // 根据城市查找
  getPositionsByLocation: function (e) {
    const db = wx.cloud.database({});
    wx.cloud.callFunction({
      name: 'getPositionsByLocationAndType',
      data: {
        location: app.globalData.currentCity,
        type: this.data.type,
        name: this.data.search,
        company: this.data.search,
      },
    }).then(res => {

      const positions = res.result.data.list
      positions.map((v, i) => {
        let reg = /(\d{4})-(\d{2})-(\d{2})/
        v.create_time.match(reg)
        v.create_time = RegExp.$2 + '-' + RegExp.$3
      })
      this.setData({
        positions: res.result.data.list
      })
    }).catch(console.error)
  },
  // 根据岗位类别获取职位
  getPositionsByType: function (e) {
    wx.cloud.callFunction({
      name: 'getPositionByType',
      data: {
        // type自己写
        type: this.data.type
      },
    }).then(res => {
      const positions = res.result.data.list
      wx.setStorageSync('positions', positions)
      positions.map((v, i) => {
        let reg = /(\d{4})-(\d{2})-(\d{2})/
        v.create_time.match(reg)
        v.create_time = RegExp.$2 + '-' + RegExp.$3
      })
      this.setData({
        positions: res.result.data.list
      })
    }).catch(console.error)
  },
  getPositions: function () {
    this.setData({
      positions: []
    })

    // if (app.globalData.currentCity !== '全国') {
    //   this.getPositionsByLocation()
    // } else {
    //   this.getPositionsByType()
    // }
    this.getPositionsByLocation()
  },
  watch: {
    currentCity: function (newVal, oldVal) {
      this.getPositions()
    }
  },
  // 获取未读消息
  waitingReply: function (e) {
    wx.cloud.callFunction({
      name: 'waitingReply',
    }).then(res => {
      if (res.result.data.data.length !== 0) {
        // console.log(res)
        app.globalData.tabBar.redDot = true
        // console.log(app.globalData.tabBar.redDot)
      }
    }).catch(console.error)
  },

  onLoad: function () {
    const that = this
    that.setData({
      currentCity: app.globalData.currentCity
    })

    // 自定义tab栏
    app.editTabbar()
    // 获取banner
    this.getBanner()
    // 获取职位


    watch.setWatcher(this);

  },
  onShow: function () {

    this.setData({
      currentCity: app.globalData.currentCity
    })
    this.waitingReply()
    // console.log(app.globalData.tabBar.redDot)
    app.editTabbar();

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})