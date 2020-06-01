// pages/course/course.js
import { HEADER_SELECT_TITLES, HEADER_SELECT_OPTIONS } from '../../config/commonData'
const App = getApp();
import { formatTime, formatStatus,moment } from "../../utils/util";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isGetLocation: true,
    locationData: false,
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
      AreaCode: '',
      Longitude: '',
      Latitude: '',
      SortType:'desc'
    },
    options: [
      {
        title: '时间',
        value: 'StartTime',
      }, {
        title: '评分',
        value: 'Mark',
      }, {
        title: '价格',
        value: 'Price',
      }

    ],
  },
    // 数据初始化
    initData() {
      this.setData({
        courseList: [],
        'courseListParams.PageIndex': 1,
        'courseListParams.Name': '',
      })
    },
  // 筛选
  change({ detail }) {
    console.log('change', detail)
    this.setData({
      'courseListParams.Sort':detail
    }, () => {
      this.getCourseList(1)
    })
  },
  // 搜索功能
  handleSearch({ detail }) {
    console.log('搜索', detail)
    this.initData()
    this.setData({
      'courseListParams.Name':detail
    }, () => {
      this.getCourseList(1)
    })
  },
  getList(num) {
    this.getCourseList(num)
  },
  // 获取课程数据
  getCourseList(num) {
    let {
      courseList,
      courseListParams,
      locationData
    } = this.data
    if (num == 1) {
      courseListParams['PageIndex'] = 1
      courseList = []
    }
    if (locationData) {
      if (locationData['longitude'] && locationData['latitude']) {
        courseListParams['Latitude'] = locationData['latitude']
        courseListParams['Longitude'] = locationData['longitude']
        courseListParams['AreaCode'] = ''

      } else {
        courseListParams['AreaCode'] = locationData['AreaCode']
        courseListParams['Latitude'] = ''
        courseListParams['Longitude'] = ''
      }
    }
    App.request.start({
      apiKey: 'getSubjectList',
      params: courseListParams,
      loadingMessage: '加载中',
    }).then(res => {
      console.log(res)
      if (res.success && res.data.length) {
        let newArr = res.data
        console.log('newArr',newArr)
        newArr = newArr.map(item => {
          item['Logo'] = `${App['Host']}${item['Logo']}`
          item['StartTime'] =item['StartTime'].replace('T',' ')
          item['Status'] =['取消','报名中','开始','结束'][item['Status']]
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
  },
  onShow: function () {
    let {
      locationData
    } = this.data;
    this.getLocationStr().then(addLocation => {
      if (!!locationData) {
        this.getCourseList()
      } else {
        this.getCityInfoByLocation(addLocation).then(res => {
          this.getCourseList()
        })
      }
    })
  },
  //跳转选择城市
  onSelectAddress() {
    let {
      locationData
    } = this.data;
    if (locationData) {
      wx.navigateTo({
        url: `/pages/selectAddress/selectAddress?locationData=${JSON.stringify(this.data.locationData)}`,
      })
    } else {
      this.getSetting().then(() => {
        this.getLocationStr().then(addLocation => {
          this.getCityInfoByLocation(addLocation).then(res => {
            this.getCourseList(1)
          })
        })
      }).catch(() => {
        this.setData({
          isGetLocation: false,
        })
      })

    }
  },
  //活动当前定位详细数据
  getCityInfoByLocation(location) {
    return new Promise((relove, reject) => {
      App.request.start({
        apiKey: 'getCityInfoByLocation',
        params: { location: location.addLocation }
      }).then(res => {
        console.log(res)
        if (res.success) {
          let locationData = res.data
          locationData.longitude = location.longitude
          locationData.latitude = location.latitude
          this.setData({
            locationData
          }, () => {
            relove(locationData)
          })
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  //获取当前定位信息
  getLocationStr() {
    return new Promise((relove, reject) => {
      wx.getLocation({
        type: 'gcj02',
        success: (res) => {
          console.log(res)
          // relove(`${res.longitude},${res.latitude}`, { longitude: res.longitude, latitude: res.latitude })
          relove({ addLocation: `${res.longitude},${res.latitude}`, longitude: res.longitude, latitude: res.latitude })
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  },
  onOpensetting(e) {
    console.log(e)
    if (e.detail.authSetting['scope.userLocation']) {
      this.setData({
        isGetLocation: true,
      })
    }
  },
  getSetting() {
    return new Promise((relove, reject) => {
      wx.getSetting({
        success: (res) => {
          console.log(res.authSetting)
          if (res.authSetting["scope.userLocation"]) {
            relove(relove)
          } else {
            console.log('没有权限')
            wx.authorize({
              scope: 'scope.userLocation',
              success: (ress) => {
                console.log(ress)
                // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
                relove()
              },
              fail: (err) => {
                console.log(err)
                reject()
              }
            })
          }
        }
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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