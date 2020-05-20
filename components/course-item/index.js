// components/course-item/index.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    logoImg: String,
    name: String,
    classCount: Number,
    amount: Number,
    startTime: String,
    status: String,
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
    onToDetail(e) {
      this.triggerEvent('toDetail', { id: e.currentTarget.dataset.id })
    }
  }
})
