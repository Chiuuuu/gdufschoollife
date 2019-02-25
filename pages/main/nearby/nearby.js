// pages/nearby/nearby.js
let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    poster: '/images/poster.jpg',
    shareList: app.globalData.shareList
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

  },

  clickLike(e) {
    // console.log(e)
    let index = e.currentTarget.dataset.index
    let add = e.detail.add
    // 子组件传过来的参数, 判断是否点赞数+1和用户是否点过赞
    let shareList = this.data.shareList
    shareList[index].like = add ? shareList[index].like + 1 : shareList[index].like - 1
    shareList[index].liked = !shareList[index].liked
    this.setData({
      shareList
    })

  }
})