import api from '../api/index'
import config from '../utils/config'
const getToken = (key) => {
  return wx.getStorageSync(key)
};
const setToken = (key, data) => {
  return new Promise((resolve, reject) => {
    wx.setStorage({
      key,
      data,
      success() {
        resolve()
      },
      fail() {
        reject()
      }
    })
  })
}
//登陆
exports.login = (params) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url:`${config['url']}${api['login']['path']}`,
      data: params,
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: api['login']['type'],
      success(res) {
        //
        resolve(res.data)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}
/**
 * 授权code
 */
exports.wxLogin = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          resolve(res.code)
        } else {
          console.log('登录失败！' + res.errMsg)
          reject(res.errMsg)
        }
      }
    })
  })
}
exports.checkLoginStatus = () => {
  return new Promise((resolve, reject) => {
    if (!!getToken('token')) {
      resolve()
    } else {
      reject()
    }
  })
}
