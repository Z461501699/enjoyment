// components/couple-back/textarea/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    address:{
      type:String,
      value:'请输入反馈内容'
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
    getTextValue(e) {
      const {
        detail
      } = e
      const {
        value
      } = detail
      console.log('textarea', value);
      this.triggerEvent('textarea', value)
    }
  }
})