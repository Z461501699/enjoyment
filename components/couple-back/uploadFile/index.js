// components/couple-back/uploadFile/index.js
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
    fileList: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    afterRead(event) {
      const { file } = event.detail;
      let fileList = this.data.fileList
      fileList.push({ url: file.path, ...file });
      this.setData({
        fileList
      }, () => {
        this.triggerEvent('upload', event.detail)
      });
    },
    onDelete(e) {
      let { fileList } = this.data
      const { index } = e.detail
      fileList = fileList.filter((t, i) => {
        return i != index
      })
      this.setData({
        fileList
      }, () => {
        this.triggerEvent('upload', { file: { path: '' } })
      })
    }
  }
})
