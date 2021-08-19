function addQuestion(qid, qcontent) {
  this.qid = qid + 1;
  this.qcontent = qcontent;
}
Page({
  data: {
    position: {},
    subscribe: true,
    days: "",
    questionList: [],
    appendQuestionList: [],
    totalqnum: 1,
    // 判断问题是否为空
    // 固定问题字数
    fixqLen: 0,
    questionLen: 100,
  },
  // 获取岗位信息
  getPositionById: function (e) {
    const that = this
    wx.cloud.callFunction({
      name: 'getPositionById',
      data: {
        pid: this.data.position._id
      }
    }).then(res => {
      that.setData({
        position: res.result.data.list[0]
      })
      that.getDay()
    }).catch(console.error)

  },
  //固定问题
  handleFixQuesrtionContent(e) {
    let questionList = this.data.questionList
    const {
      value
    } = e.detail
    questionList[0] = value
    const fixqLen = parseInt(value.length)
    this.setData({
      questionList,
      fixqLen
    })
    if(fixqLen==100){
      
    }
  },
  // 删除问题按钮
  handleRemoveQuestion(e) {
    console.log(e)
    const {
      index
    } = e.currentTarget.dataset;
    console.log(index);
    const appendQuestionList = this.data.appendQuestionList;
    appendQuestionList.splice(index, 1)
    let totalqnum = this.data.totalqnum;
    totalqnum -= 1;
    this.setData({
      appendQuestionList,
      totalqnum
    })
  },
  // 增加问题按钮
  handleAddQuestion() {
    let appendQuestionList = this.data.appendQuestionList;
    let totalqnum = this.data.totalqnum;
    appendQuestionList.push({
      addqLen: 0
    });
    totalqnum += 1;
    this.setData({
      appendQuestionList,
      totalqnum
    })
  },
  // 新增问题输入事件
  handleAddquesrtionContent(e) {
    const {
      index
    } = e.currentTarget.dataset
    const value = e.detail.value
    let appendQuestionList = this.data.appendQuestionList
    appendQuestionList[index].questionVal = value
    appendQuestionList[index].qid = index;
    appendQuestionList[index].addqLen = parseInt(value.length);
    this.setData({
      appendQuestionList
    })
  },
  // 提交表单
  submitQuestion() {
    const that = this
    const tmplID = 'HXYk-G1i2wENsdt0I_mJyD9xhvp-9erSq5aI7R5MEB0'
    wx.requestSubscribeMessage({
      tmplIds: [tmplID],
      success(res) {
        // 申请订阅成功
        if (res[tmplID] === 'accept') {
          // 这里将订阅的课程信息调用云函数存入云开发数据
          wx.showModal({
            title: '提交问题？',
            content: '问题提交后不可更改',
            cancelText: "取消",
            confirmText: "确定",
            success: function (res) {
              if (res.confirm) {
                that.saveQuestion()
               
              }
            }
          })
        }else{
          const {subscribe} = that.data
          that.setData({
            subscribe:false
          })
          wx.showModal({
            title: '提交问题？',
            content: '问题提交后不可更改',
            cancelText: "取消",
            confirmText: "确定",
            success: function (res) {
              if (res.confirm) {
                that.saveQuestion()
               
              }
            }
          })
        }
      }
    })
    

    // 是否需要验证？

  },
  // 云函数-提交问题
  saveQuestion(e) {
    let questions = this.data.questionList
    let appendQuestions = this.data.appendQuestionList
    let {subscribe} =  this.data
    let pid = this.data.position._id //职位的id
    let userid = this.data.position.user[0]._openid //被提问者的id
    for (let i = 0, len = questions.length; i < len; i++) {
      wx.cloud.callFunction({
        name: 'saveQuestion',
        data: {
          pid,
          question_no: i + 1,
          question: questions[i],
          userid,
          subscribe
        },
      }).then(res => {
        console.log(res)
      }).catch(console.error)
    }
    //如果追加问题列表不为空
    if (appendQuestions.length) {
      for (let i = 0, len = appendQuestions.length; i < len; i++) {
        wx.cloud.callFunction({
          name: 'saveQuestion',
          data: {
            pid: pid,
            question_no: i + 2,
            question: appendQuestions[i].questionVal,
            userid: userid,
          },
        }).then(res => {}).catch(console.error)
      }
    }
    wx.showLoading({
      title: '提交中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)    
    wx.redirectTo({
      url: '../myQuestion/myQuestion'
    })
  },
  // 获取几天前来过
  getDay(e) {
    let day1 = new Date(this.data.position.user[0].update_time)
    let day2 = new Date()
    let t = new Date(day2 - day1 + 16 * 3600 * 1000)
    let days = parseInt(t.getTime() / 1000 / 3600 / 24)
    this.setData({
      days: days
    })
  },
  onLoad: function (options) {
    this.setData({
      "position._id": options.pid,
    })
    this.getPositionById()
    wx.hideShareMenu({
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },
})