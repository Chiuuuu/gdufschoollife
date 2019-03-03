// pages/main/exchangeOrder/exchangeOrder.js
const app = getApp()

wx.cloud.init()
const db = wx.cloud.database()
const _ = db.command

Page({

  /**
   * 页面的初始数据
   */
  // {
  //   image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550574259180&di=0f15a8746de14272a425d7aab4ac21dd&imgtype=0&src=http%3A%2F%2Fimg5.pcpop.com%2FArticleImages%2F0x0%2F3%2F3470%2F003470624.jpg',
  //   goodsName: 'Apple watch',
  //   desc: '9成新苹果手表低价出',
  //   timeStamp: '1550564056113',
  //   name: 'x同学',
  //   phone: '12345678910'
  // }
  data: {
    msgList: [
      {title: '您的姓名', name: 'name'},
      {title: '联系电话', name: 'phone'},
      {title: '物品名称', name: 'goods'},
      {title: '物品价格', name: 'price'},
    ],
    descVal: '',
    goodsImg: '',
    fileID: '',
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
   * 获取描述信息
   */
  getDescVal(e) {
    this.setData({
      descVal: e.detail.value
    })
  },

  /**
   * 添加图片
   */
  addImage() {
    wx.chooseImage({
      count: 1,	// 默认为9
      sizeType: ['original', 'compressed'],	// 指定原图或者压缩图
      sourceType: ['album', 'camera'],	// 指定图片来源
      success: res => {
        // console.log(res)
        // 获取最新一张图片
        this.setData({
          goodsImg: res.tempFilePaths[res.tempFilePaths.length - 1]
        })
      }
    })
  },

  /**
   * 预览图片
   */
  previewImage(e){
    let src = e.currentTarget.dataset.src;//获取data-src
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: [src] // 需要预览的图片http链接列表
    })
  },

  /**
   * 表单提交
   */
  formSubmit(e) {
    // console.log(e)
    let {name, phone, price, goods} = e.detail.value
    wx.cloud.uploadFile({
      cloudPath: `ExchangeImage/${app.globalData._openid}_${(new Date()).getTime()}.png`, // 上传至云端的路径
      filePath: this.data.goodsImg, // 小程序临时文件路径
      success: res => {
        // 返回文件 ID
        // console.log(res.fileID)
        let exchangeOrder = {
          fileID: res.fileID,
          name,
          phone,
          price,
          goodsName: goods,
          desc: this.data.descVal,
          timeStamp: (new Date()).getTime(),
          isTaken: false,
          takenid: null
        }
        // console.log(exchangeOrder)

        let readyToNav = true // 跳转标记
        for (let key in exchangeOrder) {
          // 除图片外其他属性为空会提示完善信息
          if (key !== 'isTaken' && key !== 'takenid' && exchangeOrder[key].length === 0) {
            wx.showToast({
              title: '请完善信息',
              icon: 'none',
              mask: true
            })
            readyToNav = false
          }
        }

        if (readyToNav) {
          db.collection('Order_ExchangeList').add({
            data: exchangeOrder
          })
          .then(res => {
            wx.navigateBack({
              delta: 1
            })
          })
          .catch(err => console.log(err))
        }
      },
      fail: console.error
    })


  }
})