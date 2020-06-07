// pages/order/order.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [],
    active: 'all',
    orderParams: {
      PageIndex: 1,
      PageSize: 10,
      memberId: '',
      OrderStatus: ""
    },
    isLoadAll: false
  },
  toStudy({
    detail
  }) {
    if (detail.OrderStatus === 1) {
      wx.navigateTo({
        url: `/pages/pay-money/pay-money?id=${detail.OrderId}`,

      });

    }
  },
  // 获取订单列表
  getOrderList() {
    const that = this
    const {
      data: {
        orderParams
      }
    } = that
    App.request.start({
      apiKey: 'getOrderList',
      params: orderParams
    }).then(({
      data
    }) => {
      if (data && data.length) {
        data.forEach(item => {
          item.SubjectImg = App.Host + item.SubjectImg
          item.CreatTime = item.CreatTime.replace('T', ' ')
        })
        that.setData({
          orderList: data
        })
      }
    })
  },
  // 初始数据
  initData() {
    this.setData({
      'orderParams.PageIndex': 1,
      orderList: []
    })
  },
  // 切换tabs
  onChange(event) {
    console.log('event',event)
    this.setData({
      active: event.detail.name,
      'orderParams.OrderStatus': event.detail.name === 'all' ? '' : event.detail.name,
    })
    this.initData()
    this.getOrderList()

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options',options)
    const {
      active,
    } = this.data
    this.setData({
      active: options.type,
      'orderParams.OrderStatus': options.type ?options.type:'',
      'orderParams.memberId': App.globalData.getUserId(),
    }, () => {
      this.getOrderList()
    })
    // 当点击全部订单进入时在获取数据,因为tabs的change事件会导致加载两次列表数据

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
    this.initData()
    this.getOrderList()
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