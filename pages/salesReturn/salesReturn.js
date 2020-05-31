// pages/salesReturn/salesReturn.js
 import moment from '../../utils/moment.js'
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    params:{
      PageSize:10,
      PageIndex:1
    },
    reFundList:[],
    isLoadAll:false
  },
  handleGoDetail(e) {
    console.log('detail',e)
    const detail = e.detail
    wx.navigateTo({
      url: `/pages/salesReturnDetail/salesReturnDetail?RefundTime=${detail.RefundTime}&CreateTime=${detail.CreateTime
      }&Flag=${detail.Flag}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options',options)
    this.getFeedBackList()
  },
  /* 初始化数据 */
  initData(){
    this.setData({
      'params.PageIndex':1,
      reFundList:[]
    })
  },
  /* 获取退款列表 */
  getFeedBackList(){
    const that = this
    const {params,reFundList} = this.data
    App.request.start({
      apiKey:'reFund',
      params:params
    }).then(({data}) =>{
      if(data&& data.length){
        data.forEach(i =>{
          i.SubjectLogo = App.Host + i.SubjectLogo
          i.RefundTime = moment(i.RefundTime).format('YYYY-MM-DD HH:MM:SS')
          i.CreateTime = moment(i.CreateTime).format('YYYY-MM-DD HH:MM:SS')
        })
      that.setData({
        'params.PageIndex':params.PageIndex++,
        isLoadAll: params.PageSize > data.length,
         reFundList: reFundList.concat(data)
      })
      }
 
      console.log('data',data)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   // this.getFeedBackList()
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
    this.initData()
    this.getFeedBackList()

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.isLoadAll){return}
    this.getFeedBackList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})