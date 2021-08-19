// pages/myQuestion/myQuestion.js
Page({

  data: {
    job: [{
        id: 0,
        status: 1,
        jobtitle: "职位title1",
        question: "问题1",
        answer: "回答1",
        isFinished: true
      },
      {
        id: 1,
        status: 2,
        jobtitle: "职位title2",
        question: "问题2",
        answer: "回答2",
        isFinished: false
      },
      {
        id: 2,
        status: 3,
        jobtitle: "职位title3",
        question: "问题3",
        answer: "回答3",
        isFinished: false
      }
    ],
    send: []
  },
  getSendQuestions(e) {
    wx.cloud.callFunction({
      name: 'getSendQuestions',
    }).then(res => {
      const send = res.result.data.list
      send.map((v, i) => {
        let reg = /(\d{4})-(\d{2})-(\d{2})/
        v.create_time.match(reg)
        v.create_time = RegExp.$1 + '-' + RegExp.$2 + '-' + RegExp.$3
      })
      this.setData({
        send
      })
    }).catch(console.error)
  },

  onLoad: function (options) {
   
    wx.hideShareMenu({
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },
  onShow:function () {
    this.getSendQuestions()
  },
  onUnload: function () {
    wx.reLaunch({
      url: '../user/user'
    })
  }
})