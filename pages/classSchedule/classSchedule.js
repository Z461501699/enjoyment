const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeName: '1',
    classList: [{
      title: '课程',
      id: 1,
      children: {
        title: '课时表'
      }
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    // this.getClassList(options['id'])
  },
  onChange(event) {
    this.setData({
      activeName: event.detail,
    });
  },
  getClassList(subjectId) {
    App.request.start({
      apiKey: 'getClassList',
      params: {
        subjectId
      }
    }).then(res => {
      if (res.success) {

      }
    })
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