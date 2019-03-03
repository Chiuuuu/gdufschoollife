// pages/order/order.js

const app = getApp()
const getDataByOptions = require('../../../utils/database').getDataByOptions
const getCourier = require('../../../utils/database').getCourier
const addCourier = require('../../../utils/database').addCourier
const updateCourier = require('../../../utils/database').updateCourier
const takeOrder = require('../../../utils/database').takeOrder

Page({

  /**
   * 页面的初始数据
   */
  data: {
    done: false,
    package: null,
    exchange: null,

    // 订单信息
    showDetail: false,
    detailDesc: '',
    confirmID: null,

    // 快递员信息
    courierInfo: null,
    hideForm: true,
    empty: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let databaseOptions = {isTaken: false}
    getDataByOptions(databaseOptions, this)
    getCourier(app.globalData._openid).then(res => {
      if (res.data[0]) {
        this.setData({
          courierInfo: res.data[0],
          showDetail: false
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    let databaseOptions = {isTaken: false}
    getDataByOptions(databaseOptions, this)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 隐藏表单
  hideForm() {
    this.setData({
      hideForm: true
    })
  },
  // 弹出表单
  showForm(e) {
    if (e.detail.showDetail) e.detail.showDetail()
    this.setData({
      postType: e.detail.type,
      hideForm: false,
      empty: ''
    })
  },
  // 添加快递员信息
  postCourierInfo(e) {
    let courierInfo = {...e.detail.value}
    let courier, title
    if (this.data.postType === 'insert') {
      // 将信息添加入数据库并更新data数据
      courier = addCourier(courierInfo)
      title = '请重新接单'
    }else if (this.data.postType === 'update') {
      // 更新数据
      courier = updateCourier(this.data.courierInfo._id, courierInfo)
      title = '改绑成功'
    }
    courier.then(result => {
      // 操作成功
      wx.showToast({
        title: title,
        icon: 'success',
        duration: 2000
      })
      // 隐藏表单
      this.hideForm()
      // 重新获取信息
      getCourier(app.globalData._openid).then(res => {
        this.setData({
          courierInfo: res.data[0]
        })
      })
    }).catch(err => {
      throw err
    })
  },

  /**
   * 监听点击商品详细描述
   */
  clickDetail(e) {
    // console.log(e.detail.desc)
    this.setData({
      showDetail: true,
      detailDesc: e.detail.desc,
      confirmID: e.detail.id
    })
  },

  /**
   * 确认交易订单
   */
  confirmExchange() {
    wx.showModal({
      title: '请确认',
      content: '确认订单后,将获取卖家更详细的信息\n注: 本平台仅支持线下当面交易',
      confirmColor: '#8E0B02',
      success: (res) => {
        if (res.confirm) {
          let openid = app.globalData._openid
          takeOrder(this.data.confirmID, openid, 'exchange')
          this.setData({
            showDetail: false
          })
        } else if (res.cancel) {
          this.cancelDetail()
        }
      }
    })
  },

  /**
   * 取消接单
   */
  cancelDetail() {
    this.setData({
      showDetail: false,
    })
  }
})


