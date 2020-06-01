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
    isGetLocation: true,
    locationData: false,
    options: [
      {
        title: '评分',
        value: 'Mark',
      }, {
        title: '师资',
        value: 'TeacherCount',
      }, {
        title: '课程',
        value: 'SubjectCount',
      }

    ],
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
      Sort:'DefaultSort',
      SortType:'desc'
    },
    selectTitles: HEADER_SELECT_TITLES,
    selectOptions: HEADER_SELECT_OPTIONS
  },
  // 筛选
  change({
    detail
  }) {
    this.setData({
      'schoolListParams.Sort':detail
    },()=>{
      console.log('this',this.data.schoolListParams)
      this.initData(()=>{
        this.getSchoolList()
      })
    })
  },
  // 搜索功能
  handleSearch({
    detail
  }) {
    console.log('搜索', detail)
    this.initData()
    this.setData({
      "schoolListParams.SchoolName":detail
    },()=>{
     
      this.getSchoolList()
    })
    
  },
  getList(num) {
    this.initData(() => {
      this.getSchoolList()
    })
  },
  // 获取学校数据
  getSchoolList() {
    const that = this
    const {
      schoolList,
      schoolListParams,
      locationData
    } = that.data
    if (locationData) {
      if (locationData['longitude'] && locationData['latitude']) {
        schoolListParams['Latitude'] = locationData['latitude']
        schoolListParams['Longitude'] = locationData['longitude']
        schoolListParams['AreaCode'] = ''

      } else {
        schoolListParams['AreaCode'] = locationData['AreaCode']
        schoolListParams['Latitude'] = ''
        schoolListParams['Longitude'] = ''
      }
    }
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
    // this.getSchoolList()
  },
  onShow: function () {
    let {
      locationData
    } = this.data;
    this.getLocationStr().then(addLocation => {
      console.log(!!locationData)
      if (!!locationData) {
        this.getSchoolList()
      } else {
        this.getCityInfoByLocation(addLocation).then(res => {
          this.getSchoolList()
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
          // relove(`${res.longitude},${res.latitude}`)
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
  initData(back) {
    this.setData({
      schoolList: [],
      'schoolListParams.PageIndex': 1,
      'schoolListParams.SchoolName': '',
    }, () => {
      back()
    })
  }

})