export default {
  getToken: () => {
    return wx.getStorageSync('token')
  },
  setToken: (token) => {
    wx.setStorage({
      key: "token",
      data: token
    })
  },
  //登陆
  login: (params) => {

  },
  //验证授权
  checkLoginStatus: () => {
    return new Promise((relove, reject) => {
      if (true) {
        relove()
      } else {
        reject()
      }
    })
  }
}