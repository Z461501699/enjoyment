/**
 * 封装http 请求方法
 */
import config from './config.js'
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
    console.log(params)
    wx.uploadFile({
      url: `${apiUrl}${params.url.path}?fileModule=${params.fileModule}`,
      filePath: params.filePath,
      name: 'file',
      header: params.header || {
        // "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": wx.getStorageSync('token')
      },
      formData: {},
      success: function(res) {
        if (params.loadingMessage) {
          wx.hideLoading();
        }
        //接口访问正常返回数据
        if (res.statusCode == 200) {
          //1. 操作成功返回数据,原则上只针对服务器端返回成功的状态（如本例中为000000）
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
      fail: function(e) {
        if (params.loadingMessage) {
          wx.hideLoading();
        }
        reject(e)
      },
      complete: function(res) {},
    })
  })
}
export default request