// components/loginPopup/loginPopup.js
import { wxLogin, login } from '../../utils/authorization'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /**
     * 弹窗开关
     */
    show: {
      type: Boolean,
      value: false,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    params: {
      code: null,
      nikeName: '',
      age: 20,
      headImg: '',
      sex: '',
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClose() {
      this.triggerEvent('close')
    },
    bindGetUserInfo(e) {
      if (e.detail.errMsg == "getUserInfo:ok") {
        let { params } = this.data, userInfo = e.detail.userInfo
        // console.log(userInfo)
        params['nikeName'] = userInfo['nickName']
        params['headImg'] = userInfo['avatarUrl']
        params['sex'] = userInfo['gender']
        wxLogin().then(code => {
          params['code'] = code
          console.log(params)
          login(params).then(res => {
            this.onClose()
          })
        })
      }
    }
  }
})
