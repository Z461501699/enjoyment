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
  copyCode(e) {
    wx.login({
      success: (res) => {
        console.log(res.code)
        wx.setClipboardData({
          data: res.code
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow() {
    console.log('show',this.data.userInfo)
    if (App.common.userDidLogin()) {
      this.hideAuthCard();
    } else {   
        // 在没有 open-type=getUserInfo 版本的兼容处理
        wx.getSetting({
          success: res => {
            if (res.authSetting['scope.userInfo']) {
              wx.getUserInfo({
                success: res => {
                  this.hideAuthCard(res.userInfo);
                }
              })
            } else {
              this.setData({
                isLogin: false,
              })
            }
          }
        })
    }
  },
  /**
   * 订单导航跳转
   */
  onTargetOrder(e) {
    let _this = this;
    // if (!_this.onCheckLogin()) {
    //   return false;
    // }
    // 记录formid
    let urls = {
      all: "/pages/order/order?type",
      payment: '/pages/order/order?type=1',
      received: '/pages/order/order?type=2',
      refund: '/pages/salesReturn/salesReturn',
    };
    //转跳指定的页面
    wx.navigateTo({
      url: urls[e.currentTarget.dataset.type],

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
    console.log(info)
    if (!info) {
      this.setData({
        userInfo: App.globalData.getUserInfo(),
        hasUserInfo: true,
        isLogin: true
      })
    } else {
      // 用户登录
      App.userLogin(info).then(res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          isLogin: true
        })
      })
    }


  },
  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh: function () {
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000);
  },

  // 跳转到修改个人资料页面
  handleModifyUserInfo(){
    wx.navigateTo({
      url: '/pages/modifyUserInfo/modifyUserInfo',
    })
  }
})