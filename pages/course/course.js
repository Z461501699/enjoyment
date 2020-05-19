// pages/course/course.js
import { HEADER_SELECT_TITLES, HEADER_SELECT_OPTIONS } from '../../config/commonData'
const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseList: [],
    pageSize: 10,
    pageNo: 1,
    isLoadAll: false,
    selectTitles: HEADER_SELECT_TITLES,
    selectOptions: HEADER_SELECT_OPTIONS,
    courseListParams: {
      Name: '',
      Status: '',
      BelongSchoolId: '',
      BelongTeacherId: '',
      Ids: '',
      PageSize: 10,
      PageIndex: 0,
    }
  },
  // 下拉回调
  change(e) {
    console.log('change', e)
  },
  // 搜索功能
  handleSearch({ detail }) {
    console.log('搜索', detail)
  },
  // 获取课程数据
  getCourseList() {
    let {
      courseList,
      courseListParams
    } = this.data
    App.request.start({
      apiKey: 'getSubjectList',
      params: courseListParams,
      loadingMessage:'加载中',
    }).then(res => {
      console.log(res)
    })
    // setTimeout(function () {
    //   that.setData({
    //     courseList
    //   })
    //   wx.hideLoading()
    //   wx.stopPullDownRefresh()
    // }, 1500)
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
    this.getCourseList()

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
      courseList: []
    })
    that.getCourseList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getCourseList()

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})