// pages/main/order/orderComponent/orderItem/orderItem.js

const app = getApp()
const takeOrder = require('../../../../../utils/database').takeOrder


Component({
  /**
   * 组件的属性列表
   */
  properties: {
    packageItem: {
      type: Object,
      value: {},
      observer(newVal) {
        let {_id, type, compony, kind, deadline, located, cutOff, updateTime} = newVal
        this.setData({
          _id,
          type,
          compony,
          kind,
          deadline,
          located,
          cutOff,
          updateTime
        })
      }
    },
    courierInfo: Object
  },

  pageLifetimes: {
    show() {
      // 页面被展示,隐藏所有操作栏
      if (this.data.showDetail) {
        this.hideDetail()
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 订单相关数据
    _id: null,
    type: null,
    compony: null,
    kind: null,
    located: null,
    deadline: null,
    updateTime: null,
    // 订单操作界面
    showDetail: false
  },

  pageLifetimes: {
    show() {
      this.setData({
        showDetail: false
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
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

    takenOrder() {
      let openid = app.globalData._openid
      // 若第一次接单,添加快递员信息
      // console.log(this.data.courierInfo)
      if (this.data.courierInfo === null) {
        wx.showModal({
          title: '提示',
          content: '这是您第一次接单,请填写您的联系方式',
          confirmText: '填写',
          confirmColor: '#8E0B02',
          success: (res) => {
            if (res.confirm) {
              this.triggerEvent('showForm', {
                showDetail: this.hideDetail.bind(this),
                type: 'insert'
              })
            } else if (res.cancel) {
              this.hideForm()
            }
          }
        })
        this.setData({
          showForm: true
        })
      }else {  // 已有信息,直接接单
        wx.showModal({
          title: '请确认',
          content: '请确认您的接单,保证包裹能够准时送达哦!',
          confirmColor: '#8E0B02',
          success: (res) => {
            if (res.confirm) {
              takeOrder(this.data._id, openid, 'package')
              this.setData({
                showDetail: false
              })
            } else if (res.cancel) {
              this.hideDetail()
            }
          }
        })
      }
    },
    confirmOrder() {
      let confirm = true  // 接单的最后标志
      let date = new Date() // 当前时间
      let hoursRemain = new Date(this.data.cutOff).getHours() - date.getHours()
      let minsRemain
      if (hoursRemain <= 0) {
        minsRemain = new Date(this.data.cutOff).getMinutes() - date.getMinutes()
        confirm = false
      }
      if (minsRemain <= 40) {
        wx.showModal({
          title: '请注意',
          content: '您在该订单中剩余的时间不多了,仅剩' + minsRemain + '分钟',
          confirmColor: '#8E0B02',
          success: (res) => {
            if (res.confirm) {
              confirm = true
              this.takenOrder()
            } else if (res.cancel) {
              this.hideDetail()
            }
          }
        })
      }
      // 最终确认后才能提交订单
      if (confirm) {
        this.takenOrder()
      }
    }
  }
})
