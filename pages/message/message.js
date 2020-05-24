// pages/message/message.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    options: {},
    messageParams: {
      PageSize: 10,
      PageIndex: 1,

    },
    isLoadAll: false,
    messageList: []
  },
  /*
  获取消息列表 
   */
  getMessageList() {
    const that = this
    const {
      data
    } = that
    const {
      messageParams,
      messageList
    } = data

    App.request.start({
        apiKey: 'getMessageList',
        loadingMessage: '加载中',
        params: messageParams
      }).then(({
        data
      }) => {
        console.log('data', data)
        messageParams.PageIndex++
        that.setData({
          messageList: messageList.concat(data),
          'messageParams.PageIndex': messageParams.PageIndex++,
          isLoadAll: messageParams.PageSize > data.length
        })
        wx.stopPullDownRefresh()
      })
      .catch(e => {
        wx.stopPullDownRefresh()
      })
  },
  /* 初始数据 */
  initData() {
    this.setData({
      messageList: [],
      "messageParams.PageIndex": 1,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      'messageParams.MemberId': App.request.getUser().userId
    })
    console.log('options', this.data.messageParams)
    this.getMessageList()
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
    this.getMessageList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.isLoadAll) return
    this.getMessageList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})