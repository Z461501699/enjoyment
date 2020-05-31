Component({

  options: {
    // 表示激活使用插槽
    multipleSlots: true,
    styleIsolation: 'isolated',
    addGlobalClass: true,

  },
  data: {
    key: '',
    value: '',
    search: ''
  },
  properties: {
    hasPosition:{
      type:Boolean,
      value:false,
    },
    selectTitles: {
      type: Array,
      value: []
    },
    selectOptions: {
      type: Array,
      value: []
    }
  },


  methods: {
    onChange(event) {
      this.setData({
        search: event.detail
      })
    },
    onClear(event) {
      this.setData({
        search: event.detail
      })
      this.handleSearch()
    },
    handleSearch() {
      this.triggerEvent('handleSearch',this.data.search)
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