const app = getApp()
// import { checkLoginStatus } from '../../utils/authorization'
import { closeLoading, openLoading } from '../../utils/pagination'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowAll: true,//显示隐藏
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    let { isShowAll } = this.data
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
    openLoading().then(() => {
      closeLoading()
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})