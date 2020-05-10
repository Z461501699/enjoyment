Component({
  data: {
    search:'',
  },
  methods: {
    // 搜索
    search(){
      this.triggerEvent('search', this.data.search)
    },
    // 获取输入值
    changeInput( {detail: {value}}){
      this.setData({
        search: value
      })
    }
  }
})