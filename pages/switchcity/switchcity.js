// 全局变量
var app = getApp()
Page({
  data: {
    citys: '',
    cityList: [],
    currentCity:'',
  },
  // 获取城市列表云函数
  getAllLocations() {
    wx.cloud.callFunction({
      name: 'getAllLocations',
    }).then(res => {
      const citys = res.result.data.list[0].locations || ''
      const cityList = []
      for (var i = 0; i < citys.length; i++) {
        cityList.push({
          id: i,
          city: citys[i]
        })
      }
      cityList.unshift({id:-1,city:'全国'})
      wx.setStorageSync('cityList', cityList)
      
      this.setData({
        citys,
        cityList
      })
    }).catch(console.error)
  },
  //选择城市
  chooseCity: function (e) {
    const currentCity = e.currentTarget.dataset.city
    app.globalData.currentCity = currentCity
    this.setData({
      currentCity
    })
    // 更改全局变量
    
    wx.navigateBack({
      delta: 1
    })
  },
  onLoad: function () {
    const that = this
    
    wx.hideShareMenu({
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },
  onShow:function () {
    const currentCity = app.globalData.currentCity
    wx.getStorage({
      key: 'cityList',
      success:function(res) {
        that.setData({
          cityList:res.data || []
        })
      }
    })
    // 获取可选城市列表
    this.getAllLocations()
    this.setData({
      currentCity
    })
  }
})