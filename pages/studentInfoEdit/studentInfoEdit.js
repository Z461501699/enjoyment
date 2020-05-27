// pages/studentInfoEdit/studentInfoEdit.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData: {
      Name: '',
      Sex: '',
      SchoolName: '',
      SchoolGrade: '',
      SchoolClass: '',
      SchoolNumber: '',
      Avatar: '',
      ParentId: ''
    },
    sexList: [{
      label: '男',
      value: 1
    }, {
      label: '女',
      value: 2
    }],
    sexKey: {
      label: 'label',
      value: 'value'
    },
    type: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let type = options['type']
    if (options['type'] === 'edit') {
      this.edit()

    } else {
      this.add()
    }
    this.setData({
      type
    })
  },
  onIpt(e) {
    console.log(e)
    let { formData } = this.data,
      value = e.detail.value,
      label = e.currentTarget.dataset.formlabel
    console.log(label)
    this.setData({
      formData: {
        ...formData,
        [label]: value
      }
    })
  },

  add() {
    let { formData } = this.data,
      ParentId = App.globalData.getUserId()
    this.setData({
      formData: {
        ...formData,
        ParentId
      }
    })
  },
  edit() {
    let page = getCurrentPages().slice(-2)[0];
    let selectItem = page.data.selectItem, { formData } = this.data;
    formData['ParentId'] = App.globalData.getUserId()
    formData['Name'] = selectItem['Name'];
    formData['Sex'] = selectItem['Sex'];
    formData['SchoolName'] = selectItem['SchoolName'];
    formData['SchoolGrade'] = selectItem['SchoolGrade'];
    formData['SchoolNumber'] = selectItem['SchoolNumber'];
    formData['SchoolClass'] = selectItem['SchoolClass'];
    // formData['Avatar'] = selectItem['Avatar'];
    this.setData({
      formData
    })
  },
  formSubmit(e) {
    wx.showModal({
      title: '提示',
      content: '是否添加学生?',
      success: (res) => {
        if (res.confirm) {
          this.submit(e)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  submit(e) {
    let { formData, type } = this.data, apiKey = ''
    console.log(formData)
    if (type === 'edit') apiKey = '';
    if (type === 'add') apiKey = 'addStudentInfo';
    App.request.start({
      apiKey,
      params: formData
    }).then(res => {
      console.log(res)
      if (res.success) {
        wx.showToast({
          title: res.message,
          success: () => {
            let page = getCurrentPages().slice(-2)[0];
            setTimeout(() => {
              if (page.getList) page.getList()
              wx.navigateBack({
                delta: 1,
              })
            }, 1500)
          }
        })
      }
    })

  },
  onChangeSex(e) {
    console.log(e)
    let { formData } = this.data
    this.setData({
      formData: {
        ...formData,
        Sex: e.detail.value
      }
    })
  },

  onUploadAvata(e) {
    console.log(e)
    let { formData } = this.data
    this.setData({
      formData: {
        ...formData,
        Avatar: e.detail.value
      }
    })
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