// pages/detail/detail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    position: {},
    saved: false,
    user: {},
    positionId: '',
    userInfo: {},
    loading: true,
    days: 0
  },
  getDay(e) {
    let day1 = new Date(this.data.position.user[0].update_time)
    let day2 = new Date()
    let t = new Date(day2 - day1 + 16 * 3600 * 1000)
    let days = parseInt(t.getTime() / 1000 / 3600 / 24)
    
    this.setData({
      days
    })
  },
  // 收藏操作
  handleCollect(e) {
    const userInfo = wx.getStorageSync('userInfo')|| {}
    if(userInfo.nickName==undefined){
      wx.navigateTo({
        url: '../login/login',
      })
      return
    }
    const {
      saved
    } = this.data
    if (saved === true) {
      wx.cloud.callFunction({
        name: 'cancledSave',
        data: {
          pid: this.data.position._id,
        },
      }).then(res => {
        wx.showToast({
          title: '取消收藏',
          icon: 'success',
          mask:true,
          duration: 2000
        })
        this.setData({
          saved: false
        })
      }).catch(console.error)
    } else {
      wx.cloud.callFunction({
        name: 'savePosition',
        data: {
          pid: this.data.position._id,
        },
      }).then(res => {
        wx.showToast({
          title: '收藏成功',
          icon: 'success',
          mask:true,
          duration: 2000
        })
        this.setData({
          saved: true
        })
      }).catch(console.error)
    }
    
  },
  // 通过职位ID获取职位信息
  getPositionById() {
    const that = this
    wx.cloud.callFunction({
      name: 'getPositionById',
      data: {
        pid: this.data.positionId
      }
    }).then(res => {
     const position = res.result.data.list[0]
     const create_time = position.create_time
     let reg = /(\d{4})-(\d{2})-(\d{2})/
     create_time.match(reg)
     position.create_time = RegExp.$2 + '月' + RegExp.$3 + '日发布' 
     
      this.setData({
        position: res.result.data.list[0]
      })
      that.getDay()
    }).catch(console.error)
    
  },
  // 获取用户收藏情况
  isSaved() {
    wx.cloud.callFunction({
      name: 'isSaved',
      data: {
        pid: this.data.positionId,
      }
    }).then(res => {
      if (res.result.data.data.length == 1) {
        this.setData({
          saved: true
        })
      }
    }).catch(console.error)
  },
  handleAsk(){
    const userInfo = wx.getStorageSync('userInfo')|| {}
    const {position} = this.data
    if(userInfo.nickName==undefined){
      wx.navigateTo({
        url: '../login/login',
      })
      return
    }else{
      wx.navigateTo({
        url: '../question/question?pid='+position._id,
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      positionId: options.pid,
    })
    this.getPositionById()
    this.isSaved()
    
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
  onShow: function () {},

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