// pages/main/nearby/nearbyComment/nearbyComment.js
let app = getApp()
const updateCommentList = require('../../../../utils/database').updateCommentList

wx.cloud.init()
const db = wx.cloud.database()
const _ = db.command

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    avatar: null,
    name: null,
    timeStamp: null,
    content: null,
    comment: null,
    like: 0,
    liked: false,
    index: 0,

    mask: false,  // 评论蒙版
    commentVal: '', // 用户评论
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 每当进入页面,根据id获取数据库数据
    db.collection('Nearby_CommentList').doc(options.id).get()
    .then(res => {
      let {avatar, name, timeStamp, content, comment, like, liked} = res.data
      // console.log(comment)
      this.setData({
        id: options.id,
        avatar,
        name,
        timeStamp,
        content,
        comment: comment.reverse(),
        like,
        liked
      })
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
    // 离开该页面时更新数据库
    updateCommentList(this.data.id, this.data.comment.reverse())
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

  // 点亮/灭评论
  clickLight(e) {
    // console.log(e, this.data.id)
    let itemIndex = e.detail.index,
        lighted = e.detail.lighted;

    this.data.comment[itemIndex].light += lighted ? 1 : -1
    this.data.comment[itemIndex].lighted = lighted
    // addLike(this.data.id, lighted, itemIndex)
  },

  /**
   * 点击评论按钮添加自己的评论
   */
  clickComment() {
    this.setData({
      mask: true
    })
  },

  // 更新输入的内容
  // saveValue(e)  {
  //   console.log()
  //   let commentVal = e.detail.value
  //   console.log(commentVal)
  //   this.setData({
  //     commentVal,
  //   })
  // },

  // 发送评论
  sendComment(e) {
    let user = app.globalData.userInfo
    let value = e.detail.value.commentVal

    // 创建新评论对象
    let newComment = {
      avatar: user.avatarUrl,
      name: user.nickName,
      content: value,
      timeStamp: (new Date()).getTime(),
      light: 0,
      lighted: false
    }
    // 修改当前数组
    let comment = this.data.comment
    comment.unshift(newComment)
    // 刷新页面
    this.setData({
      mask: false,
      comment,
    })
  },

  // 取消发送评论
  cancelComment() {
    this.setData({
      mask: false
    })
  }
})