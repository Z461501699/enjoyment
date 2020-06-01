// pages/modifyUserInfo/modifyUserInfo.js
const App = getApp()
import {
  isMobile,
  isEmail
} from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isGetPhone: false,
    formData: {
      realName: '',
      phone: '',
      email: '',
      address: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.checkUserPhone()
    this.getMemberInfo()
  },
  // 获取用户真实姓名
  handleGetRealName(e) {
    console.log('获取用户真实姓名', e);
    const {
      detail
    } = e
    const {
      value
    } = detail
    this.setData({
      'formData.realName': value
    })
  },
  // 获取用户手机号
  handleGetPhoneNum(e) {
    console.log('获取用户手机号', e);
    const {
      detail
    } = e
    const {
      value
    } = detail
    this.setData({
      'formData.phone': value
    })
  },
  // 获取用户邮箱
  handleGetEmail(e) {
    console.log('获取用户邮箱', e);
    const {
      detail
    } = e
    const {
      value
    } = detail
    this.setData({
      'formData.email': value
    })
  },
  // 获取用户地址
  handleGetAddress(e) {
    console.log('获取用户地址', e);
    const {
      detail
    } = e
    const {
      value
    } = detail
    this.setData({
      'formData.address': value
    })
  },
  // 获取用户手机号
  getPhoneNum(e) {
    console.log('获取用户手机号', e);
    const {
      detail
    } = e
    const {
      value
    } = detail
    this.setData({
      'formData.realName': value
    })
  },
  // 获取用户手机号
  getPhoneNumber(e) {
    console.log('getPhoneNumber', e);

  },
  // 获取用户信息
  getMemberInfo() {
    const that = this
    App.request.start({
      apiKey: 'GetMemberInfo',
      loadingMessage: '加载中',
    }).then(res => {
      console.log('获取用户数据', res);
      const {
        data,
        success
      } = res
      if (!success) return
      const {
        RealName,
        Phone,
        Email,
        Address
      } = data

      that.setData({
        'formData.realName': RealName,
        'formData.phone': Phone,
        'formData.email': Email,
        'formData.address': Address
      })
    })
  },
  // 修改用户信息 
  updateMemberInfo(params) {
    App.request.start({
      apiKey: 'UpdateMemeberInfo',
      params,
      loadingMessage: '加载中',
    }).then(res => {
      console.log('修改用户数据', res);
      const {
        success
      } = res
      if (!success) return
      wx.showToast({
        title: '修改成功',
        mask: true
      })
      setTimeout(function(){
        wx.navigateBack(-1)
      },1500)
    })
  },
  // 判断是否获取过用户的手机号
  checkUserPhone() {
    const _userInfo = App.globalData.getUserInfo()
    const {
      Phone
    } = _userInfo
    this.setData({
      isGetPhone: isMobile(Phone)
    })
  },
  // 提交表单数据
  handleSubmit() {
    const that = this
    const {
      formData
    } = that.data
    if (!isMobile(formData.phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      })
      return
    }
    if (!isEmail(formData.email)) {
      wx.showToast({
        title: '请输入正确的邮箱地址',
        icon: 'none'
      })
      return
    }
    this.updateMemberInfo(formData)
  }
})