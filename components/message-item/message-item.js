// components/message/message-item.js
import {
  MESSAGE_OPTIONS
} from "../../config/commonData"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      type: Number,
      value: 0
    },
    options:{
      type:Object,
      value:{}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    MESSAGE_OPTIONS
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})