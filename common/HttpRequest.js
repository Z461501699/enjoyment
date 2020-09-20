// name: HTTPRequest.js
// project: WechartFramework
// author: 区区电脑
// e-mail: 1573580882@qq.com
// date: 2020-05-13 23:29
// ...

import {
    Host,
    Apis
} from "./config";
import GlobalData from './GlobalData';
const globalData = new GlobalData()
export default class HTTPRequest {
    constructor() {
        // this._token = null;
        // this._userId = null;
    }
    /**
     * 发起请求
     * @param {*} options 
     */
    start(options) {
        return new Promise((resolve, reject) => {
            let apiKey = options.apiKey; // api 键名
            let api = Apis[apiKey]; // api 对象
            let params = options.params; // 请求参数
            let loadingMessage = options.loadingMessage; // loading 信息, null 则不显示loading
            let hideError = options.hideError || false; // 是否隐藏错误提示，默认会提示
            let token = globalData.getToken() || '';
            let result = {
                success: false,
                message: '',
                data: {}
            };

            if (loadingMessage) {
                wx.showLoading({
                    title: loadingMessage,
                    mask: true
                })
            }
            wx.request({
                url: `${Host}${api.path}`,
                method: api.type,
                data: params,
                header: {
                    Authorization: token
                },
                timeout: 1000 * 10,
                dataType: 'json',
                responseType: 'text',
                success(response) {
                    if (loadingMessage) {
                        wx.hideLoading();
                    }
                    result.message = response.data.Message;

                    if (response.data.Tag == 1) {
                        result.success = true;
                        result.data = response['data']['Result'];
                    } else {
                        result.success = false;
                        result.data = response.data;
                        if ( result.message&&result.message.includes('未授权')) {
                            wx.showToast({
                                icon: "none",
                                title: result.message,
                                success: () => {
                                    setTimeout(() => {
                                        wx.clearStorage()
                                        wx.switchTab({
                                            url: '/pages/personal/personal',
                                        })
                                    }, 1500)
                                }
                            })

                        } else if (!hideError) {
                            wx.showToast({
                                icon: "none",
                                title: result.message
                            })
                            // wx.switchTab({
                            //     url: '/pages/personal/personal',
                            // })
                        }
                    }

                    resolve(result);
                },
                fail(error) {
                    if (loadingMessage) {
                        wx.hideLoading();
                    }
                    wx.switchTab({
                        url: '/pages/personal/personal',
                    })
                    reject(error)
                }

            })
        });
    }
    uploadFile(options) {
        return new Promise((resolve, reject) => {
            let apiKey = options.apiKey; // api 键名
            let api = Apis[apiKey]; // api 对象
            let token = globalData.getToken() || '';
            let fileModule = options.fileModule
            let filePath = options.filePath
            if (options.loadingMessage) {
                wx.showLoading({
                    title: options.loadingMessage,
                    mask: true
                })
            }
            console.log(options)
            wx.uploadFile({
                url: `${Host}${api.path}?fileModule=${fileModule}`,
                filePath: filePath,
                name: 'file',
                header: {
                    Authorization: token
                },
                formData: {},
                success: function (res) {
                    // console.log(111111,res)
                    if (options.loadingMessage) {
                        wx.hideLoading();
                    }
                    //接口访问正常返回数据
                    if (res.statusCode == 200) {
                        //1. 操作成功返回数据,原则上只针对服务器端返回成功的状态（如本例中为000000）
                        let data=JSON.parse(res.data)
                        console.log(data)
                        if(!data.Tag){
                            reject({
                                Message:'图片检测违规，请重新上传'
                            })
                        }
                        if (res.data.Result) {
                            resolve({
                                success: true,
                                data: res.data
                            })
                        } else {
                            // wx.showToast({
                            //   icon: "none",
                            //   title: res.data.Message
                            // })
                            resolve({
                                success: true,
                                data: res.data
                            }) // 此处属于服务器接口调用成功但操作失败，用于对象针对操作失败做相应的处理
                        }
                    } else {
                        //2. 操作不成功返回数据，以toast方式弹出响应信息，如后端未格式化非操作成功异常信息，则可以统一定义异常提示
                        // var errMsg = res.data.Message
                        wx.showToast({
                            icon: "none",
                            title: res.data.Message
                        })
                        reject(res)
                    }
                },
                fail: function (e) {
                    if (options.loadingMessage) {
                        wx.hideLoading();
                    }
                    reject(e)
                },
                complete: function (res) { },
            })
        })
    }
    // setUser(user) {
    //     this._userId = user.id;
    //     this._token = user.token;
    // }
    // getUser() {
    //     return {
    //         token: this._token,
    //         userId: this._userId
    //     }
    // }

}