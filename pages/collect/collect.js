/*
 * @Author: Arthur_Zhang
 * @Date: 2020-06-05 22:59:12
 * @lastEditors: Arthur_Zhang
 * @LastEditTime: 2020-06-05 23:46:41
 * @Description:
 */

// pages/collect/collect.js
const App = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    flag: 0,
    schoolList: [],
    subjectList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCollectSchool();
    this.getCollectSubject();
  },
  onPullDownRefresh: function () {
    this.setData({
      schoolList: [],
      subjectList: [],
    });
    this.getCollectSchool();
    this.getCollectSubject();
  },
  /**
   * 跳转课程详情
   */
  onToCourseDetail(e) {
    wx.navigateTo({
      url: `/pages/courseDetail/courseDetail?subjectId=${e.detail.id}`,
    });
  },
  /**
   * 跳转到详情页
   */
  toDetail(e) {
    console.log("跳转到详情页", e);
    const { currentTarget } = e;
    const { dataset } = currentTarget;
    const { id } = dataset;
    wx.navigateTo({
      url: `/pages/schoolDetail/schoolDetail?schoolId=${id}`,
    });
  },
  // 获取收藏的学校列表接口
  getCollectSchool() {
    App.request
      .start({
        apiKey: "GetSchoolList",
        loadingMessage: "加载中",
      })
      .then((res) => {
        console.log("school:successs", res);
        // success 为false时不继续操作
        if (res.success && res.data.length) {
          let newArr = res.data.map((item) => {
            if (!item) {
              return {};
            }
            item["Logo"] = `${App["Host"]}${item["Logo"]}`;
            return item;
          });
          this.setData({
            schoolList: newArr,
          });
        }

        wx.stopPullDownRefresh();
      });
  },
  // 获取收藏的课程列表接口
  getCollectSubject() {
    App.request
      .start({
        apiKey: "GetSubjectList",
        loadingMessage: "加载中",
      })
      .then((res) => {
        console.log("subject:successs", res);
        // success 为false时不继续操作
        if (res.success && res.data.length) {
          let newArr = res.data.map((item) => {
            if (!item) {
              return {};
            }
            item["Logo"] = `${App["Host"]}${item["Logo"]}`;
            return item;
          });
          this.setData({
            subjectList: newArr,
          });
        }

        wx.stopPullDownRefresh();
      });
  },
});
