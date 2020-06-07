// pages/salesReturnDetail/salesReturnDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    steps: [],
    active: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options', options)
    const steps = [
      {
        text: '发起退款',
        desc: options.CreateTime
      },
      {
        text: '退款中',
        desc: options.Flag === '2' ? options.RefundTime : ''
      },
      {
        text: '退款成功',
        desc: options.Flag === '2' ? options.RefundTime : ''
      }
    ]
    let active = 0;
    options.Flag == 2 ? active = 2 : active = 0
    this.setData({
      steps,
      active
    })
    console.log('detailOptions', options)
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