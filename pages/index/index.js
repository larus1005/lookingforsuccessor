//index.js
//获取应用实例
const app = getApp()
import {request} from "../../request/index.js"
Page({
  data: {
    //tabbar
    tabbar: {},
    // 城市
    currentCity:'',
    // motto: 'Hello World',
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
    // 获取轮播图数据
    swiperList:[],
    current: 'tab1',
    tabs:[
      {
        id:0,
        name:"运营/产品",
        isActive:true
      },
      {
        id:1,
        name:"研发",
        isActive:false
      },
      {
        id:2,
        name:"其他",
        isActive:false
      }
    ],
    content:{
      jobtitle:'腾讯-产品实习生（内容中台）',
      address:'上海',
      type:'研发',
      time:'1-23'
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
    ]
  },

// 切换tab栏+内容
  handleItem(e){
    const index = e.detail;
    let {tabs} = this.data
    tabs.forEach((v,i) => i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })
  },
  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  // 获取轮播图数据
  getSwiperList(){
    request({url:"/home/swiperdata"})
    .then(result=>{
      this.setData({
        swiperList:result
      })
    })
  },
  // 利用微信API获取系统信息
  getTopHeight(){

  },


  onLoad: function () {
    app.editTabbar();
    // wx.setNavigationBarColor(Object object)
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
    this.getSwiperList()
  },
  onShow:function(){
    app.editTabbar();
    const currentCity = app.globalData.currentCity
    console.log(app.globalData.currentCity);
    this.setData({
      currentCity
    })
  }
//   getUserInfo: function(e) {
//     console.log(e)
//     app.globalData.userInfo = e.detail.userInfo
//     this.setData({
//       userInfo: e.detail.userInfo,
//       hasUserInfo: true
//     })
//   }
})
