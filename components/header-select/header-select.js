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
    array: [{
      message: 'foo',
    }, {
      message: 'bar'
    }],
    // selectTitles:[{key:'距离',value:'dance'},{key:'销量',value:'num'},{key:'排序',value:'sort'}],
    // selectOptions: [
    //   [
    //     { text: '很棒', value: 'veryGood' },
    //     { text: '优秀', value: 'good' },
    //     { text: '良好', value: 'normal' },
    //   ],
    //   [
    //     { text: '英语', value: 'english' },
    //     { text: '数学', value: 'math' },
    //     { text: '语文', value: 'yu' },
    //   ],
    //   [
    //     { text: '百强', value: 'a' },
    //     { text: '优秀教师', value: 'b' },
    //     { text: '一般教师', value: 'c' },
    //   ]
    // ]
  },
  properties: {
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

    getItem(event) {
      // 自定义事件返回 {key,value}
      this.triggerEvent("change", {
        key: event.currentTarget.dataset['index'].value,
        value: event.detail
      });
    },
  }
})