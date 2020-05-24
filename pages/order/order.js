// pages/order/order.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderParams: {
      pageIndex: 1,
      PageSize: 10,
      memberId: '',
      orderList: [],
      active: 'all'
    },
    isLoadAll: false
  },
  toStudy() {
    console.log('去学习');

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
      data.forEach(item => {
        item.SubjectImg = App.Host + item.SubjectImg
      })
      that.setData({
        'orderParams.orderList': orderParams.orderList.concat(data),
        'orderParams.PageIndex': orderParams.PageIndex++,
        isLoadAll: orderParams.PageSize > data.length
      })
    })
  },
  // 初始数据
  initData(){
    this.setData({
      'orderParams.PageSize': 1,
      'orderParams.orderList':[]
    })
  },
  // 切换tabs
  onChange(event) {
    this.initData()
    this.setData({
      'orderParams.active': event.detail.name,
    })
    this.getOrderList()

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      'orderParams.active': options.type,
      'orderParams.memberId': App.request.getUser().userId,
    })
    this.getOrderList()
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
    if(this.data.isLoadAll) return
    this.getOrderList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})