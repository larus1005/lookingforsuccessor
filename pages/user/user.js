// pages/user/user.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //tabbar
    tabbar: {},
    userInfo: {},
    reddot:false
  },
  // 获取未读消息
  waitingReply: function (e) {
    const that = this
    wx.cloud.callFunction({
      name: 'waitingReply',
    }).then(res => {
      app.globalData.tabBar.redDot = res.result.data.data.length !== 0
      that.setData({
        reddot:app.globalData.tabBar.redDot
      })
    }).catch(console.error)
    .finally(app.editTabbar)

   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    const userInfo = wx.getStorageSync('userInfo') || {}
    this.setData({
      userInfo
    })
    wx.hideShareMenu({
      complete: (res) => {},
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const userInfo = wx.getStorageSync('userInfo') || {}
    if (userInfo.nickName == undefined) {
      wx.showModal({
        title: '你还没有登录哦',
        content: '登录后体验「职位发布」 「提问咨询」等更多功能',
        confirmText: '立即登录',
        cancelText: '暂不登录',
        cancelColor: 'cancelColor',
        success: function (res) {
          if (res.cancel) {
            wx.switchTab({
              url: '../index/index',
            })
          } else {
            wx.navigateTo({
              url: '../login/login',
            })
          }
        }
      })
    }
    this.setData({
      userInfo
    })

    this.waitingReply()

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})