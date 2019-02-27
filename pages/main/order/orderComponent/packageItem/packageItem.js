// pages/main/order/orderComponent/orderItem/orderItem.js

const app = getApp()
const pullOrder = require('../../../../../utils/database').pullOrder

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    packageItem: {
      type: Object,
      value: {},
      observer(newVal) {
        let {_id, type, compony, deadline, located, room, phone} = newVal
        this.setData({
          _id,
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
    _id: null,
    type: null,
    compony: null,
    located: null,
    room: null,
    phone: null,
    showDetail: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // navToDetail() {
    //   let data = JSON.stringify(this.data.packageItem)
    //   console.log(data)
    //   wx.navigateTo({
    //     url: '/pages/main/order/package/packageDetail/packageDetail?data=' + data
    //   })
    // }
    getDetail() {
      let showDetail = !this.data.showDetail
      this.setData({
        showDetail,
      })
    },
    hideDetail() {
      this.setData({
        showDetail: false
      })
    },
    confirmOrder() {
      let openid = app.globalData._openid
      pullOrder(openid, this.dada._id).then(res => {
        wx.showToast({
          title: '接单成功!',
          icon: 'success'
        })
        wx.navigateTo({
          url: '/pages/main/profile/myOrderList/myOrderList'
        })
      })
    }
  }
})
