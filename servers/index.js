import request from '../utils/request'
import api from '../api/index'
import {checkLoginStatus} from '../utils/authorization.js'
/**
 * 
 * @param {* string} apiKey api 对应的key
 * @param {*} data 请求参数
 * @param {*} loadingMessage loading提示文字，不传则不弹loading动画
 */
const server = (wxApp, apiKey, data = {}, loadingMessage) => {
  return new Promise((relove, reject) => {
    if (api[apiKey]['useCheck']) {
      checkLoginStatus.then(() => {
        relove(request({
          data,
          url: api[apiKey],
          loadingMessage
        }))
      }).catch(() => {
        reject()
      })
    } else {
      relove(request({
        data,
        url: api[apiKey],
        loadingMessage
      }))
    }
  })
}
export default server