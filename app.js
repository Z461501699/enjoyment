//app.js
import request from './servers/index'
import apiHttp from './utils/request'
import apiConfig from './api/index.js'
App({
  onLaunch: function () {

  },
  request: function (apiKey, data = {}, loadingMessage) {
    return request(this, apiKey, data, loadingMessage);
  },

  /**
   * 执行用户登录
   */
  doLogin(delta) {
    // 保存当前页面
    let pages = getCurrentPages();
    if (pages.length) {
      let currentPage = pages[pages.length - 1];
      "pages/login/login" != currentPage.route &&
        wx.setStorageSync("currentPage", currentPage);
    }
    // 跳转授权页面
    wx.navigateTo({
      url: "/pages/login/login?delta=" + (delta || 1)
    });
  },

  /**
   * 当前用户id
   */
  getUserId() {
    return wx.getStorageSync('user_id');
  },

  /**
   * 验证登录
   */
  checkIsLogin() {
    return wx.getStorageSync('token') != '' && wx.getStorageSync('user_id') != '';
  },

  /**
   * 显示成功提示框
   */
  showSuccess(msg, callback) {
    wx.showToast({
      title: msg,
      icon: 'success',
      mask: true,
      duration: 1500,
      success() {
        callback && (setTimeout(function () {
          callback();
        }, 1500));
      }
    });
  },

  /**
   * 显示失败提示框
   */
  showError(msg, callback) {
    wx.showModal({
      title: '友情提示',
      content: msg,
      showCancel: false,
      success(res) {
        // callback && (setTimeout(function() {
        //   callback();
        // }, 1500));
        callback && callback();
      }
    });
  },
  /**
   * 授权登录
   */
  getUserInfo(e, callback) {
    let App = this;
    if (e.detail.errMsg !== 'getUserInfo:ok') {
      return false;
    }
    wx.showLoading({
      title: "正在登录",
      mask: true
    });
    // 执行微信登录
    wx.login({
      success(res) {
        console.log("==调用后台登录方法==");
        apiHttp({
          apikey:'login',
          data:{
            code:res.code,
            nikeName: e.detail.userInfo.nickName,
            age:20,
            headImage: e.detail.userInfo.avatarUrl,
            sex: e.detail.userInfo.gender
          },
          loadingMessage:'正在登陆',
          responseType:'JSON'
        }).then((data) => {
          console.log('成功' + data)
          wx.setStorageSync('token', result.data.token);
          wx.setStorageSync('user_id', result.data.user_id);
        }, (err) => {
          console.log('失败' + err)
        })
      }
    });
  },

  
})