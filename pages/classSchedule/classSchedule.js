const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subjectId: '',
    classList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.getSubjectByStudentId(options['id'])
  },
  onToDetail(e){
    wx.navigateTo({
      url: `/pages/courseDetail/courseDetail?subjectId=${e.currentTarget.dataset.id}`,
    })
  },
  onChange(event) {
    this.setData({
      subjectId: event.detail,
    }, () => {
      this.getClassList()
    });
  },
  getSubjectByStudentId(studentId) {
    App.request.start({
      apiKey: 'GetSubjectByStudentId',
      params: {
        studentId
      },
      loadingMessage: '加载中',
    }).then(res => {
      if (res.success) {
        let classList = res.data
        this.setData({
          classList
        })
      }
    })
  },
  getClassList() {
    let { classList, subjectId } = this.data, idx = null;
    classList.forEach((item, index) => {
      if (item['Id'] === subjectId) {
        idx = index
      }
      return item
    })
    if (!subjectId) return
    if (classList[idx].children) return
    App.request.start({
      apiKey: 'getClassList',
      params: {
        subjectId
      },
      loadingMessage: '加载中',
    }).then(res => {
      if (res.success) {
        classList[idx].children = res.data
        this.setData({
          classList
        })
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