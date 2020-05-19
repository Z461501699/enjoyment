//index.js
//获取应用实例
const app = getApp()
import { closeLoading, openLoading } from '../../utils/pagination'
Page({
  data: {
    isShowLoginModule: false,
    btnList: [{
      name: '课程',
      icon: '../../images/icon/icon_course.png',
      path: '/pages/courseManage/courseManager'
    }, {
      name: '订单',
      icon: '../../images/icon/icon_order.png',
      path: '/pages/order/order'
    }, {
      name: '消息',
      icon: '../../images/icon/icon_message.png',
      path: '/pages/message/message'
    }, {
      name: '反馈',
      icon: '../../images/icon/icon_feedback.png',
      path: '/pages/coupleBack/coupleBack'
    }]
  },
  onNavigate(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.path,
    })
  },
  onLoad: function () {
    /**
     * 授权登陆验证
     */
    // checkLoginStatus().then(() => {
    //   //登陆完成
    // }).catch(() => {
    //   //登陆失败
    //   this.setData({
    //     isShowLoginModule: true
    //   })
    // })
  },
  /**
   * 
   * 关闭授权弹窗 
   */
  onChangeLoginModel() {
    this.setData({
      isShowLoginModule: false
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
      url: '/pages/courseDetail/courseDetail',
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
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000);
  },
  onReachBottom: function () {
    openLoading().then(() => {
      closeLoading()
    })
  },

})
