// components/order-item/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    options:{
      type:Object,
      value:{}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imageUrl: 'http://searchfoto.ru/img/xyygpKbDS1y8pTjXUy83VS8rMS9fLSy3RL8mwz0yx9fcM0EtJ0S2PyCnOy8sOSTMOqQq38I23NHf0SHTNV0vMLbAutzUyNgCzMmwNzSGsomJbQzCjIDnHNgUMwNx8W1OIMNBoQz1DAA.jpg'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bandleStudy() {
      this.triggerEvent('study', this.data.options)
    },
    cancelStudy() {
      this.triggerEvent('cancel', this.data.options)
    },
  }
})