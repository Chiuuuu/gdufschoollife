// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    package: [
      {
        type: 'urgent',
        compony: '中通',
        deadline: '今天16点',
        located: '17栋',
        room: 'a502',
        phone: '12345678910'
      },
      {
        type: 'today',
        compony: '圆通',
        located: '11栋',
        deadline: '今天20点',
        room: '603',
        phone: '12345678910'
      },
      {
        type: 'normal',
        compony: '顺丰',
        located: '6栋',
        deadline: '明天下午4点',
        room: '906',
        phone: '12345678910'
      },
    ],
    exchange: [
      {
        image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550574259180&di=0f15a8746de14272a425d7aab4ac21dd&imgtype=0&src=http%3A%2F%2Fimg5.pcpop.com%2FArticleImages%2F0x0%2F3%2F3470%2F003470624.jpg',
        goodsName: 'Apple watch',
        desc: '9成新苹果手表低价出',
        timeStamp: '1550564056113',
        name: 'x同学',
        phone: '12345678910'
      },
      {
        image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550574259180&di=0f15a8746de14272a425d7aab4ac21dd&imgtype=0&src=http%3A%2F%2Fimg5.pcpop.com%2FArticleImages%2F0x0%2F3%2F3470%2F003470624.jpg',
        goodsName: 'apple watch',
        desc: '7成新苹果手表低价出',
        timeStamp: '1550564056113',
        name: 'x同学',
        phone: '12345678910'
      },
    ],
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