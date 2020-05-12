//app.js
import request from './servers/index'
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
  }
})