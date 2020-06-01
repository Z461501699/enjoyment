// pages/schoolDetail/schoolDetail.js


const App = getApp()
import {formatStatus} from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schoolId: '', // 学校id
    schoolInfo: null, // 学校信息,
    schoolParams: {}
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
      res.data.TeacherList.forEach(item => (item.Avatar = App.Host + item.Avatar))
      res.data.SubjectList.forEach(item => {
        item.Logo = App.Host + item.Logo
        item['Status'] = formatStatus(item['Status'])
      })
      this.setData({
        schoolInfo: res.data
      })
      console.log('schoolInfo', this.data.schoolInfo)
    })
  },
  /* 
  获取课程教师列表 */
  getTeacherList(subjectId) {
    App.request.start({
        apiKey: 'getTeachersBySubjectId',
        params: {
          subjectId
        }
      })
      .then(data => {
        console.log('teacherList', data)
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
    console.log('options', options)
    const {
      schoolId
    } = options
    this.getSchoolInfo(schoolId)
    // this.getTeacherList(schoolId)
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
  // 复制学校手机号
  handleContactUs() {
    const {
      schoolInfo
    } = this.data
    const {
      Phone
    } = schoolInfo
    wx.setClipboardData({
      data: Phone
    })
  }
})