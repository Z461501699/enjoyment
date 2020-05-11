//index.js
//获取应用实例
const app = getApp()
import { checkLoginStatus } from '../../utils/authorization'
import { closeLoading, openLoading } from '../../utils/pagination'
Page({
  data: {
    isShowLoginModule: false
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
