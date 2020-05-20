// pages/school/school.js
import {
  HEADER_SELECT_TITLES,
  HEADER_SELECT_OPTIONS
} from '../../config/commonData'
const App = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    schoolList: [],
    pageSize: 10,
    pageNo: 1,
    isLoadAll: false,
    schoolListParams: {
      Ids: '',
      SchoolName: '',
      Address: '',
      Phone: '',
      PageSize: 10,
      PageIndex: 1,
      Sort: '',
      SortType: '',
      TotalCount: 0,
      TotalPage: 0
    },
    selectTitles: HEADER_SELECT_TITLES,
    selectOptions: HEADER_SELECT_OPTIONS
  },
  // 下拉回调
  change({
    detail
  }) {
    console.log('change', detail)
  },
  // 搜索功能
  handleSearch({
    detail
  }) {
    console.log('搜索', detail)
  },

  // 获取学校数据
  getSchoolList() {
    const that = this

    const {
      schoolListParams
    } = that.data

    App.request.start({
      apiKey: 'getSchoolList',
      params: schoolListParams,
      loadingMessage: '加载中',
    }).then(res => {
      console.log(res);
      that.setData({
        'schoolListParams.PageIndex': schoolListParams.PageIndex + 1
      })
      wx.stopPullDownRefresh()
    })
  },
  /**
   * 跳转到详情页
   */
  toDetail(e) {
    console.log('列表触发', e);
    wx.navigateTo({
      url: '/pages/schoolDetail/schoolDetail',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSchoolList()
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
      schoolList: [],
      'schoolListParams.PageIndex': 1
    })
    that.getSchoolList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const that = this
    const {
      isLoadAll
    } = that.data
    if (isLoadAll) {
      return
    }
    this.getSchoolList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})