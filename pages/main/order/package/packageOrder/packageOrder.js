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
      {title: '包裹种类', name: 'kind'},
      {title: '收件人', name: 'recv'},
      {title: '联系电话', name: 'phone'},
    ],
    build: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
    buildVal: null,
    room: [
      ['无','a','b','c','d'],
      ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15'],
      ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20']
    ],
    roomVal: null,
    compony: ['顺丰', '圆通', '中通', '申通', '百世', '邮政', '韵达', '京东', '天天'],
    componyVal: null,
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
   * 宿舍地址
   * @param {*} e
   */
  bindBuildChange(e) {
    // console.log(e)
    this.setData({
      buildVal: this.data.build[e.detail.value] + '栋'
    })
  },
  /**
   * 房号
   * @param {*} e
   */
  bindRoomChange(e) {
    // console.log(e)
    let room = this.data.room
    let roomVal = ''
    e.detail.value.map((item, index) => {
      roomVal += room[index][item]
    })
    // console.log(roomVal)
    if (roomVal.indexOf('无') !== -1) {
      roomVal = roomVal.slice(1)
    }
    this.setData({
      roomVal,
    })
  },
  /**
   * 快递公司
   * @param {*} e
   */
  bindComponyChange(e) {
    this.setData({
      componyVal: this.data.compony[e.detail.value] + '快递'
    })
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
    let {located, room, kind, recv, phone, compony} = e.detail.value
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
      kind,
      recv,
      phone,
      compony,
      type
    }
    // console.log(packageOrder)
    let readyToNav = true  // 订单提交开关
    for (let key in packageOrder) {
      if (key !== 'isTaken' && key !== 'takenid' && packageOrder[key].length === 0) {
        wx.showToast({
          title: '请完善信息',
          icon: 'none',
          mask: true
        })
        readyToNav = false  // 关闭提交
        return;
      }
    }
    if (readyToNav) {
      let updateTime = (new Date()).getTime()  // 当前时间
      let cutOff  //截止日期
      switch(this.data.defaultType) {
        case '2小时内':
          cutOff = updateTime + 7200000
          break;
        case '今天内':
          cutOff = updateTime + (22 - new Date(updateTime).getHours()) * 3600000 + (59 - new Date(updateTime).getMinutes()) * 60000
          break;
        case '佛系':
          cutOff = updateTime + (47 - new Date(updateTime).getHours()) * 3600000
          break;
      }
      Object.assign(packageOrder, {
        deadline: this.data.defaultType,
        isTaken: false,
        takenid: null,
        updateTime,
        cutOff,
        takenTime: 0,
      })
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