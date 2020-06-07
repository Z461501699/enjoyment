// components/classSchedule-item/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    options: {
      type: Object,
      value: {}
    },
    subjectId: String
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
    onToViewComments(e) {
      let item = e.currentTarget.dataset.item
      wx.navigateTo({
        url: `/pages/viewComments/viewComments?subjectId=${this.data.subjectId}&AppraiseToTeacher=${item['AppraiseToTeacher']}&AppraiseToStudent=${item['AppraiseToStudent']}`,
      })
    }
  }
})
