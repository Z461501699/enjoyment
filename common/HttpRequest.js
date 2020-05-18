// name: HTTPRequest.js
// project: WechartFramework
// author: 区区电脑
// e-mail: 1573580882@qq.com
// date: 2020-05-13 23:29
// ...

import { Host, Apis } from "./config";

export default class HTTPRequest {
    constructor() {
        this._token = null;
        this._userId = null;
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
            let token = this.getUser().token || null;
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
                    token: token
                },
                timeout: 1000 * 10,
                dataType: 'json',
                responseType: 'text',
                success(response) {
                    if (loadingMessage) {
                        wx.hideLoading();
                    }
                    console.log(response.data)
                    result.message = response.data.Message;

                    if (response.data.Tag == 1) {
                        result.success = true;
                        result.data = response.data.data;
                    } else {
                        result.success = false;
                        result.data = response.data;
                        if (!hideError) {
                            wx.showToast({
                                icon: "none",
                                title: result.message
                            })
                        }
                    }
                    console.log(result)
                    resolve(result);
                },
                fail(error) {
                    if (loadingMessage) {
                        wx.hideLoading();
                    }
                    reject(error)
                }

            })
        });
    }
    setUser(user) {
        this._userId = user.id;
        this._token = user.token;
    }
    getUser() {
        return {
            token: this._token,
            userId: this._userId
        }
    }

}