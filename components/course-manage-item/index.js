// components/course-manage-item/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    options: {
      type: Object,
      value: {}
    },
    studentId: {
      type: [String, Number]
    },
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
    handleRefund(e) {
      wx.showModal({
        title: '',
        content: '您确定要退款吗？',
        success: (res) => {
          if (res.confirm) {
            console.log(e)
            wx.navigateTo({
              url: `/pages/salesReturnForm/salesReturnForm?subjectId=${e.currentTarget.dataset.subjectid}&studentId=${this.data.studentId}`,
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    handleComment() {
      this.triggerEvent('comment')
    }
  }
})