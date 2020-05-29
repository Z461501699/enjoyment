// pages/financialFlow/financialFlow.js
const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    params: {
      Flag: 0,
      MemberId: '',
      PageSize: 10,
      PageIndex: 0,
    },
    dataList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getFinanceList(1)
  },
  onChange(e) {
    console.log(e)
    let { params } = this.data
    this.setData({
      params: {
        ...params,
        Flag: e.detail.index
      }
    }, () => {
      this.getFinanceList(1)
    })
  },
  getFinanceList(num) {
    let { dataList, params } = this.data
    params['MemberId'] = App.globalData.getUserId();
    if (num == 1) {
      dataList = []
      params['PageIndex'] = 1
    }
    App.request.start({
      apiKey: 'getFinanceList',
      params: params,
      loadingMessage: '加载中',
    }).then(res => {
      console.log(res)
      if (res.success && res.data.length) {
        dataList = [...dataList, ...res.data]
        this.setData({
          dataList,
          params: {
            ...params,
            PageIndex: params['PageIndex'] + 1
          }
        })
      } else if (res.success) {
        wx.showToast({
          title: '已经加载全部',
          icon: 'none'
        })
        this.setData({
          dataList,
          params
        })
      } else {
        this.setData({
          dataList,
          params
        })
      }
    })
  },
  onPullDownRefresh: function () {
    this.getFinanceList(1);
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000);
  },
  onReachBottom: function () {
    this.getFinanceList()
  },
})