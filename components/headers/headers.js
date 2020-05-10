Component({
  data: {
    position: '',
    search:'',

  },
  properties: {
    position: {
      type: String,
      value: '青岛'
    },
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