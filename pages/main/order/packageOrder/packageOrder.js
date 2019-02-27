// pages/main/packageOrder/packageOrder.js

let app = getApp()
wx.cloud.init()
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    msgList: [
      {title: '地址', name: 'located'},
      {title: '宿舍号', name: 'room'},
      {title: '收件人', name: 'recv'},
      {title: '联系电话', name: 'phone'},
      {title: '快递公司', name: 'compony'},
    ],
    typeList: ['佛系', '今天内', '2小时内'],
    defaultType: '佛系'
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
    let {located, room, recv, phone, compony} = e.detail.value
    let type
    switch (this.data.defaultType) {
      case '佛系':
        type = 'normal'
        break;
      case '今天内':
        type = 'today'
        break;
      case '2小时内':
        type = 'urgent'
        break;
    }
    let packageOrder = {
      located,
      room,
      recv,
      phone,
      compony,
      type,
      deadline: this.data.defaultType,
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
      db.collection('Order_PackageList').add({
        data: packageOrder
      }).then(res => {
        wx.navigateBack({
          delta: 1
        })
      })

    }
  }
})