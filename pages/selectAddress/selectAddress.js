const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    locationData: [],
    scrollTop: null,
    hotList: [],
    list: [],
    wholeCountry: {
      AreaName: '全国',
      AreaCode: ''
    }
  },
  handleSelect(e) {
    let locationData = e.currentTarget.dataset.item;
    let nowPages = getCurrentPages().slice(-2)[0]
    nowPages.setData({
      locationData
    }, () => {
      nowPages.getList(1)
      wx.navigateBack({
        deta: 1
      })
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      locationData: JSON.parse(options.locationData)
    }, () => {
      this.getAreaList()
    })

  },
  getAreaList() {
    App.request.start({
      apiKey: "getCityList",
      params: {},
      loadingMessage: '加载中',
    }).then(res => {
      console.log(1111111111111, res)
      if (res.success) {
        let data = res.data
        let hotList = data.filter(item => {
          return item.IsHot
        })

        this.setData({
          list: pySegSort(data),
          hotList
        })
      }
    }).catch(err => {
      console.log('err' + err)
    })
  },
  onPageScroll(event) {
    this.setData({
      scrollTop: event.scrollTop
    });
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

function pySegSort(arr, empty) {
  if (!String.prototype.localeCompare) return null;
  var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
  var segs = [];
  var curr;
  letters.forEach((t, i) => {
    curr = {
      letter: t,
      data: []
    };
    arr.forEach((zt, zi) => {
      if (zt['AreaChar'].slice(0, 1) == t) {
        curr.data.push(zt);
      }
    });
    if (empty || curr.data.length) {
      segs.push(curr);
      curr.data.sort(function (a, b) {
        return a['AreaName'].localeCompare(b['AreaName'], "zh");
      });
    } else {
      segs.push(curr)
    }
  });
  console.log(segs)
  return segs;
}