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
    },
    selectTitles: HEADER_SELECT_TITLES,
    selectOptions: HEADER_SELECT_OPTIONS
  },
  // 下拉回调
  change({
    detail
  }) {
    // this.setData({
    //   'schoolListParams.Sort': detail,
    //   'schoolListParams.SortType': detail,
    // })
    
      this.getSchoolList()
    console.log('change', detail)
  },
  // 搜索功能
  handleSearch({
    detail
  }) {
    console.log('搜索', detail)
    this.initData()
    this.setData({
      'schoolListParams.SchoolName': detail
    })
    this.getSchoolList()
  },

  // 获取学校数据
  getSchoolList() {
    const that = this
    const {
      schoolList,
      schoolListParams
    } = that.data

    App.request.start({
      apiKey: 'getSchoolList',
      params: schoolListParams,
      loadingMessage: '加载中',
    }).then(res => {
      console.log('successs', res);
      // success 为false时不继续操作
      if (res.success && res.data.length) {
        let newArr = res.data.map(item => {
          item['Logo'] = `${App['Host']}${item['Logo']}`
          return item
        })
        that.setData({
          'schoolListParams.PageIndex': schoolListParams.PageIndex + 1,
          isLoadAll: res.data.length < schoolListParams.PageSize,
          schoolList: schoolList.concat(newArr)
        })
      }

      wx.stopPullDownRefresh()
      
    })
  },
  /**
   * 跳转到详情页
   */
  toDetail(e) {
    console.log('跳转到详情页', e);
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSchoolList()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    const that = this
    that.initData()
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

  // 数据初始化
  initData() {
    this.setData({
      schoolList: [],
      'schoolListParams.PageIndex': 1,
      'schoolListParams.SchoolName': '',
    })
  }

})