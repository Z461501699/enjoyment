// pages/order/order.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderParams:{
      memberId: '',
      orderList:[],
      active:'all'
    },
    active:'all'
  },
  toStudy(){
    console.log('去学习');
    
  },
  // 获取订单列表
  getOrderList(){
   const that  =this
   that.data.orderParams.memberId = App.request.getUser().userId
   const {data:{orderParams}} = that
    App.request.start({
      apiKey:'getOrderList',
      params:orderParams
    }).then(({data}) =>{
      data.forEach(item =>{
        item.SubjectImg = App.Host +  item.SubjectImg
      })
      that.setData({'orderList':data})
      console.log('data',data)
    })
  },
  // 
  onChange(event) {
    this.setData({'orderParams.active': event.detail.name})
    console.log('orderParams',this.data.orderParams)
    this.getOrderList()

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({'orderParams.active': options.type})
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