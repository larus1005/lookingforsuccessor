// pages/answerDetail/answerDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    position: {},
    days: 0,
    question: {},
    quizzer: '',
    replier: {}
  },
  // 获取职位信息
  getPositionById(e) {
    const that = this
    const {
      position
    } = that.data
    wx.cloud.callFunction({
      name: 'getPositionById',
      data: {
        pid: position._id
      }
    }).then(res => {
      const replier = res.result.data.list[0].user[0]
      that.setData({
        replier
      })
      that.getDay()
    }).catch(console.error)
  },
  getDay(e) {
    let day1 = new Date(this.data.replier.update_time)
    let day2 = new Date()
    let t = new Date(day2 - day1 + 16 * 3600 * 1000)
    let days = parseInt(t.getTime() / 1000 / 3600 / 24)
    this.setData({
      days: days
    })
  },
  //  获取问题信息
  getQuestion() {
    wx.cloud.callFunction({
      name: 'getQuestionById',
      data: {
        qid: this.data.question._id
      },
    }).then(res => {
      const question = res.result.data.list[0]
      // 修改发布日期格式
      const create_time = res.result.data.list[0].create_time
      const reply_time = res.result.data.list[0].reply_time
      let reg = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/
      create_time.match(reg)
      
      question.create_time = RegExp.$2 + '-' + RegExp.$3 + ' ' + RegExp.$4 + ':' + RegExp.$5
      reply_time.match(reg)
      question.reply_time = RegExp.$2 + '-' + RegExp.$3 + ' ' + RegExp.$4 + ':' + RegExp.$5
      const position = question.positionDetail[0]
      this.setData({
        question,
        position
      })
      // 获取提问者信息
      this.getUserInfo(),
        this.getPositionById()
    }).catch(console.error)
  },
  // 获取提问者信息
  getUserInfo: function (e) {
    wx.cloud.callFunction({
      name: 'getUserAvatar',
      data: {
        uid: this.data.question.quizzer_id,
      },
    }).then(res => {
      this.setData({
        quizzer: res.result.data.data[0].nickname
      })
    }).catch(console.error)
  },
  // 写评价按钮
  evaluate(){
    wx.redirectTo({
      url: '../evaluate/evaluate',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      ['question._id']: options.qid,
    })
    this.getQuestion()
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