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
        let {avatar, name, timeStamp, content, comment, like, liked} = newVal
        this.setData({
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
      console.log(this.data.shareItem)
      let data = JSON.stringify(this.data.shareItem)
      let index = this.data.itemIndex
      // 跳转到正文界面
      wx.navigateTo({
        url: `/pages/main/nearby/nearbyComment/nearbyComment?data=${data}&index=${index}`
      })
    },
    // 点击点赞按钮
    clickLike() {
      // console.log(e)
      let liked = !this.data.liked
      this.triggerEvent('clickLike', {add: liked})
    }
  }
})
