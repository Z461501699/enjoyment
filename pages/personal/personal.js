const App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    userInfo: {}, // 用户信息
    orderCount: {}, // 订单数量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (App.common.userDidLogin()) {
      this.hideAuthCard();
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      App.userInfoReadyCallback = res => {
        this.hideAuthCard(res.userInfo);
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          this.hideAuthCard(res.userInfo);
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

    // 获取当前用户信息
    this.getUserDetail();
  },

  /**
   * 获取当前用户信息
   */
  getUserDetail() {

  },

  /**
   * 订单导航跳转
   */
  onTargetOrder(e) {
    let _this = this;
    if (!_this.onCheckLogin()) {
      return false;
    }
    // 记录formid
    let urls = {
      all: '/pages/order/index?type=all',
      payment: '/pages/order/index?type=payment',
      received: '/pages/order/index?type=received',
      refund: '/pages/order/refund/index',
    };
    // 转跳指定的页面
    wx.navigateTo({
      url: urls[e.currentTarget.dataset.type]
    })
  },

  /**
   * 菜单列表导航跳转
   */
  onTargetMenus(e) {
    let _this = this;
    wx.navigateTo({
      url: '/' + e.currentTarget.dataset.url
    })
  },

  /**
   * 跳转我的钱包页面
   */
  onTargetWallet(e) {
    let _this = this;
    // 记录formId
    wx.navigateTo({
      url: './wallet/index'
    })
  },

  /**
   * 跳转积分明细页
   */
  onTargetPoints(e) {
    let _this = this;
    if (!_this.onCheckLogin()) {
      return false;
    }
    // 记录formId
    wx.navigateTo({
      url: '../points/log/index'
    });
  },

  /**
   * 跳转到登录页
   */
  onLogin() {
    wx.navigateTo({
      url: '../login/login',
    });
  },
  // 微信授权成功
  hideAuthCard(info) {
    let __this = this;
    if (!info) {
      __this.setData({
        userInfo: App.globalData.getUserInfo(),
        hasUserInfo: true,
      })
      setTimeout(() => {
        __this.setData({
          isLogin: true
        })
      }, 1000)
      return;
    }

    // 用户登录
    App.userLogin(info).then(res => {
      this.setData({
        userInfo: res.userInfo,
        hasUserInfo: true,
      })
      setTimeout(() => {
        __this.setData({
          isLogin: true
        })
      }, 1000)
    })
  }
})