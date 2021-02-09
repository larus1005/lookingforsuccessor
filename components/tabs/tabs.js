// components/tabs/tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    Itemtabs:{
      type:Array,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handletabItems(e){
      // 获取被点击的索引
      const {index} =e.target.dataset;
      // 向父组件传递参数
      this.triggerEvent('mytap',index)
    }
  }
})
