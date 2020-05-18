Component({
  data: {
    fileList: [{
      url: 'https://img.yzcdn.cn/vant/leaf.jpg',
      name: '图片1'
    }, ],
    imageUrl:[1,2]
  },
  properties: {},
  methods: {
    uploadImg() {
      const _this = this
      console.log('-')
      wx.chooseImage({
        count: 3,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths
          _this.imageUrl = tempFilePaths
          console.log('res', res, _this.imageUrl)
        }
      })
    },

  }
})