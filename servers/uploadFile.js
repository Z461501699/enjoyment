import uploadFileRequest from '../utils/uploadFile'
import api from '../api/index'

/**
 * 
 * @param {* string} apiKey api 对应的key
 * @param {*} data 请求参数
 * @param {*} loadingMessage loading提示文字，不传则不弹loading动画
 */
const uploadFile = (apiKey, {
  filePath, fileModule=''
}, loadingMessage) => {
  return uploadFileRequest({
    filePath,
    fileModule,
    url: api[apiKey],
    loadingMessage
  })
}
export default uploadFile