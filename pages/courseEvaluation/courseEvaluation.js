// pages/coupleBack/coupleBack.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagesList: [],
    fileList: [],
    schoolList: [],
    postData: {
      parentsId: "",
      subjectId: "",
      content: "",
      img1: "",
      img2: "",
      img3: "",
    }
  },
  textareaHandle(e) {
    let { postData } = this.data;
    this.setData({
      postData: {
        ...postData,
        content: e.detail
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
  // 提交表单
  handleSubmit(e) {
    let { postData, imagesList } = this.data
    imagesList.map((item, index) => {
      postData[`img${index + 1}`] = item
    })
    console.log('dataBack', postData)
    App.request.start({
      apiKey: 'appraisea',
      params: postData
    }).then(data => {
      console.log('dataBack', data)
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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { postData } = this.data
    postData['parentsId'] = App.globalData.getUserId()
    postData['subjectId'] = options['subjectId']
    this.setData({
      postData
    }, () => {
    })
  },
})