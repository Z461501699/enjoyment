const App = getApp();

Page({
  data: {
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
    console.log('payMoney', options)
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
      courseDetailData
    } = this.data
    if (courseDetailData.Amount === courseDetailData.Amount1) {
      this.payPag()
    } else {
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
    if(data.success){
      wx.showToast({
        title: '报名成功'
      })
    }
    })
  },
  // 微信支付
  payWeiXin(){
    const {
      courseDetailData
    } = this.data
    App.request.start({
      apiKey: 'Payment',
      params: {
        orderId: courseDetailData.OrderId
      },
    }).then((data) => {
      if(data.success){
        wx.requestPayment({
          timeStamp: data.Timestamp,
          nonceStr: data.NonceStr,
          package: data.Package,
          signType: 'MD5',
          paySign: data.PaySign,
          success (res) { 
            console.log('success',res)
          },
          fail (res) {
            console.log('fail',res)
           }
        })
      }
    
   
    })
  }
  // 

})