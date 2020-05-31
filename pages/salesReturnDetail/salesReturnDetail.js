// pages/salesReturnDetail/salesReturnDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    steps: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options',options)
    const steps = [
      {
        text: options.Flag === '1' ? '未退款':'退款成功',
        desc: options.RefundTime
      },
      {
        text: '银行处理',
        desc: options.RefundTime
      },
      {
        text: '发起退款',
        desc: options.CreateTime
      }
    ]
    this.setData({
      steps
    })
    console.log('detailOptions',options)
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