// pages/main/order/orderComponent/exchangeItem/exchangeItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    exchangeItem: {
      type: Object,
      value: {},
      observer(newVal) {
        let {image, goodsName, desc, timeStamp, name, phone} = newVal
        this.setData({
          image,
          goodsName,
          desc,
          timeStamp,
          name,
          phone
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    image: '',
    goodsName: '',
    desc: '',
    timeStamp: '',
    name: '',
    phone: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
