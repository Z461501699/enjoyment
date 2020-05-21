// pages/schoolDetail/schoolDetail.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schoolId: '', // 学校id
    schoolInfo: null // 学校信息
  },
  onShowMoreMsg() {
    let {
      isShowAll
    } = this.data
    this.setData({
      isShowAll: !isShowAll
    })
  },
  // 获取学校详情信息
  getSchoolInfo(schoolId) {
    App.request.start({
      apiKey: 'getSchoolInfo',
      params: {
        schoolId
      },
      loadingMessage: '加载中',
    }).then(res => {
      console.log('schoolInfo', res);
      res.data['Logo'] = `${App['Host']}${res.data['Logo']}`
      this.setData({
        schoolInfo: res.data
      })
    })
  },
  /**
   * 跳转课程详情
   */
  onToCourseDetail(e) {
    console.log(e.detail.id)
    wx.navigateTo({
      url: '/pages/courseDetail/courseDetail',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      schoolId
    } = options
    this.getSchoolInfo(schoolId)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
})