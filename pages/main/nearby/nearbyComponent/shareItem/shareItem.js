// pages/main/nearby/nearbyComponent/share-box/shareBox.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemIndex: Number,
    shareItem: {
      type: Object,
      value: {},
      observer(newVal) {
        let {_id, _openid, avatar, name, timeStamp, content, comment, like, liked} = newVal
        this.setData({
          _id,
          _openid,
          avatar,
          name,
          timeStamp,
          content,
          comment,
          like,
          liked
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    _id: null,
    _openid: null,
    avatar: null,
    name: null,
    timeStamp: null,
    content: null,
    comment: null,
    like: null,
    liked: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击评论按钮
    clickComment() {
      let id = this.data._id
      // 跳转到正文界面
      wx.navigateTo({
        url: `/pages/main/nearby/nearbyComment/nearbyComment?id=${id}`
      })
    },
    // 点击点赞按钮
    clickLike() {
      // console.log(e)
      let liked = !this.data.liked
      this.triggerEvent('clickLike', {add: liked, id: this.data._id})
    }
  }
})
