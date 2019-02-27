// pages/main/order/orderComponent/orderController/orderController.js
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击图标时弹出选项
    btnClick() {
      wx.showActionSheet({
        itemList: ['创建代取快递订单', '创建二手交易订单'],
        success(res) {
          // console.log(res.tapIndex)
          if (res.tapIndex === 0) {
            wx.navigateTo({
              url: '/pages/main/order/package/packageOrder/packageOrder'
            })
          }else if (res.tapIndex === 1) {
            wx.navigateTo({
              url: '/pages/main/order/exchange/exchangeOrder/exchangeOrder'
            })
          }
        }
      })
    }
  }
})
