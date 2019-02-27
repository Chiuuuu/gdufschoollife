// pages/order/order.js
const app = getApp()

// 初始化数据
wx.cloud.init()
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    done: false,
    package: null,
    exchange: null,
    showDetail: false,
    detailDesc: ''
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
    this.getDataBase()
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
    this.getDataBase()
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

  /**
   * 获取数据库中的最新数据
   * @param {*}
   */
  getDataBase() {
    let getPackage = db.collection('Order_PackageList').get()
    let getExchange = db.collection('Order_ExchangeList').get()

    Promise.all([getPackage, getExchange])
    .then(([packageList, exchangeList]) => {
      this.setData({
        done: true,
        packageList: packageList.data,
        exchangeList: exchangeList.data
      })
    })
  },

  /**
   * 监听点击商品详细描述
   */
  clickDetail(e) {
    // console.log(e.detail.desc)
    this.setData({
      showDetail: true,
      detailDesc: e.detail.desc
    })
  },

  /**
   * 确认订单
   */
  confirmExchange() {
    this.setData({
      showDetail: false,
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