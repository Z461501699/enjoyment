// components/couple-back/input/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    placeholder: {
      value: "请输入内容",
      type: String
    },
    value: String
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
    onIpt(e) {
      this.triggerEvent('input', e.detail)
    }
  }
})
