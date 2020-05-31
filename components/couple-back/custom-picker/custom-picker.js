// components/couple-back/picker/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    rangeKey:{
     type:String,
     value:''
    },
    range:{
      type:Array,
      value:()=>[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // coupleList: [{
    //     text: '建议',
    //     id: 1
    //   },
    //   {
    //     text: '投诉',
    //     id: 2
    //   },
    // ],
    // coupleIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 选择投诉类型
    handleChangeCoupleBack(e) {
      console.log('range',this.range)
      // const {detail} = e
      // const {value} = detail
      // this.setData({
      //   coupleIndex: value
      // })
      // this.triggerEvent('change', value)
    }
  }
})