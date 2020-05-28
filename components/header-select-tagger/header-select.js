Component({

  options: {
    // 表示激活使用插槽
    multipleSlots: true,
    styleIsolation: 'isolated',
    addGlobalClass: true,

  },
  data: {
    currentIndex:0,//默认值0
    key: '',
    value: '',
    search: '',
    options: [
      {
        title: '时间',
        value: 'defaultSort',
      }, {
        title: '人数',
        value: ' Mark',
      }, {
        title: '价格',
        value: 'Price',
      }

    ]
  },
  properties: {

  },


  methods: {
    active(e){
      this.setData({
        currentIndex: e.currentTarget.dataset.index,
        value: this.data.options[e.currentTarget.dataset.index].value
      })
      this.triggerEvent('change',this.data.value)
    },
    onChange(event) {
      this.setData({
        search: event.detail
      })
    },
    handleSearch() {
      this.triggerEvent('handleSearch', this.data.search)
    },
    getItem(event) {
      // 自定义事件返回 {key,value}
      this.triggerEvent("change", {
        key: event.currentTarget.dataset['index'].key,
        value: event.detail
      });
    },
  }
})