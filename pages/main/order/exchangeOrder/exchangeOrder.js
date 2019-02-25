// pages/main/exchangeOrder/exchangeOrder.js
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
      {title: '物品名称', name: 'goods'}
    ],
    descVal: '',
    goodsImg: ''
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
    console.log(e)
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
        // console.log(res.tempFilePaths)
        // 保存到本地
        wx.saveFile({
          tempFilePath: res.tempFilePaths[0],
          success: res => {
            // console.log(res.savedFilePath)
            this.setData({
              goodsImg: res.savedFilePath
            })
          }
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
   * 替换图片
   */
  changeImage() {
    wx.chooseImage({
      count: 1,	// 默认为9
      sizeType: ['original', 'compressed'],	// 指定原图或者压缩图
      sourceType: ['album', 'camera'],	// 指定图片来源
      success: res => {
        // console.log(res.tempFilePaths)
        // 删除前一张图片
        wx.getSavedFileList({
          success(res) {
            let len = res.fileList.length
            if (len > 0) {
              // console.log(res)
              // 删除最近保存的一张图片,即刚才选择的那张
              wx.removeSavedFile({
                filePath: res.fileList[len - 1].filePath,
                complete(res) {
                  // console.log(res)
                }
              })
            }
          }
        })
        // 将新图片保存到本地
        wx.saveFile({
          tempFilePath: res.tempFilePaths[0],
          success: res => {
            // console.log(res)
            this.setData({
              goodsImg: res.savedFilePath
            })
          }
        })
      }
    })
  },

  /**
   * 表单提交
   */
  formSubmit(e) {
    console.log(e)
    let {name, phone, goods} = e.detail.value
    let exchangeOrder = {
      name,
      phone,
      goods,
      descVal: this.data.descVal,
      goodsImg: this.data.goodsImg,
      timeStamp: (new Date()).getTime()
    }
    // console.log(exchangeOrder)
    
    let readyToNav = true // 跳转标记

    for (let key in exchangeOrder) {
      // 除图片外其他属性为空会提示完善信息
      if (key !=='goodsImg' && exchangeOrder[key].length === 0) {
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