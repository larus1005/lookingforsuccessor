// pages/release/release.js
var app = getApp()
var mail = require('../../utils/mailList')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 待编辑的岗位id
    positionId: app.globalData.editPositionID,
    // 表单提交内容
    position: {
      company: "",
      name: "",
      type: "请选择职位类型",
      location: "",
      detail: "",
      email: "",
      tag1: "",
      tag2: "",
      tag3: "",
      tip: "",
      // 判断是否需要订阅
      subscribe: true
    },
    // 加班，难度，收获标签
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
    // 校验项
    checkItem: {
      isCompany: true,
      isName: true,
      isType: true,
      isLocation: true,
      isDetail: true,
      isMail: true,
      istag1: true,
      istag2: true,
      istag3: true,
      isTip: true,

    },
    // 表单是否通过校验
    isFormCheck: true,
    // 前辈锦囊字数
    tipNowLen: 0,
    tipMaxLen: 100,
    // 前辈锦囊字数是否满足十五字
    istipLen: true,
    // 岗位类型列表
    itemList: ['产品', '运营', '技术', '职能', '设计', '其他职类'],
    // 是编辑还是新发布？
    isUpdate: false,
    // 合法邮箱
    isVlidatemail: true,

  },
  // 更新职位
  updatePosition(e) {
    //console.log(this.data.position.name)
    wx.cloud.callFunction({
      name: 'updatePositionById',
      data: {
        position: this.data.position,
      },
      success: res => {
        console.log('更新数据成功')
      }
    })
    //跳转
    wx.navigateTo({
      url: '../user/user',
    })
  },
  // 如果有人要编辑职位那么需要根据id获取要被编辑的岗位信息
  // 通过职位ID获取职位信息
  getPositionById() {
    const that = this
    wx.cloud.callFunction({
      name: 'getPositionById',
      data: {
        pid: this.data.positionId
      }
    }).then(res => {
      const position = res.result.data.list[0]
      //  可封装一下呀
      const {
        overtimetags
      } = this.data
      overtimetags.forEach((v, i) => {
        if (v.name == position.tag1) {
          v.isSelect = true
        }
      })
      const {
        difficultytags
      } = this.data
      difficultytags.forEach((v, i) => {
        if (v.name == position.tag2) {
          v.isSelect = true
        }
      })
      const {
        harvesttags
      } = this.data
      harvesttags.forEach((v, i) => {
        if (v.name == position.tag3) {
          v.isSelect = true
        }
      })
      //  修改前辈锦囊计数
      const tipNowLen = parseInt(position.tip.length)
      this.setData({
        position,
        overtimetags,
        difficultytags,
        harvesttags,
        tipNowLen
      })
      app.globalData.editPositionID = ''
    }).catch(console.error)

  },
  // 发布职位
  saveNewPosition: function () {
    wx.cloud.callFunction({
      name: 'addPosition',
      data: {
        position: this.data.position
      },
    }).then(res => {
      console.log(res)
    }).catch(console.error)
  },
  // 企业名称输入事件✔️
  companyInput(e) {
    this.setData({
      ['position.company']: e.detail.value,
      ['checkItem.isCompany']: true
    })
  },
  // 校验企业名称是否为空：点击提交数据为空可变为红色
  handleCheckCompany() {
    const {
      company
    } = this.data.position
    if (company === '') {
      this.setData({
        ['checkItem.isCompany']: false
      })
    }
  },
  // 岗位名称输入事件
  nameInput(e) {
    this.setData({
      ['position.name']: e.detail.value,
      ['checkItem.isName']: true
    })
  },
  // 校验岗位名称是否为空：点击提交数据为空可变为红色
  handleCheckName() {
    const {
      name
    } = this.data.position
    if (name === '') {
      this.setData({
        ['checkItem.isName']: false
      })
    }
  },
  // 选择岗位类型事件
  typeInput() {
    const that = this
    wx.showActionSheet({
      itemList: ['产品', '运营', '技术', '职能', '设计', '其他职类'],
      success: function (res) {
        console.log(res.tapIndex)
        const {
          itemList
        } = that.data
        const type = itemList[res.tapIndex]
        that.setData({
          ['position.type']: type,
          ['checkItem.isType']: true
        })
      }
    })
  },
  // 校验岗位类型
  handleCheckType() {
    const {
      type
    } = this.data.position
    if (type == '请选择职位类型') {
      this.setData({
        ['checkItem.isType']: false
      })
    }
  },
  // 选择工作城市
  locationInput(e) {
    // 跳转到全部城市选择页面
    wx.navigateTo({
      url: '../choosecity/choosecity',
    })
    // 全局变量改变选择城市
  },
  // 校验工作城市
  handleCheckLocation(e) {
    const {
      location
    } = this.data.position
    if (location == '例如：上海市') {
      this.setData({
        ['checkItem.isLocation']: false
      })
    }
  },
  // 邮箱输入事件
  emailInput(e) {
    const email = e.detail.value
    this.setData({
      ['position.email']: email,
      ['checkItem.isMail']: true
    })
  },
  // 校验邮箱
  handleCheckEmail(e) {
    const {
      email
    } = this.data.position
    if (email === '') {
      this.setData({
        ['checkItem.isMail']: false
      })
      return
    }
    // 校验企业邮箱
    const mailList = mail.mailList
    console.log(mailList)
    const validatemail = email.split("@")[1]
    console.log(validatemail)
    console.log(mailList.indexOf(validatemail))
    if (mailList.indexOf(validatemail) == -1) {
      this.setData({
        isVlidatemail: false
      })
    } else {
      this.setData({
        isVlidatemail: true
      })
    }
  },


  // 岗位详情输入事件
  detailInput(e) {
    const detail = e.detail.value
    this.setData({
      ['position.detail']: detail,
      ['checkItem.isDetail']: true
    })
  },
  // 校验岗位详情是否为空
  handleCheckDetail() {
    const {
      detail
    } = this.data.position
    if (detail === '') {
      this.setData({
        ['checkItem.isDetail']: false
      })
    }
  },
  // 加班情况tag
  handleovertimetags(e) {
    const {
      index
    } = e.currentTarget.dataset
    const overtimetags = this.data.overtimetags
    overtimetags.forEach((v, i) => i === index ? v.isSelect = true : v.isSelect = false)
    const tag1 = overtimetags[index].name
    this.setData({
      overtimetags,
      ['position.tag1']: tag1,
      ['checkItem.istag1']: true
    })
  },
  // 校验加班情况tag
  checkOvertime() {
    const {
      tag1
    } = this.data.position
    if (tag1 == '') {
      this.setData({
        ['checkItem.istag1']: false

      })
    }
  },
  // 工作难度tag
  handledifficultytags(e) {
    const {
      index
    } = e.currentTarget.dataset
    const difficultytags = this.data.difficultytags
    difficultytags.forEach((v, i) => i === index ? v.isSelect = true : v.isSelect = false)
    const tag2 = difficultytags[index].name
    this.setData({
      difficultytags,
      ['position.tag2']: tag2,
      ['checkItem.istag2']: true
    })
  },
  // 校验工作难度tag
  checkDifficulty() {
    const {
      tag2
    } = this.data.position
    if (tag2 == '') {
      this.setData({
        ['checkItem.istag2']: false,

      })
    }
  },
  // 整体收获tag
  handleharvesttags(e) {
    const {
      index
    } = e.currentTarget.dataset
    const harvesttags = this.data.harvesttags
    harvesttags.forEach((v, i) => i === index ? v.isSelect = true : v.isSelect = false)
    const tag3 = harvesttags[index].name
    this.setData({
      harvesttags,
      ['position.tag3']: tag3,
      ['checkItem.istag3']: true
    })
  },
  // 校验收获情况tag
  checkHarvest() {
    const {
      tag3
    } = this.data.position
    if (tag3 == '') {
      this.setData({
        ['checkItem.istag3']: false
      })
    }

  },
  // 前辈锦囊输入事件
  tipInput(e) {
    const tip = e.detail.value
    const tipNowLen = parseInt(tip.length)
    this.setData({
      tipNowLen,
      ['position.tip']: tip,
      ['checkItem.isTip']: true
    })

  },
  // 校验前辈锦囊
  handleCheckTip() {
    const {
      tip
    } = this.data.position
    if (tip === '') {
      this.setData({
        ['checkItem.isTip']: false
      })
      return
    }
    const {
      tipNowLen
    } = this.data
    if (tipNowLen < 8) {
      this.setData({
        istipLen: false
      })
    } else {
      this.setData({
        istipLen: true
      })
    }
  },

  // 表单提交事件
  Submit(e) {
    const that = this
    // 校验是否为空事件
    this.handleCheckCompany()
    this.handleCheckName()
    this.handleCheckType()
    this.handleCheckLocation()
    this.handleCheckEmail()
    this.handleCheckDetail()
    this.checkOvertime()
    this.checkDifficulty()
    this.checkHarvest()
    this.handleCheckTip()
    // 判断是否为空校验是否通过
    const {
      checkItem
    } = this.data

    for (let key in checkItem) {
      console.log(key + ':' + checkItem[key])
      if (checkItem[key] == false) {
        that.setData({
          isFormCheck: false
        })
        break
      } else {
        that.setData({
          isFormCheck: true
        })
      }
    }
    const {
      isFormCheck
    } = that.data
    if (!isFormCheck) {
      wx.showModal({
        title: '提交失败',
        content: '标红部分为必填项哟~',
        showCancel: false,
        confirmText: "立即填写",
      })
      return
    }
    // 异常校验
    // 判断前辈锦囊是否满十五字
    const {
      istipLen
    } = this.data
    if (!istipLen) {
      wx.showModal({
        title: '请在前辈锦囊里多留下些建议吧，要超过8个字哟',
        showCancel: false,
        confirmText: "立即填写",
      })
      return
    }
    // 邮箱合法校验
    const {
      isVlidatemail
    } = this.data
    if (!isVlidatemail) {
      wx.showModal({
        title: '提交失败',
        content: '企业邮箱核验未通过，请联系小助手微信：WZLan9767',
        showCancel: false,
        confirmText: "立即填写",
      })
      return
    }
    const {
      isUpdate
    } = this.data
    if (isUpdate) {
      that.updatePosition()
      wx.showToast({
        title: '修改成功',
      })
      wx.navigateBack({
        delta: 1, // 返回上一级页面。
        success: function () {
          console.log('成功！')
        }
      })
      return

    }
    const tmplID = 'ZCRFIawEZH7f5M5uHVveBlhufhbl1_jdxNt3bF0SxOc'
    wx.requestSubscribeMessage({
      tmplIds: [tmplID],
      success(res) {
        if (res[tmplID] === 'accept') {
          that.saveNewPosition()
          wx.showModal({
            title: "发布成功",
            content: "感谢分享，这份实习机会为可能会成为另一位萌新同学的职业起点。",
            showCancel: false,
            success(res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '../myRelease/myRelease',
                })
                console.log('用户点击确定')
              } else if (res.cancel) {}
            }
          })
        } else if (res[tmplID] === 'reject') {
          const {
            position
          } = that.data
          position.subscribe = false
          that.setData({
            position
          })
          that.saveNewPosition()
          wx.showModal({
            title: "发布成功",
            content: "感谢分享，这份实习机会为可能会成为另一位萌新同学的职业起点。",
            showCancel: false,
            success(res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '../myRelease/myRelease',
                })
                console.log('用户点击确定')
              } else if (res.cancel) {}
            }
          })
        }

      }
    })

    // 


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // const positionId = app.globalData.editPositionID
    const positionId = options.pid || ''
    this.setData({
      positionId
    })
    if (positionId !== '') {
      this.getPositionById()
      this.setData({
        isUpdate: true
      })
    }
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
    const userInfo = wx.getStorageSync('userInfo') || {}
    if (userInfo.nickName == undefined) {
      wx.showModal({
        title: '你还没有登录哦',
        content: '登录后体验「职位发布」 「提问咨询」等更多功能',
        confirmText: '立即登录',
        cancelText:'暂不登录',
        cancelColor: 'cancelColor',
        success: function (res) {
          if (res.cancel) {
            // 此处是直接退回还是禁止填写？
            wx.navigateBack({
              delta: 1
            })
          } else {
            wx.navigateTo({
              url: '../login/login',
            })
          }
        }
      })
    }
    // 更改选择城市
    this.setData({
      ['position.location']: app.globalData.chooseCity
    })
    const {
      location
    } = this.data.position
    if (location !== '例如：上海市') {
      this.setData({
        ['checkItem.isLocation']: true
      })
    }
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