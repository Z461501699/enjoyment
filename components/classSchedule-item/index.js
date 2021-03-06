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
    classId: String,
    studentId: String
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
        url: `/pages/viewComments/viewComments?classId=${this.data.classId}&AppraiseToTeacher=${item['AppraiseToTeacher']}&AppraiseToStudent=${item['AppraiseToStudent']}&studentId=${this.data.studentId}`,
      })
    }
  }
})
