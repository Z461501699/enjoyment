const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData: {
      refundAmount: '',
      subjectId: '',
      schoolId: '',
      content: '',
      offClassCount: '',
      totalClassCount: '',
      img1: '',
      img2: '',
      img3: '',
    },
    fileList: [],
    imagesList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.getRefundDetail(options)
  },
  getRefundDetail(params) {
    let { formData } = this.data;
    App.request.start({
      apiKey: "GetRefundDetail",
      params
    }).then(res => {
      if (res.success) {
        let infoItem = res.data
        this.setData({
          formData: {
            ...formData,
            offClassCount: infoItem.OffClassCount,
            totalClassCount: infoItem.TotalClassCount,
            subjectId: params.subjectId,
            refundAmount: infoItem.RefundAmount,
            schoolId: infoItem.SchoolId,
            studentId: params.studentId
          }
        })
      }
    })
  },
  formSubmit() {
    let { formData, imagesList } = this.data;
    imagesList.map((item, index) => {
      formData[`img${index + 1}`] = item
    })
    console.log(formData)
    wx.showModal({
      title: '提示',
      content: '是否退款?',
      success: (ress) => {
        if (ress.confirm) {
          App.request.start({
            apiKey: 'ApplyRefund',
            params: formData,
            loadingMessage: '加载中',
          }).then(res => {
            console.log(res)
            if (res.success) {
              wx.showToast({
                title: res.message,
                success: () => {
                  setTimeout(() => {
                    wx.navigateBack({
                      delta: 1,
                    })
                  }, 1500)
                }
              })
            }
          })
        } else if (ress.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 获取上传的图片
  getImages(e) {
    const {
      detail
    } = e
    const {
      file
    } = detail
    const {
      fileList
    } = this.data
    console.log('获取图片', file);
    file.forEach(el => {
      fileList.push(el)
    })
    this.setData({
      fileList
    }, () => {
      this.upload('fileList').then(res => {
        console.log(res)
      })
    })
  },
  // 删除图片
  handleDelImage(e) {
    console.log('del image', e);
    const {
      detail
    } = e
    const {
      index
    } = detail
    const {
      fileList
    } = this.data
    fileList.splice(index, 1)
    this.setData({
      fileList
    })
  },
  // 上传图片
  upload(listName) {
    const that = this
    const {
      fileList,
      imagesList
    } = that.data
    return new Promise((resolve, reject) => {
      const promiseAll = []
      that.data[listName].forEach(el => {
        promiseAll.push(
          App.request.uploadFile({
            apiKey: 'uploadFile',
            fileModule: 4,
            filePath: el.path,
            loadingMessage: '图片上传中'
          }).then(({
            data
          }) => {
            if (typeof data === 'string') {
              data = JSON.parse(data)
            }
            imagesList.push(data.Result)
            that.setData({
              imagesList
            })
          })
        )
        Promise.all(promiseAll).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    })


  },
})