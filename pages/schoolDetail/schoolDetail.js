// pages/schoolDetail/schoolDetail.js

const App = getApp();
import { formatStatus } from "../../utils/util";
import packages from "../../utils/packages";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    schoolId: "", // 学校id
    schoolInfo: null, // 学校信息,
    schoolParams: {},
    isCollection: 0, // 是否收藏
  },
  onShowMoreMsg() {
    let { isShowAll } = this.data;
    this.setData({
      isShowAll: !isShowAll,
    });
  },
  // 获取学校详情信息
  getSchoolInfo(schoolId) {
    App.request
      .start({
        apiKey: "getSchoolInfo",
        params: {
          schoolId,
        },
        loadingMessage: "加载中",
      })
      .then((res) => {
        console.log("schoolInfo", res);
        res.data["Logo"] = `${App["Host"]}${res.data["Logo"]}`;
        res.data.TeacherList.forEach(
          (item) => (item.Avatar = App.Host + item.Avatar)
        );
        res.data.SubjectList.forEach((item) => {
          item.Logo = App.Host + item.Logo;
          item["Status"] = formatStatus(item["Status"]);
        });
        this.setData({
          schoolInfo: res.data,
        });
        console.log("schoolInfo", this.data.schoolInfo);
      });
  },
  /* 
  获取课程教师列表 */
  getTeacherList(subjectId) {
    App.request
      .start({
        apiKey: "getTeachersBySubjectId",
        params: {
          subjectId,
        },
      })
      .then((data) => {
        console.log("teacherList", data);
      });
  },
  /**
   * 跳转课程详情
   */
  onToCourseDetail(e) {
    console.log("课程id", e.detail.id);
    const { id } = e.detail;
    wx.navigateTo({
      url: "/pages/courseDetail/courseDetail?subjectId=" + id,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("options", options);
    const { schoolId } = options;
    this.setData({
      schoolId,
    });
    this.getSchoolInfo(schoolId);
    this.getCollectionType(schoolId);
    // this.getTeacherList(schoolId)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},
  // 复制学校手机号
  handleContactUs() {
    const { schoolInfo } = this.data;
    const { Phone } = schoolInfo;
    wx.setClipboardData({
      data: Phone,
    });
  },
  // 获取收藏状态
  getCollectionType(itemId) {
    App.request
      .start({
        apiKey: "GetCollectionStatus",
        params: {
          itemId,
        },
      })
      .then((res) => {
        console.log("collectionType", res);
        const { success, data } = res;
        if (success) {
          this.setData({
            isCollection: data,
          });
        }
      });
  },
  // 添加收藏
  handleAddCollection(itemId) {
    App.request
      .start({
        apiKey: "AddCollection",
        params: {
          itemId,
          itemType: 1,
        },
      })
      .then((res) => {
        console.log("添加收藏", res);
        const { success } = res;
        if (success) {
          this.setData({
            isCollection: 1,
          });
          wx.showToast({
            title: "操作成功",
          });
        } else {
          wx.showToast({
            title: "操作失败",
            icon: "none",
          });
        }
      });
  },
  // 取消收藏
  handleDelCollection(itemId) {
    App.request
      .start({
        apiKey: "DelCollection",
        params: {
          itemId,
          itemType: 1,
        },
      })
      .then((res) => {
        console.log("取消收藏", res);
        const { success } = res;
        if (success) {
          this.setData({
            isCollection: 0,
          });
          wx.showToast({
            title: "操作成功",
          });
        } else {
          wx.showToast({
            title: "操作失败",
            icon: "none",
          });
        }
      });
  },
  // 点击收藏或者取消收藏
  handleChangeCollectionType: packages.throttle(function(){
    const { isCollection, schoolId } = this.data;
    console.log('操作了');    
    if (isCollection == 0) {
      this.handleAddCollection(schoolId);
    } else if (isCollection == 1) {
      this.handleDelCollection(schoolId);
    }
  }, 2000),
});
