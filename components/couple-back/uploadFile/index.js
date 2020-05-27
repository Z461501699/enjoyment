// components/couple-back/uploadFile/index.js
const App = getApp()
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
      let fileList = this.data.fileList;
      App.request.uploadFile({
        apiKey: 'uploadFile',
        fileModule: '1',
        filePath: file.path
      }).then(res => {
        console.log(res)
        if (res.success) {
          let data = JSON.parse(res.data)
          fileList.push({ url: file.path, ...file });
          this.setData({
            fileList
          }, () => {
            this.triggerEvent('upload', { value: data.Result })
          });
        }
      })

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
