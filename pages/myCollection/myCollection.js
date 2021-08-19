// pages/myRelease/myRelease.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tags: [{
        id: 0,
        name: "加班适中",
      },
      {
        id: 1,
        name: "挑战性强",
      },
      {
        id: 2,
        name: "收获多多",
      }
    ],
    isTipsShow: true,
    save: []
  },
  //云函数-获取我收藏的职位
  getSavedPositions (e) {
   
    wx.cloud.callFunction({
      name: 'getSavedPosition',
    }).then(res => {
      const save = res.result.data.list[0].positions
      save.map((v, i) => {
        let reg = /(\d{4})-(\d{2})-(\d{2})/
        v.create_time.match(reg)
        v.create_time = RegExp.$2 + '-' + RegExp.$3
      })
      this.setData({
        save
      })
    }).catch(console.error)
  },
  // 云函数-取消收藏
  cancle (pid) {
    wx.cloud.callFunction({
      name: 'cancledSave',
      data: {
        pid
      },
    }).then(res => {
      wx.showModal({
        title: '成功',
        content: '取消成功',
        mask: true,
        showCancel: false
      })
    }).catch(console.error)
  },
  // 取消收藏
  handleItemRemove (e) {
    const pid = e.currentTarget.dataset.value
    const that = this
    wx.showActionSheet({
      itemList: ['取消收藏？'],
      success: function (e) {
        that.cancle(pid)
        that.getSavedPositions()
      }
    })
  },
  // 关闭提示框
  closeTips () {
    const isTipsShow = !this.data.isTipsShow
    this.setData({
      isTipsShow
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu({
      menus: ['shareAppMessage', 'shareTimeline']
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
    this.getSavedPositions()
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