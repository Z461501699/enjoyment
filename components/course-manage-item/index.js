// components/course-manage-item/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

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
    // 退款按钮
    handleRefund() {
      wx.showModal({
        title: '',
        content: '您确定要退款吗？',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    handleComment(){
      this.triggerEvent('comment')
    }
  }
})