// components/sales-return-item/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    options:{
      type:Object,
      value:()=>{
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClick(){
      this.triggerEvent('click',this.data.options)
    },
  },
})
