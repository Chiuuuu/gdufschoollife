// pages/main/profile/myPushList/pItem/pItem.js

const getCourier = require('../../../../../utils/database').getCourier

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: Object,
    last: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    courierInfo: null
  },

  lifetimes: {
    ready() {
      if (this.data.item.isTaken) {
        getCourier(this.data.item.takenid).then(res => {
          this.setData({
            courierInfo: res.data[0]
          })
        })
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击快递员详细信息
    clickCourier() {
      this.triggerEvent('showInfo', {
        title: '您的包裹正由该小伙伴护送',
        name: this.data.courierInfo.name,
        phone: this.data.courierInfo.phone,
      })
    },
    // 确认收货
    clickReceive() {
      wx.showModal({
        title: '请确认',
        content: '请确认您是否已收到包裹,后果这边是不负责的哦~',
        confirmColor: '#8E0B02',
        success: (res) => {
          if (res.confirm) {
            // 删除数据库中的记录
          }
        }
      })
    },
    // 取消订单
    clickCancel() {
      if (this.data.item.isTaken) {
        wx.showModal({
          title: '提示',
          content: '该订单已经被接下了哦,请您与接单的小伙伴沟通解决',
          confirmColor: '#8E0B02'
        })
      }else {
        wx.showModal({
          title: '请确认',
          content: '您真的要取消订单吗',
          confirmColor: '#8E0B02',
          success: (res) => {
            if (res.confirm) {
              // 删除数据库中的记录
            }
          }
        })
      }
    }
  }
})
