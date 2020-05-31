// pages/coupleBack/coupleBack.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList: [],
    schoolList:[
      {name:1},
      {name:2}
    ],
    postData:{
      "parentsId": "",
      "schoolId": "",
      "feedbackType": 0,
      "content": "",
      "flag": 0,
      "img1": "",
      "img2": "",
      "img3": "",
      ImageList:[]
    }
  },
  // 获取changePicker事件
  changePicker(e){
    console.log('e',e.detail)
    this.setData({'postData.feedbackType':Number(e.detail)})
  },
  textareaHandle(e){
    this.setData({'postData.content':e.detail})
    console.log('e',this.data.postData)
  },
  // 获取投诉建议
  getSchoolListByMember(){
    App.request.start({
      apiKey:`GetSchoolListByMember`,
      params:{memberId:App.request.getUser().userId}
    }).then(data =>{
      console.log('data----',data)
    })
  },
  onChange(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    Toast(`当前值：${value}, 当前索引：${index}`);
  },
  // 获取上传的图片
  getImages(e) {
    const {
      detail
    } = e
    const {
      file
    } = detail
    const {
      fileList
    } = this.data
    console.log('获取图片', file);
    file.forEach(el => {
      fileList.push(el)
    })
    this.setData({
      fileList
    })
  },
  // 删除图片
  handleDelImage(e) {
    console.log('del image', e);
    const {
      detail
    } = e
    const {
      index
    } = detail
    const {
      fileList
    } = this.data
    fileList.splice(index, 1)
    this.setData({
      fileList
    })
  },
  // 上传图片
  upload(filePath){
    App.request.uploadFile({
      apiKey:'uploadFile',
      fileModule:4,
      filePath,
      loadingMessage:'图片上传中'
    }).then(data =>{
      console.log('images',data)
    })
  },
  // 提交表单
  handleSubmit(e) {
    const {postData} = this.data
    console.log('post',postData)
    const ImgsList = this.data.fileList.map(item => item.path)
    this.setData({'postData.ImageList': ImgsList})
    ImgsList.map(item => {
      this.upload(item)
    })
   
  
    // App.request.start({
    //   apiKey: 'feedBack',
    //   loadingMessage: '加载中',
    //   data:e
    // }).then(res => {
    //   console.log('res',res)
    // })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSchoolListByMember()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})