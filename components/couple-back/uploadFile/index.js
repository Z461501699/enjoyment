// components/couple-back/uploadFile/index.js
const App = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: String,
    count:{
      type: Number,
      value:1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    fileList: [],
  },
  ready() {
    console.log(this.data.value)
    let { value } = this.data
    if (value) {
      this.setData({
        fileList: [{
          url: value
        }]
      })
    }
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
        if (res.success) {
          let data = JSON.parse(res.data)
          console.log('data', data)
          fileList.push({ url: file.path, ...file,value:data.Result });
          this.setData({
            fileList
          }, () => {
            this.triggerEvent('upload', {fileList, value: data.Result })
          });
        }
      }).catch(err => {
        console.log('err', err)
        wx.showToast({
          icon: 'none',
          title: err.Message,
        })
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
        this.triggerEvent('upload', {fileList, file: { path: '' } })
      })
    }
  }
})
