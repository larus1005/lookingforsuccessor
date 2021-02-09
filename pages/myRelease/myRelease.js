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
      itemList: ['下线职位','编辑职位'],

      success: function (res) {
        // 下线职位
        if(res.tapIndex===0){
          wx.showModal({
            cancelColor: 'cancelColor',
            title: '提示',
            content: '确认下线该职位？',
            success (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                content.splice(index,1)
                that.setData({
                  content
                })
                wx.showToast({
                  title: '已删除',
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
                
            }
          }
          })
       // 编辑职位，跳转到tabbar页面
      }else{
        console.log('跳转到职位编辑页面')
        // wx.switchTab({
        //   url: '/index',
        // })
      }

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
    wx.reLaunch({
      url: '../user/user'
    })
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