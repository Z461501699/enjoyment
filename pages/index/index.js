//index.js
//获取应用实例
const App = getApp()
import { formatTime, formatStatus } from "../course/format";

Page({
  data: {
    btnList: [{
      name: '课程',
      icon: '../../images/icon/icon_course.png',
      path: '/pages/courseManage/courseManager',
      color: '#F84819'
    }, {
      name: '订单',
      icon: '../../images/icon/icon_order.png',
      path: '/pages/order/order',
      color: '#2AA4F4'

    }, {
      name: '消息',
      icon: '../../images/icon/icon_message.png',
      path: '/pages/message/message',
      color: '#39C339'

    }, {
      name: '反馈',
      icon: '../../images/icon/icon_feedback.png',
      path: '/pages/coupleBack/coupleBack',
      color: '#F488C0'

    }],
    subjectList: [],
    schoolList: [],
    adList: []
  },
  onNavigate(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.path,
    })
  },
  onShow: function () {
    // App.userInfoReadyCallback = res => {
      this.getRecommendedSubjectList();
      this.getRecommendedSchoolList();
      this.getAdList()
    // }
  },
  getAdList() {
    App.request.start({
      apiKey: 'getAdList',
      params: {}
    }).then(res => {
      if (res.success) {
        let adList = res.data
        adList = adList.map(item => {
          item['ImgPath'] = `${App['Host']}${item['ImgPath']}`
          return item
        })
        this.setData({
          adList
        })
      }
    })
  },
  getRecommendedSchoolList() {
    App.request.start({
      apiKey: 'getRecommendedSchoolList',
      params: {}
    }).then(res => {
      if (res.success) {
        let schoolList = res.data
        schoolList = schoolList.map(item => {
          item['Logo'] = `${App['Host']}${item['Logo']}`
          return item
        })
        this.setData({
          schoolList
        })
      }
    })
  },
  getRecommendedSubjectList() {
    App.request.start({
      apiKey: 'getRecommendedSubjectList',
      params: {}
    }).then(res => {
      if (res.success) {
        let subjectList = res.data
        subjectList = subjectList.map(item => {
          item['Logo'] = `${App['Host']}${item['Logo']}`
          item['Status'] = formatStatus(item['Status'])
          item['StartTime'] = formatTime(item['StartTime'])
          return item
        })
        this.setData({
          subjectList
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  /**
 * 跳转到详情页
 */
  toSchoolDetail(e) {
    const {
      currentTarget
    } = e
    const {
      dataset
    } = currentTarget
    const {
      id
    } = dataset
    wx.navigateTo({
      url: `/pages/schoolDetail/schoolDetail?schoolId=${id}`,
    })
  },
  /**
   * 学校列表
   */
  onToSchoolList() {
    wx.switchTab({
      url: '/pages/school/school',
    })
  },
  /**
   * 跳转课程详情
   */
  onToCourseDetail(e) {
    console.log(e.detail.id)
    wx.navigateTo({
      url: `/pages/courseDetail/courseDetail?subjectId=${e.detail.id}`,
    })
  },
  /**
   * 课程列表
   */
  onToCourseList() {
    wx.switchTab({
      url: '/pages/course/course',
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getRecommendedSubjectList();
    this.getRecommendedSchoolList();
    this.getAdList();
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000);
  },
  onReachBottom: function () {

  },

})
