// components/couple-back/picker/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: Array,
    keys: Object,
    value: Number,
    placeholder: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectIndex: ''
  },
  ready() {
    let { value, data, keys } = this.properties;
    let selectIndex = data.findIndex((item, index) => {
      return value === item[keys['value']]
    })
    this.setData({
      selectIndex
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 选择投诉类型
    handleChangeCoupleBack(e) {
      let { data } = this.data,
        selectIndex = e.detail.value
      this.setData({
        selectIndex
      }, () => {
        this.triggerEvent('change', { value: data[selectIndex]['value'] })
      })
    }
  }
})