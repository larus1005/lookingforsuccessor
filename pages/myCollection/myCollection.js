// pages/myRelease/myRelease.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:[
      {
        id:'0',
        jobtitle:'腾讯-产品实习生（内容中台）',
        isFull:'转正机会',
        address:'深圳',
        day:'>4天/周',
        month:'>6个月',
        fee:'120-150/天'
      },
      {
        id:'1',
        jobtitle:'美团-运营实习生（美团美妆）',
        isFull:'',
        address:'上海',
        day:'>4天/周',
        month:'>3个月',
        fee:'120-150/天'
      }
    ],
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
    ]
  },
  handleItemRemove(e){
    const that =this
    const {index} = e.currentTarget.dataset;
    const content =this.data.content;
    wx.showActionSheet({
      itemList: ['确认删除？'],
      success: function (e) {
        content.splice(index,1)
        that.setData({
          content
        })
      }
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