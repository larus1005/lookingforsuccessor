// pages/myQuestion/myQuestion.js
Page({

  data: {
    job:[{
      id:0,
      status:1,
      jobtitle:"职位title1",
      question:"问题1",
      answer:"回答1",
      isFinished:true
    },
    {
      id:1,
      status:2,
      jobtitle:"职位title2",
      question:"问题2",
      answer:"回答2",
      isFinished:false
    },
    {
      id:2,
      status:3,
      jobtitle:"职位title3",
      question:"问题3",
      answer:"回答3",
      isFinished:false
    }
  ]
  },
 
 
  onLoad: function (options) {

  },
  onUnload: function () {
    wx.reLaunch({
      url: '../user/user'
    })
  }
})