// pages/main/packageOrder/packageOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msgList: [
      {title: '地址', name: 'addr'},
      {title: '收件人', name: 'recv'},
      {title: '联系电话', name: 'phone'},
      {title: '快递公司', name: 'compony'},
    ],
    typeList: ['一般', '尽快', '加急'],
    defaultType: '一般'
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

  /**
   * 按钮数据
   */
  radioChange(e) {
    // console.log(e)
    this.setData({
      defaultType: e.detail.value
    })
  },

  /**
   * 表单提交
   */
  formSubmit(e) {
    console.log(e)
    let {addr, recv, phone, compony} = e.detail.value
    let packageOrder = {
      addr,
      recv,
      phone,
      compony,
      defaultType: this.data.defaultType,
      timeStamp: (new Date()).getTime()
    }

    let readyToNav = true
    for (let key in packageOrder) {
      if (packageOrder[key].length === 0) {
        wx.showToast({
          title: '请完善信息',
          icon: 'none',
          mask: true
        })
        readyToNav = false
      }
    }

    if (readyToNav) {
      wx.navigateBack({
        delta: 1
      })
    }
  }
})