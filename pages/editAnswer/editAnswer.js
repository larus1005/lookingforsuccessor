// pages/editAnswer/editAnswer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    question: {},
    quizzer: ''

  },
  replyVal(e) {
    this.setData({
      "question.reply": e.detail.value
    })
  },

  saveReply(e) {
    wx.cloud.callFunction({
      name: 'saveReply',
      data: {
        reply: this.data.question.reply,
        qid: this.data.question._id
      },
    }).then(res => {
      wx.showToast({
        title: '回答成功',
      })
      wx.navigateBack({
        delta: 1, // 返回上一级页面。
      })
    
    }).catch(console.error)
   
  },

  getQuestion() {
    wx.cloud.callFunction({
      name: 'getQuestionById',
      data: {
        qid: this.data.question._id
      },
    }).then(res => {
      const question = res.result.data.list[0]
      const create_time = question.positionDetail[0].create_time
      let reg = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/
      create_time.match(reg)
      question.positionDetail[0].create_time = RegExp.$2 + '-' + RegExp.$3 + ' ' + RegExp.$4 + ':' + RegExp.$5
      this.setData({
        question
      })
      this.getUserInfo()
    }).catch(console.error)
  },
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      "question._id": options.qid,
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
    this.getQuestion()
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