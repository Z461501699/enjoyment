const App = getApp()
import {
  formatTime,
  formatStatus
} from "../course/format";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowAll: true, //显示隐藏
    subjectInfoParams: {
      subjectId: '',
    },
    teachersParams: {
      subjectId: '',
    },
    courseDetailData: {},
    teacherList: [],
    schoolInfo: {},
    options: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options', options);
    this.setData({
      options
    }, () => {
      this.getSubjectInfo(options)
      this.getTeachersBySubjectId(options)
    })
  },
  getList() {
    let { options } = this.data
    this.getSubjectInfo(options)
    this.getTeachersBySubjectId(options)
  },
  getSchoolInfo({
    schoolId
  }) {
    App.request.start({
      apiKey: 'getSchoolInfo',
      params: {
        schoolId
      },
      loadingMessage: '加载中',
    }).then(res => {
      console.log(res)
      if (res.success) {
        let schoolInfo = res.data
        schoolInfo['Logo'] = `${App['Host']}${schoolInfo['Logo']}`
        this.setData({
          schoolInfo
        })
      }
    })
  },
  getSubjectInfo({
    subjectId = null
  }) {
    let {
      subjectInfoParams,
      courseDetailData
    } = this.data
    subjectInfoParams['subjectId'] = subjectId
    App.request.start({
      apiKey: 'getSubjectInfo',
      params: subjectInfoParams,
      loadingMessage: '加载中',
    }).then(res => {
      console.log(res)
      if (res.success) {
        courseDetailData = res.data
        courseDetailData['StartTime'] = formatTime(courseDetailData['StartTime'])
        courseDetailData['Logo'] = `${App['Host']}${courseDetailData['Logo']}`
        courseDetailData['Status'] = formatStatus(courseDetailData['Status'])
        this.setData({
          courseDetailData
        }, () => {
          this.getSchoolInfo({
            schoolId: courseDetailData['BelongSchoolId']
          })
        })
      }
    })
  },
  getTeachersBySubjectId({
    subjectId = null
  }) {
    let {
      teachersParams,
      teacherList
    } = this.data
    teachersParams['subjectId'] = subjectId
    App.request.start({
      apiKey: "getTeachersBySubjectId",
      params: teachersParams
    }).then(res => {
      console.log(res)
      if (res.success) {
        teacherList = res.data
        teacherList = teacherList.map(item => {
          item['Avatar'] = `${App['Host']}${item['Avatar']}`
          return item
        })
        this.setData({
          teacherList
        })
      }
    })
  },
  toSchoolDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/schoolDetail/schoolDetail?schoolId=${id}`,
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
  onShowMoreMsg() {
    let {
      isShowAll
    } = this.data
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