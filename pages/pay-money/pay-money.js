const App =  getApp();

Page({
  data:{
    params:{
      
    }
  },
  // 提交订单
  postPayMoney(){
    App.request.start({
      apiKey: 'createOrder',
      params,
      method:'POST'
    }).then(({
      data
    }) =>{
      console.log('data',data)
    })
  }

})