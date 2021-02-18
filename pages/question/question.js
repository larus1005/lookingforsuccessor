function addQuestion(qid,qcontent){
  this.qid = qid+1;
  this.qcontent = qcontent;
}
// 当textarea输入时获取输内容
Page({

  data: {
    questionList:[],
    appendQuestionList:[
     
    ],
    totalqnum:1,
    
  },
  // 获取新增问题的输入内容 修改新增问题列表
  handleAddquesrtionContent(e){
    const {index} = e.currentTarget.dataset
    
    let appendQuestionList= this.data.appendQuestionList
    appendQuestionList[index].questionVal =  e.detail.value
    appendQuestionList[index].qid = index;
    console.log(appendQuestionList)
    this.setData({
      appendQuestionList
    })
  },
  // 添加问题
  handleAddQuestion(){
    let appendQuestionList = this.data.appendQuestionList;
    appendQuestionList.push({});
    console.log(appendQuestionList)
    let totalqnum = this.data.totalqnum;
    totalqnum += 1;
    this.setData({
      appendQuestionList,
      totalqnum
    })
  },
  // 删除问题
  handleREmoveQuestion(e){
    console.log(e)
    const {index} = e.currentTarget.dataset;
    console.log(index);
    const appendQuestionList = this.data.appendQuestionList;
    appendQuestionList.splice(index,1)
    let totalqnum = this.data.totalqnum;
    totalqnum -= 1;
    this.setData({
      appendQuestionList,
      totalqnum
    })
  },
  // 支付成功提示
  handlePay(){
    wx.showModal({
      title:"支付成功",
      showCancel:false,
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.redirectTo({
            url: '../myQuestion/myQuestion',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  onLoad: function (options) {

  }
  
})