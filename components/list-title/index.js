// components/list-title/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 标题信息
    title: {
      value: '列表',
      type: String
    },
    showMore:{
      type:Boolean,
      value:false
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
    more() {
      this.triggerEvent('click')
    }
  }
})