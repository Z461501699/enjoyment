Component({
  options:{

    // 表示激活使用插槽
    multipleSlots:true
  },
  data: {
    value1: 0,
    value2: 'a',
    value3: 'a',
    option1: [
      { text: '全部商品', value: 0 },
      { text: '新款商品', value: 1 },
      { text: '活动商品', value: 2 },
    ],
    option2: [
      { text: '默认排序', value: 'a' },
      { text: '好评排序', value: 'b' },
      { text: '销量排序', value: 'c' },
    ],
    option3: [
      { text: '默认排序', value: 'a' },
      { text: '好评排序', value: 'b' },
      { text: '销量排序', value: 'c' },
    ],
  },
  properties: {
    search:{
      type:String,
      value: '学校'
    },
    position:{
      type:String,
      value: '青岛'
    },
    input1:{
      type:String,
      value: '英语'
    },
    opt1:{
      type:String,
      value:'默认1'
    },
    opt2:{
      type:String,
      value:'默认2'
    },
    opt3:{
      type:String,
      value:'默认3'
    },
    options1:{
      type:Array,
      value:[]
    },
    options2:{
      type:Array,
      value:[]
    },
    options3:{
      type:Array,
      value:[]
    }
  },
  methods: {
    onGetUserInfo(event){

      // triggerEvent("eventname", event.detail, {})
      // triggerEvent表示这里是自定义的事件。
      // 第一个参数："eventname"，表示事件名。事件名随便起，这里以eventname为例。在外部使用组件时，bind:这里自定义的事件名="xxxx"。本例中，在外部使用组件时就是：bind:eventname="xxxx"
      // 第二个参数：event.detail自定义事件传递的数据；
      // 第三个参数：{}
      this.triggerEvent("eventname", event.detail, {});

    }
  }
})