const App = getApp();

Page({
  data: {
    payState: true,
    params: {

    },
    orderId: '',
    courseDetailData: {}
  },
  onLoad(options) {
    this.setData({
      orderId: options.id
    })
    this.getPayDetail()
    this.getBPayState()
    console.log('payMoney', options)
  },
  getBPayState() {
    App.request.start({
      apiKey: 'GetBPayState',
      params: {},
      loadingMessage: '加载中',
    }).then(res => {
      console.log(res.data)
      this.setData({
        payState: res.data
      })
    })
  },
  // 获取付款详情
  getPayDetail() {
    const that = this
    App.request.start({
      apiKey: 'GetOrderInfo',
      params: {
        orderId: this.data.orderId,
      }
    }).then(({
      data
    }) => {
      data.SubjectImg = App.Host + data.SubjectImg
      that.setData({
        courseDetailData: data
      })
      console.log('pay', data)
    })
  },

  // 提交订单
  formSubmit() {
    const {
      courseDetailData, payState
    } = this.data
    if (courseDetailData.Amount === courseDetailData.Amount1) {
      this.payPag()
    } else if (payState) {
      this.payWeiXin()
    }
    console.log('data---', this.data.courseDetailData)

  },
  // 钱包支付
  payPag() {
    const {
      courseDetailData
    } = this.data
    App.request.start({
      apiKey: 'Payment',
      params: {
        orderId: courseDetailData.OrderId
      },
    }).then((data) => {
      if (data.success) {
        App.getSettingLogin()
        wx.showToast({
          title: '报名成功'
        })
      }
    })
  },
  // 微信支付
  payWeiXin() {
    const {
      courseDetailData
    } = this.data
    App.request.start({
      apiKey: 'Payment',
      params: {
        orderId: courseDetailData.OrderId
      },
    }).then((res) => {
      console.log(res)
      console.log(res.data.Timestamp)
      if (res.success) {
        wx.requestPayment({
          timeStamp: res.data.Timestamp,
          nonceStr: res.data.NonceStr,
          package: res.data.Package,
          signType: 'MD5',
          paySign: res.data.PaySign,
          success: (ress) => {
            console.log('success', ress)
            App.getSettingLogin()
            wx.navigateTo({ url: '/pages/courseManage/courseManager' })
          },
          fail(res) {
            console.log('fail', res)
          }
        })
      }


    })
  }
  // 

})