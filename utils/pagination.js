exports.closeLoading = () => {
  return new Promise((relove, reject) => {
    setTimeout(() => {
      wx.hideLoading()
      relove()
    }, 750)
  })
}
exports.openLoading = () => {
  return new Promise((relove, reject) => {
    setTimeout(() => {
      wx.showLoading({
        title: '加载中',
      })
      relove()
    }, 750)
  })
}