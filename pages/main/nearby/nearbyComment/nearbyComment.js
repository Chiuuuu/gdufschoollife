// pages/main/nearby/nearbyComment/nearbyComment.js
let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: null,
    name: null,
    timeStamp: null,
    content: null,
    comment: [],
    like: 0,
    liked: false,
    index: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.data)
    let {avatar, name, timeStamp, content, comment, like, liked} = JSON.parse(options.data)
    this.setData({
      avatar,
      name,
      timeStamp,
      content,
      comment,
      like,
      liked,
      index: options.index
    })
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

  },

  clickLight(e) {
    // console.log(e.currentTarget.dataset.index)
    let itemIndex = this.data.index
    let index = e.currentTarget.dataset.index
    app.globalData.clickLightBtn(itemIndex, index)
  }
})