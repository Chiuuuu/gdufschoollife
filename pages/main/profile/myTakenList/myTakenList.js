// pages/main/profile/myTakenList/myTakenList.js

const app = getApp()
const getDataByOptions = require('../../../../utils/database').getDataByOptions

Page({

  /**
   * 页面的初始数据
   */
  data: {
    done: null,
    packageList: null,
    exchangeList: null,

    // 详细信息
    hideInfo: true,
    detailInfo: null,
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
    let databaseOptions = {
      isTaken: true,
      takenid: app.globalData._openid
    }
    getDataByOptions(databaseOptions, this)
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
    let databaseOptions = {
      isTaken: true,
      takenid: app.globalData._openid
    }
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

  /**
   * 显示快递员信息
   */
  showInfo(e) {
    // console.log(e)
    this.setData({
      hideInfo: false,
      detailInfo: {...e.detail}
    })
  },
})