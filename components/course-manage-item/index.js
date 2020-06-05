// components/course-manage-item/index.js
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
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onToDetail(e) {
      console.log(e)
      this.triggerEvent('toDetail', { id: e.currentTarget.dataset.id })
    },
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