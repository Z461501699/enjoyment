// pages/courseManage/courseManager.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentList: [],
    studentId: null,
    classList: []
  },
  /**
 * 跳转课程详情
 */
  onToCourseDetail(e) {
    wx.navigateTo({
      url: `/pages/courseDetail/courseDetail?subjectId=${e.detail.id}&studentId=${this.data.studentId}`,
    })
  },
  // 切换学生
  handleChangeStudent(e) {
    const { detail } = e
    console.log('切换学生', detail);
    this.setData({
      studentId: detail,
      classList: []
    }, () => {
      this.getSubjectByStudentId()
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    this.getSudentListByParent()
  },
  getSubjectByStudentId() {
    let { studentId } = this.data
    App.request.start({
      apiKey: 'GetSubjectByStudentId',
      params: {
        studentId
      },
      loadingMessage: '加载中',
    }).then(res => {
      if (res.success) {
        let classList = res.data
        classList = classList.map(item => {
          item['Logo'] = `${App['Host']}${item['Logo']}`
          // item['Status'] = ['', '报名中', '开始', '结束'][item['Status']]
          return item
        })
        this.setData({
          classList
        })
      }
    })
  },
  getSudentListByParent() {
    let parentId = App.globalData.getUserId()
    App.request.start({
      apiKey: 'getSudentListByParent',
      params: {
        parentId
      },
      loadingMessage: '加载中',
    }).then(res => {
      if (res.success) {
        let studentList = res.data
        studentList = studentList.map(item => {
          item['text'] = item['Name']
          item['value'] = item['Id']
          return item
        })

        this.setData({
          studentList,
          studentId: studentList[0]['Id'],
          classList: []
        }, () => {
          this.getSubjectByStudentId()
        })
      }

    })
  },
})