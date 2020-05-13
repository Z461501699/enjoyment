// components/school-item/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 学校图片
    url: {
      value: 'http://searchfoto.ru/img/xyygpKbDS1y8pTjXUy83VS8rMS9fLSy3RL8mwz0yx9fcM0EtJ0S2PyCnOy8sOSTMOqQq38I23NHf0SHTNV0vMLbAutzUyNgCzMmwNzSGsomJbQzCjIDnHNgUMwNx8W1OIMNBoQz1DAA.jpg',
      type: String
    },
    // 学校名称
    title: {
      value: '学校名称',
      type: String,
    },
    // 课程数量
    sourseNum: {
      value: 0,
      type: Number
    },
    // 老师数量
    teacherNum: {
      value: 0,
      type: Number
    },
    // 评分
    score: {
      value: 10,
      type: Number
    },
    // 学校类型
    schoolType: {
      value: '英语',
      type: String
    },
    // 地址
    address: {
      value: '山东省青岛市市北区金华路33号',
      type: String
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

    handleToDetail(e){
      const {currentTarget} = e
      const { id } = currentTarget
      this.triggerEvent('toDetail',id)
    }




    
  }
})