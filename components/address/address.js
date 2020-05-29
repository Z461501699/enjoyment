// components/address/address.js
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
    areaList: {
      province_list: {
        110000: '北京市',
        120000: '天津市'
      },
      city_list:{},
      county_list: {}
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleConfirm(e){
      console.log(e)
    },
    handleChange(e){
      console.log(e)
      let areaList = this.data.areaList
      areaList['city_list'] = {
        110100: '北京市',
        120100: '天津市',
      }
      areaList['county_list'] = {
        110101: '东城区',
        110102: '西城区',
        110205: '朝阳区',
        110206: '丰台区',
        120101: '和平区',
        120102: '河东区',
        120103: '河西区',
        120104: '南开区',
        120105: '河北区',
      }
      this.setData({
        areaList
      })
    }
  }
})