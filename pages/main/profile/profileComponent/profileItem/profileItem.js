// pages/main/profile/profileComponent/profileItem/profileItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: Object,
    index: Number
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    navigate() {
      let path = ''
      switch (this.data.item.title) {
        case '我的订单':
          path = 'myOrderList'
          break;
        case '私信':
          path = ''
          break;
        case '绑定邮箱':
          path = ''
          break;
        case '退出登录':
          path = ''
          break;
      }
      wx.navigateTo({
        url: `/pages/main/profile/${path}/${path}`
      })
    }
  }
})
