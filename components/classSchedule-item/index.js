// components/classSchedule-item/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    options: {
      type: Object,
      value: {}
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
    onToEvaluation(e) {
      wx.navigateTo({
        url: `/pages/courseEvaluation/courseEvaluation?subjectId=${e.currentTarget.dataset.id}`,
      })
    }
  }
})
