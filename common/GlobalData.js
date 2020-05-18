// name: GlobalData.js
// project: WechartFramework
// author: 区区电脑
// e-mail: 1573580882@qq.com
// date: 2020-05-14 23:21
// ...

import { KEY_USERID, KEY_TOKEN, KEY_USER, KEY_WXCODE } from "./config"

export default class GlobalData {

    constructor () {}

    setUserId (id) {
        wx.setStorageSync(KEY_USERID, id)
    }
    getUserId () {
        return wx.getStorageSync(KEY_USERID)
    }
    setToken (token) {
        wx.setStorageSync(KEY_TOKEN, token)
    }
    getToken () {
        return wx.getStorageSync(KEY_TOKEN)
    }
    setUserInfo (info) {
        wx.setStorageSync(KEY_USER, info)
    }
    getUserInfo () {
        return wx.getStorageSync(KEY_USER)
    }
    setWxCode (code) {
        wx.setStorageSync(KEY_WXCODE, code)
    }
    getWxCode () {
        return wx.getStorageSync(KEY_WXCODE)
    }
}