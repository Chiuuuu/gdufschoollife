// pages/main/order/orderComponent/orderItem/orderItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    packageItem: {
      type: Object,
      value: {},
      observer(newVal) {
        let {type, compony, deadline, located, room, phone} = newVal
        this.setData({
          type,
          compony,
          deadline,
          located,
          room,
          phone
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    type: null,
    compony: null,
    located: null,
    room: null,
    phone: null
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
