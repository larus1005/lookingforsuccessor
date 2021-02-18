// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    position: {},
    saved: false,
    user: {}
  },
  // 收藏操作
  handleCollect(e) {
    const {
      saved
    } = this.data;
    if (saved) {
      wx.cloud.callFunction({
        name: 'cancledSave',
        data: {
          pid: '9f2a34705fe990e400d544686e3fec5e'
        },
      }).then(res => {
        console.log(res)
        wx.showModal({
          title: '成功',
          content: '取消收藏',
          showCancel: false,
          mask: true
        })
      }).catch(console.error)
    } else {
      wx.cloud.callFunction({
        name: 'savePosition',
        data: {
          pid: '9f2a34705fe990e400d544686e3fec5e'
        },
      }).then(res => {
        console.log(res) //返回两条记录
        wx.showModal({
          title: '成功',
          content: '收藏成功',
          showCancel: false,
          mask: true
        })
      }).catch(console.error)
    }
    this.setData({
      saved: !saved
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    // const userId = 'o8o4f5EW_DW2nckPcH2vpTC1krcY'


  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 获取职位信息
    wx.cloud.callFunction({
      name: 'getPositionById',
      data: {
        pid: "9f2a34705fe990e400d544686e3fec5e"
      }
    }).then(res => {
      console.log(res)
      this.setData({
        position: res.result.data.list[0]
      })
      console.log(this.data.position);
      wx.cloud.callFunction({
        name: 'getUser',
        data: {
          userid: this.data.position.user_id,
        },
      }).then(res => {
        const user = res.result.data.data[0]
        this.setData({
          user
        })
      }).catch(console.error)
    }).catch(console.error)
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