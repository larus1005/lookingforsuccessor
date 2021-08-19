// pages/myRelease/myRelease.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tags: [{
        id: 0,
        name: "加班适中",
      },
      {
        id: 1,
        name: "挑战性强",
      },
      {
        id: 2,
        name: "收获多多",
      }
    ],
    isTipsShow: true,
    post: []
  },
  // 上线职位
  uploadPositionById(pid){
    console.log(pid)
    wx.cloud.callFunction({
      name: 'uploadPositionById',
      data: {
        pid:pid,
      },
    }).then(res => {
      console.log(res.result)
    }).catch(console.error)
    // this.getPostPositions()
  },
  // 下线职位
  deletePosition(pid) {
    console.log(pid)
    wx.cloud.callFunction({
      name: 'deletePositionById',
      data: {
        pid:pid,
      },
    }).then(res => {
      console.log(res.result)
    }).catch(console.error)
    // this.getPostPositions()
  },
  // 编辑页面
  updatePosition(pid) {
    console.log(pid)
    //跳转到编辑页面
    wx.navigateTo({
      url: '../release/release?pid='+pid,
    })
  },
  // 获取我发布的岗位
  getPostPositions(e) {
    wx.cloud.callFunction({
      name: 'getPostPositions',
    }).then(res => {
      const post = res.result.data.data
      post.map((v, i) => {
        let reg = /(\d{4})-(\d{2})-(\d{2})/
        v.create_time.match(reg)
        v.create_time = RegExp.$2 + '-' + RegExp.$3
      })
      this.setData({
        post
      })
    }).catch(console.error)
  },
  // 下线职位 恢复上线 或编辑
  handleItem(e) {
    const that = this
    const {
      index
    } = e.currentTarget.dataset;
    console.log(e)
    const {
      post
    } = this.data
    console.log('hello')
    console.log(post[index])
    console.log(post[index]._id)
    const pid = post[index]._id
    if (post[index].is_deleted == 1) {
      wx.showActionSheet({
        itemList: ['上线职位', '编辑职位'],
        success: function (res) {
          // 下线职位恢复上线、编辑
          if (res.tapIndex === 0) {
            wx.showModal({
              cancelColor: 'cancelColor',
              title: '提示',
              content: '确认恢复上线该职位？',
              success(res) {
                if (res.confirm) {
                  post[index].is_deleted = false
                  that.setData({
                    post
                  })
                  that.uploadPositionById(pid)
                  wx.showToast({
                    title: '已恢复上线该职位',
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
            // 编辑职位
          } else {
            console.log('用户点击编辑职位')
            that.updatePosition(pid)
          }
        }
      })
    } else {
      console.log(pid)
      wx.showActionSheet({
        itemList: ['下线职位'],
        success: function (res) {
          // 下线职位
          if (res.tapIndex === 0) {
            wx.showModal({
              cancelColor: 'cancelColor',
              title: '提示',
              content: '确认下线该职位？',
              success(res) {
                if (res.confirm) {
                  post[index].is_deleted = true
                  that.setData({
                    post
                  })
                  that.deletePosition(pid)
                  wx.showToast({
                    title: '已下线该职位',
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
        }
      })
    }

  },
  // 关闭提示框
  closeTips() {
    console.log('关闭提示')
    const isTipsShow = !this.data.isTipsShow
    this.setData({
      isTipsShow
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPostPositions()
    wx.hideShareMenu({
      menus: ['shareAppMessage', 'shareTimeline']
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
    this.getPostPositions()
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