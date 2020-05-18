// components/couple-back/picker/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    coupleList: [{
        text: '投诉1',
        id: 1
      },
      {
        text: '投诉2',
        id: 2
      },
      {
        text: '投诉3',
        id: 3
      },
      {
        text: '投诉4',
        id: 4
      },
      {
        text: '投诉5',
        id: 5
      },
    ],
    coupleIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 选择投诉类型
    handleChangeCoupleBack(e) {
      const {detail} = e
      const {value} = detail
      console.log('选择了', value);
      this.setData({
        coupleIndex: value
      })
      this.triggerEvent('picker', value)
    }
  }
})