//app.js
import request from './servers/index'
App({
  onLaunch: function () {

  },
  request: function (apiKey, data = {}, loadingMessage) {
    return request(this, apiKey, data, loadingMessage);
  },
})