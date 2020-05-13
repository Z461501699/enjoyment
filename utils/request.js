/**
 * 封装http 请求方法
 */
import config from'./config.js'
import api from '../api/index'

const apiUrl = config.url; //服务器api地址
const request = (params) => {

  //返回promise 对象
  return new Promise((resolve, reject) => {
    if (params.loadingMessage) {
      wx.showLoading({
        title: params.loadingMessage,
        mask: true
      })
    }
    //获取请求url对象
    let urlObj = api[params.apikey];

    wx.request({
      url: apiUrl + urlObj.path,
      data: params.data,
      header: params.header || {
        "Authorization": wx.getStorageSync('token')
      },
      method: urlObj.type || 'GET',//默认为GET
      dataType: params.dataType,//返回的数据格式,默认为JSON，特殊格式可以在调用的时候传入参数
      responseType: params.responseType,//响应的数据类型
      success: function (res) {
        //接口访问正常返回数据
        if (res.statusCode == 200) {
          //1. 操作成功返回数据,原则上只针对服务器端返回成功的状态（如本例中为000000）
          // console.log(res.data)
          if (res.data.Tag == 1) {
            resolve({
              success: true,
              data: res.data
            })
          } else if (res.data.Tag == 2) {
            wx.reLaunch({
              url: '/pages/userUnuse/userUnuse',
            })
          } else {
            if (params.url.path !== '/Order/CreateWithdrawOrder') { // 提现功能单独错误提示，非提现功能使用此提示
              wx.showToast({
                icon: "none",
                title: res.data.Message
              })
            }
            resolve({
              success: false,
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
      fail: function(e) {
        reject(e)
      },
      complete(res) {
        if (params.loadingMessage) {
          wx.hideLoading();
        }
      }
    })
  })
}
export default request