// pages/main/home/home.js

// 初始化数据库
wx.cloud.init()
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: [
      {
        image: '/images/category/package.png',
        title: '代取快递'
      },
      {
        image: '/images/category/exchange.png',
        title: '二手/易物'
      },
      {
        image: '/images/category/classroom.png',
        title: '空教室查询'
      },
      {
        image: '/images/category/taxi.png',
        title: '拼车出行'
      },

    ],
    imgUrls: [
      '/images/banner/banner1.png',
      '/images/banner/banner2.jpg',
      '/images/banner/banner3.jpg',
      '/images/banner/banner4.jpg',
    ],
    classList: [
      {
        name: '创业基础',
        located: '北教A201',
        time: '第一大节',
        week: '1-17周',
        teacher: '王芸芸讲师'
      },
      {
        name: '商业银行基础',
        located: '实验室203',
        time: '第四大节',
        week: '1-17周',
        teacher: '郑根创讲师'
      },
    ]
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

  }
})