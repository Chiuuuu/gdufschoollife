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
    currentIndex: 0,
    pageWidth: 0,
    startX: 0
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
    let pageWidth = wx.getSystemInfoSync().screenWidth / 2
    // console.log(pageWidth)
    this.setData({
      pageWidth
    })
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
   * 监听页面滚动并改变当前index
   */
  changeIndex(e) {
    let currentIndex = e.detail.current
    this.setData({
      currentIndex,
      startX: currentIndex * this.data.pageWidth
    })
  },

  /**
   * 点击切换
   */
  tapChangeIndex(e) {
    let currentIndex = e.currentTarget.dataset.index
    this.setData({
      currentIndex,
      startX: currentIndex * this.data.pageWidth
    })
  }
})