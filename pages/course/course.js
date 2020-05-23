// pages/course/course.js
import { HEADER_SELECT_TITLES, HEADER_SELECT_OPTIONS } from '../../config/commonData'
const App = getApp();
import { formatTime, formatStatus } from "./format";
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
      Status: 1,
      BelongSchoolId: '',
      PageSize: 10,
      PageIndex: 1,
    }
  },
  // 下拉回调
  change(e) {
    console.log('change', e)
  },
  // 搜索功能
  handleSearch({ detail }) {
    console.log('搜索', detail)
    let { courseListParams } = this.data
    this.setData({
      courseListParams: {
        ...courseListParams,
        Name: detail
      }
    }, () => {
      this.getCourseList(1)
    })
  },
  // 获取课程数据
  getCourseList(num) {
    let {
      courseList,
      courseListParams
    } = this.data
    if (num == 1) {
      courseListParams['PageIndex'] = 1
      courseList = []
    }
    App.request.start({
      apiKey: 'getSubjectList',
      params: courseListParams,
      loadingMessage: '加载中',
    }).then(res => {
      console.log(res)
      if (res.success && res.data.length) {
        let newArr = res.data
        newArr = newArr.map(item => {
          item['Logo'] = `${App['Host']}${item['Logo']}`
          item['StartTime'] = formatTime(item['StartTime'])
          item['Status'] = formatStatus(item['Status'])
          return item
        })
        courseList = [...courseList, ...newArr]
        this.setData({
          courseList,
          courseListParams: {
            ...courseListParams,
            PageIndex: courseListParams['PageIndex'] + 1
          }
        })
      } else if (res.success) {
        wx.showToast({
          title: '已经加载全部',
          icon: 'none'
        })
      }
    })
  },
  /**
   * 跳转课程详情
   */
  onToCourseDetail(e) {
    wx.navigateTo({
      url: `/pages/courseDetail/courseDetail?subjectId=${e.detail.id}`,
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
    this.getCourseList(1)
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 750)
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