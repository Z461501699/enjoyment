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
      schoolId: "",
      feedbackType: 0,
      content: "",
      flag: 0,
      img1: "",
      img2: "",
      img3: "",
    }
  },
  // 获取changePicker事件
  changePicker(e) {
    console.log('e--', e.detail)
    this.setData({
      'postData.feedbackType': Number(e.detail)
    })
  },
  // 获取changePicker事件
  changePicker2(e) {
    console.log('e+++', e.detail)
    this.setData({
      'postData.schoolId': e.detail.id
    })
  },
  textareaHandle(e) {
    this.setData({
      'postData.content': e.detail
    })
    console.log('e', this.data.postData)
  },
  // 获取投诉建议
  getSchoolListByMember() {
    const that = this
    App.request.start({
      apiKey: `GetSchoolListByMember`,
      params: {
        memberId: App.globalData.getUserId()
      }
    }).then(({ data }) => {
      if (data && data.length) {
        data.forEach((item) => {
          item.text = item.SchoolName,
            item.id = item.Id
        })
      }
      that.setData({
        schoolList: data || []
      })
      console.log('data----', data)
    })
  },
  onChange(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    Toast(`当前值：${value}, 当前索引：${index}`);
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
    postData['parentsId'] = App.globalData.getUserId()
    console.log('dataBack', postData)
    App.request.start({
      apiKeys: 'feedBack',
      data: postData
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
    console.log('data----', App.globalData.getUserId())
    this.getSchoolListByMember()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})