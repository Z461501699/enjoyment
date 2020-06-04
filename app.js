//app.js
import HTTPRequest from './common/HttpRequest';
import Common from './common/Common';
import GlobalData from './common/GlobalData';
import GEvent from './common/GEvent';
import { Host } from './common/config'

App({
  Host: null,
  // userInfoReadyCallback: null,
  globalData: null,
  request: null,
  common: null,
  event: null,
  wxInfo: {},
  onLaunch: function () {
    this.globalData = new GlobalData();
    this.request = new HTTPRequest();
    this.event = new GEvent();
    this.common = new Common();
    this.Host = Host
    this.common.userDidLogin = () => {
      return this.globalData.getUserId() && this.globalData.getToken();
    }

    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    // 获取用户信息
  
  },
  onShow(){
    console.log('onshow')
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.userLogin(res.userInfo).then(res => {
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              });

            }
          })
        }
      }
    })
  },
  onHide() {
    console.log('hide')
    wx.clearStorage()
  },
  // 统一缓存用户信息
  setUserInfo({ wxInfo = false, userInfo = false, userId = false, token = false }) {
    if (!!wxInfo) this.wxInfo = wxInfo;
    if (!!userInfo) this.globalData.setUserInfo(userInfo);
    if (!!userId) this.globalData.setUserId(userId);
    if (!!token) this.globalData.setToken(token);
    // if (!!token && !!userId) this.request.setUser({
    //   id: userId,
    //   token: token
    // })
    return true
  },
  // 用户登录
  userLogin(info) {
    if (!info) return
    this.setUserInfo({ wxInfo: info })
    return new Promise((resolve, reject) => {
      // 发起网络请求，进行登录
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          this.request.start({
            apiKey: 'login',
            params: {
              code: res['code'],
              nikeName: info['nickName'],
              // age: '20',
              headImg: info['avatarUrl'],
              sex: info['gender'],
            },
          }).then(res => {
            if (res.success) {
              if (this.setUserInfo({ userInfo: res['data']['UserInfo'], token: res['data']['Token'], userId: res['data']['UserInfo']['Id'] })) {
                resolve({ userInfo: res['data']['UserInfo'] })
              }
            }

          })
        }
      })


    });
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

})