// pages/studentManage/studentManage.js
const App = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
  },
  getList() {
    this.getSudentListByParent()
  },
  onAddnew(e) {
    wx.navigateTo({
      url: `/pages/studentInfoEdit/studentInfoEdit?type=add`,
    })
  },
  onEditStudent(e) {
    console.log('编辑', e)
    this.setData({
      selectItem: e.detail
    }, () => {
      wx.navigateTo({
        url: `/pages/studentInfoEdit/studentInfoEdit?type=edit`,
      })
    })

  },
  onViewClass(e) {
    console.log('课时表', e.detail)
    let { Id } = e.detail
    wx.navigateTo({
      url: `/pages/classSchedule/classSchedule?id=${Id}`,
    })
  },
  getSudentListByParent() {
    let parentId = App.globalData.getUserId()
    App.request.start({
      apiKey: 'getSudentListByParent',
      params: {
        parentId
      }, 
      loadingMessage: '加载中',
    }).then(res => {
      if (res.success) {
        let studentList = res.data
        studentList = studentList.map(item => {
          if(item['Avatar']){
            item['Avatar'] = `${App.Host}${item.Avatar}`
          }
          return item
        })
        console.log('studentList',studentList)
        this.setData({
          studentList
        })
      }

    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

})