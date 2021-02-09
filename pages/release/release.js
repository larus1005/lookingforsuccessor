// pages/release/release.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    overtimetags: [{
        id: 0,
        name: "加班严重",
        isSelect: false
      },
      {
        id: 1,
        name: "加班适中",
        isSelect: false
      },
      {
        id: 2,
        name: "加班较少",
        isSelect: false
      }
    ],
    difficultytags: [{
        id: 0,
        name: "入门级工作",
        isSelect: false
      },
      {
        id: 1,
        name: "有一定挑战",
        isSelect: false
      },
      {
        id: 2,
        name: "挑战性强",
        isSelect: false
      }
    ],
    harvesttags: [{
        id: 0,
        name: "收获多多",
        isSelect: false
      },
      {
        id: 1,
        name: "收获较多",
        isSelect: false
      },
      {
        id: 2,
        name: "收获一般",
        isSelect: false
      }
    ],
    enterprise: '',
    jobName: '',
    jobType: '',
    address: '',
    mail: '',
    description: '',
    optionBoxshow: false,
    selectData: [{
        id: 0,
        type: '开发'
      }, {
        id: 1,
        type: '产品'
      },
      {
        id: 2,
        type: '运营'
      }
    ],
    shows: false,
    selectDatas: ['研发', '产品', '运营'],
    indexs: 0, 
  },
  // 点击下拉显示框
  selectTaps() {
    this.setData({
      shows: !this.data.shows,
    });
  },
  // 点击下拉列表
  optionTaps(e) {
    let Indexs = e.currentTarget.dataset.index;
    this.setData({
      indexs: Indexs,
      shows: !this.data.shows
    });

  },
  handleCheckEnterprise(){
    const enterprise = this.data.enterprise;
    if(enterprise===''){
      wx.showToast({
        title: '请输入企业名称',
      })
      return
    }
  },
  formSubmit(e) {
    console.log(e)
    wx.showModal({
      title: "发布成功",
      content: "感谢分享， 这份实习机会为可能会成为另一位萌新同学的职业起点。",
      showCancel: false,
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.redirectTo({
            url: '../myRelease/myRelease',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 先单独写，之后要记得封装
  // 加班情况tag选择考虑到表单提交方便
  handleovertimetags(e) {
    const {
      index
    } = e.currentTarget.dataset
    const overtimetags = this.data.overtimetags
    overtimetags.forEach((v, i) => i === index ? v.isSelect = true : v.isSelect = false)
    this.setData({
      overtimetags
    })
  },
  // 工作难度tag
  handledifficultytags(e) {
    const {
      index
    } = e.currentTarget.dataset
    const difficultytags = this.data.difficultytags
    difficultytags.forEach((v, i) => i === index ? v.isSelect = true : v.isSelect = false)
    this.setData({
      difficultytags
    })
  },
  // 整体收获tag
  handleharvesttags(e) {
    const {
      index
    } = e.currentTarget.dataset
    const harvesttags = this.data.overtimetags
    harvesttags.forEach((v, i) => i === index ? v.isSelect = true : v.isSelect = false)
    this.setData({
      harvesttags
    })
  },
  selectTap() {
    const {
      optionBoxshow
    } = !this.data
    this.setData({
      optionBoxshow
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