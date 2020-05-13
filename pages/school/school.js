// pages/school/school.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schoolList: [],
    pageSize: 10,
    pageNo: 1,
    isLoadAll: false
  },
  // 搜索功能
  search: function ({
    detail
  }) {
    console.log('e', detail)
  },

  // 获取学校数据
  getSchoolList() {
    const that = this
    wx.showLoading({
      title: '加载中。。。',
      mask: true
    })
    const {
      schoolList
    } = that.data
    schoolList.push('', '', '', '', '', '', '', '', '', '')
    setTimeout(function () {
      that.setData({
        schoolList
      })
      wx.hideLoading()
      wx.stopPullDownRefresh()
    }, 1500)
  },
  /**
   * 跳转到详情页
   */
  toDetail(e) {
    console.log('列表触发', e);
    wx.navigateTo({
      url: '/pages/schoolDetail/schoolDetail',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSchoolList()
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
    const that = this
    that.setData({
      schoolList: []
    })
    that.getSchoolList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getSchoolList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})