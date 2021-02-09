// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    job:{
      jobtitle:'腾讯-产品实习生（内容中台）',
      address:'上海',
      type:'产品',
      releasetime:'1月23日',
      
    },
    tags:[
      {
        id:0,
        name:"加班适中",
      },
      {
        id:1,
        name:"挑战性强",
      },
      {
        id:2,
        name:"收获多多",
      }
    ],
    lastLogin:'2',
    seniorName:'王了了',
    isCollect:false
  },
  // 收藏成功提示
  handleCollect(e){
    const {isCollect} = this.data;
    if(isCollect){
      wx.showToast({
        title: '取消收藏',
        icon:'false',
        mask:true
      })
    }else{
      wx.showToast({
        title: '收藏成功',
        mask:'true'
      })
    }
    this.setData({
      isCollect:!isCollect
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