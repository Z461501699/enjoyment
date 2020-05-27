const App = getApp();
Page({
  data: {
    courseDetailData: {},
    studentList: [],
    keys: { label: 'Name', value: 'Id' },
    formData: {
      studentId: '',
      subjectId: '',
      amount: 0,
      amount1: '',
      payType: 3,
    },
    studentStatusData: {
      status: 0,
      message: '提交订单'
    },
    payTypeList: [{
      label: '钱包',
      Id: 1
    }, {
      label: '钱包+微信',
      Id: 2
    }, {
      label: '微信',
      Id: 3
    }],
    payKeys: { label: 'label', value: 'Id' },
  },
  onLoad: function (options) {
    let page = getCurrentPages().slice(-2)[0], courseDetailData = page.data.courseDetailData
    courseDetailData['showPrice'] = courseDetailData['PreferentialPrice'] / 100
    this.setData({
      courseDetailData
    }, () => {
      this.getSudentListByParent()
    })
  },
  formSubmit(e) {
    wx.showModal({
      title: '提示',
      content: '是否提交订单?',
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
    let { formData, courseDetailData } = this.data;
    formData['subjectId'] = courseDetailData['Id'];
    formData['amount'] = courseDetailData['PreferentialPrice'];
    console.log(formData)
    // return
    App.request.start({
      apiKey: "createOrder",
      params: formData,
      loadingMessage: '加载中',
    }).then(res => {
      if (res.success) {

      }
    })
  },
  onIptAmount(e) {
    console.log(e)
    let { formData } = this.data, amount1 = e.detail.value;
    this.setData({
      formData: {
        ...formData,
        amount1
      }
    })
  },
  onSelectPayType(e) {
    let { formData } = this.data, payType = e.detail.value;
    if (payType == 3) {
      formData['amount1'] = ''
    }
    this.setData({
      formData: {
        ...formData,
        payType
      },
    })
  },
  onSelectStudent(e) {
    let { formData, studentStatusData } = this.data, studentId = e.detail.value;
    this.getSignUpStatus(studentId, res => {
      console.log(res)
      studentStatusData.status = res.data

      if (res.data == 0) {
        studentStatusData.message = '提交订单'
        this.setData({
          formData: {
            ...formData,
            studentId
          },
          studentStatusData
        })
      } else {
        studentStatusData.message = res.message
        this.setData({
          studentStatusData
        })
      }

    })
  },
  getSudentListByParent() {
    let parentId = App.globalData.getUserId()
    App.request.start({
      apiKey: 'getSudentListByParent',
      params: {
        parentId
      },
      loadingMessage: '加载中',
    }).then(res => {
      if (res.success) {
        let studentList = res.data
        studentList = studentList.map(item => {
          // item['Avatar'] = `${App.Host}${item.Avatar}`
          return item
        })
        this.setData({
          studentList
        })
      }

    })
  },
  getSignUpStatus(studentId, back) {
    let { courseDetailData } = this.data;
    App.request.start({
      apiKey: 'getSignUpStatus',
      params: {
        studentId,
        subjectId: courseDetailData['Id']
      }
    }).then(res => {
      if (res.success) {
        back(res)
      }
    })
  },
})