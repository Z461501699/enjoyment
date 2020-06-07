// pages/studentInfoEdit/studentInfoEdit.js
const App = getApp()
Page({
  data: {
    formData: {
      Name: '',
      Sex: '',
      Age: '',
      SchoolName: '',
      SchoolGrade: '',
      SchoolClass: '',
      SchoolNumber: '',
      Avatar: '',
      ParentId: '',
      Content:''
    },
    GradeList: [
      {
        label: '一年级',
        value: '一年级'
      }, {
        label: '二年级',
        value: '二年级'
      }, {
        label: '三年级',
        value: '三年级'
      }, {
        label: '四年级',
        value: '四年级'
      }, {
        label: '五年级',
        value: '五年级'
      }, {
        label: '六年级',
        value: '六年级'
      }
    ],
    SchoolClassList: [
      {
        label: '一班',
        value: '一班'
      }, {
        label: '二班',
        value: '二班'
      }, {
        label: '三班',
        value: '三班'
      }, {
        label: '四班',
        value: '四班'
      }, {
        label: '五班',
        value: '五班'
      }, {
        label: '六班',
        value: '六班'
      }, {
        label: '七班',
        value: '七班'
      }, {
        label: '八班',
        value: '八班'
      },
    ],
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
  verifyData(data) {
    if (!data['Name']) {
      wx.showToast({
        icon: 'none',
        title: '请输入学生姓名',
      })
      return true
    }else if (!data['Content']) {
      wx.showToast({
        icon: 'none',
        title: '请输入退款说明',
      })
      return true
    } else if (!data['Avatar']) {
      wx.showToast({
        icon: 'none',
        title: '请上传头像',
      })
      return true
    } else if (!data['Sex']) {
      wx.showToast({
        icon: 'none',
        title: '选择性别',
      })
      return true
    }
    return false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    let { formData, type } = this.data, apiKey = ''
    console.log(App.globalData.getToken())
    if (this.verifyData(formData)) return
    console.log(App.globalData.getToken())
    wx.showModal({
      title: '提示',
      content: '是否添加学生?',
      success: (res) => {
        if (res.confirm) {

          // if (type === 'edit') apiKey = '';
          // if (type === 'add') apiKey = 'addStudentInfo';
          App.request.start({
            apiKey: 'addStudentInfo',
            params: formData,
            loadingMessage: '加载中',
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
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
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
  onChangeSchoolClass(e) {
    console.log(e)
    let { formData } = this.data
    this.setData({
      formData: {
        ...formData,
        SchoolClass: e.detail.value
      }
    })
  },
  onChangeGrade(e) {
    console.log(e)
    let { formData } = this.data
    this.setData({
      formData: {
        ...formData,
        SchoolGrade: e.detail.value
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