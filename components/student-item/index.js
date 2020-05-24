// components/student-item/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    options: Object
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
    onView(e) {
      this.triggerEvent('view', { id: 1 })
    },
    onEdit(e) {
      this.triggerEvent('edit', { id: 1 })
    },
  }
})
