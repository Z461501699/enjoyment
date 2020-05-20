const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowAll: true,//显示隐藏
    subjectInfoParams: {
      subjectId: '',
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSubjectInfo(options)
  },
  getSubjectInfo({ subjectId = null }) {
    let { subjectInfoParams } = this.data
    subjectInfoParams['subjectId'] = subjectId
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
  onShowMoreMsg() {
    let { isShowAll } = this.data
    this.setData({
      isShowAll: !isShowAll
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000);
  },
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  orderDetail() {
    wx.navigateTo({
      url: '/pages/order-detail/order-detail',
    })
  }
})