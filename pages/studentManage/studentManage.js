// pages/studentManage/studentManage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentList: [{
      HeadImg: '',
      Name: "学生1"
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onAddnew(e) { },
  onEditStudent(e) {
    console.log('编辑', e.detail)
    wx.navigateTo({
      url: `/pages/studentInfoEdit/studentInfoEdit?studentId=${e.detail.id}&type=edit`,
    })
  },
  onViewClass(e) {
    console.log('课时表', e.detail)
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