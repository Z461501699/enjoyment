const App = getApp();
Page({
  data: {
    payState: true,
    courseDetailData: {},
    studentList: [],
    keys: {
      label: 'Name',
      value: 'Id'
    },
    formData: {
      studentId: '',
      subjectId: '',
      amount: 0,
      amount1: '',
      payType: 1,
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
    payKeys: {
      label: 'label',
      value: 'Id'
    },
  },
  onLoad: function (options) {
    let page = getCurrentPages().slice(-2)[0],
      courseDetailData = page.data.courseDetailData
    courseDetailData['showPrice'] = courseDetailData['PreferentialPrice']
    this.payType(courseDetailData['showPrice'])
    console.log('==', courseDetailData['showPrice'], this.data.formData)
    this.setData({
      courseDetailData
    }, () => {
      this.getSudentListByParent()
      this.getBPayState()
    })
  },
  getBPayState() {
    App.request.start({
      apiKey: 'GetBPayState',
      params: {},
      loadingMessage: '加载中',
    }).then(res => {
      console.log('getBPayState', res.data)
      this.setData({
        payState: res.data
      })
    })
  },
  // 处理支付方式
  payType(m) {
    m = m * 1
    const {
      formData
    } = this.data
    const money = App.globalData.getUserInfo().Wallet || 0
    if (!money) {
      return this.setData({
        'formData.payType': 3,
        'formData.amount1': 0,
      })
    } else if (money < m && money > 0) {
      return this.setData({
        'formData.payType': 2,
        'formData.amount1': money
      })
    } else {
      return this.setData({
        'formData.payType': 1,
        'formData.amount1': m
      })
    }
  },
  formSubmit(e) {
    wx.showModal({
      title: '提示',
      content: '是否提交订单?',
      success: (res) => {
        if (res.confirm) {
          console.log('this',this.data)
          if (this.data.payState) {

            this.submit(e)
          } else {
              
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  submit(e) {
    const that = this
    let {
      formData,
      courseDetailData
    } = this.data;
    formData['subjectId'] = courseDetailData['Id'];
    formData['amount'] = courseDetailData['PreferentialPrice'];
    if (!formData['amount1']) formData['amount1'] = 0
    console.log('formData', formData)
    // return
    App.request.start({
      apiKey: "createOrder",
      params: formData,
      loadingMessage: '加载中',
    }).then(res => {
      if (res.success) {
        console.log('res----', res)
        this.payMent(res.data)
      }
    })
  },
  // 去付款
  payMent(orderId) {

    console.log('orderId', orderId)
    App.request.start({
      apiKey: "Payment",
      params: { orderId },
    }).then(({ data, success }) => {
      console.log('payMent', data)
      if (success) {
        if(this.data.formData.payType !== 1){
          wx.requestPayment({
            timeStamp: data.Timestamp,
            nonceStr: data.NonceStr,
            package: data.Package,
            signType: 'MD5',
            paySign: data.PaySign,
            success(data) {
              console.log('success', data)
              wx.navigateTo({ url: '/pages/courseManage/courseManager' })
              // wx.showToast({
              //   title: data.errMsg,
              //   success: () => {
              //     if (data.success) {
              //       let page = getCurrentPages().slice(-2)[0];
              //       setTimeout(() => {
              //         if (page.getList) page.getList()
              //         wx.navigateBack({
              //           delta: 1,
              //         })
              //       }, 1500)
              //     }
  
              //   }
              // })
            },
            fail(res) {
              console.log('fail', res)
            }
          })
        } else {
          wx.navigateTo({ url: '/pages/courseManage/courseManager' })
        };
      }
    })
  },
  onIptAmount(e) {
    console.log(e)
    let {
      formData
    } = this.data, amount1 = e.detail.value;
    this.setData({
      formData: {
        ...formData,
        amount1
      }
    })
  },
  onSelectPayType(e) {
    let {
      formData
    } = this.data, payType = e.detail.value;
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
    let {
      formData,
      studentStatusData
    } = this.data, studentId = e.detail.value;
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
        if (studentList.length > 0) {
          studentList = studentList.map(item => {
            // item['Avatar'] = `${App.Host}${item.Avatar}`
            return item
          })
          this.setData({
            studentList
          })
        } else if (studentList.length == 0) {
          wx.showToast({
            title: '先绑定学生',
            success: () => {
              setTimeout(() => {
                wx.navigateTo({
                  url: '/pages/studentManage/studentManage',
                })
              }, 1500)
            }
          })
        }

      }

    })
  },
  getSignUpStatus(studentId, back) {
    let {
      courseDetailData
    } = this.data;
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