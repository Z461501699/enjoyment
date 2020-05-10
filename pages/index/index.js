//index.js
//获取应用实例
const app = getApp()
import authorization from '../../utils/authorization'
Page({
  data: {},
  onLoad: function () {
    authorization['checkLoginStatus']().then(res => {
      console.log('授权成功')
    })
  },
})
