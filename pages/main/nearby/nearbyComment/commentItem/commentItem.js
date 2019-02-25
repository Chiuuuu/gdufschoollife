// pages/main/nearby/nearbyComment/commentList/commentList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    commentItem: {
      type: Object,
      value: {},
      observer(newVal) {
        let {avatar, name, timeStamp, content, lighted} = newVal
        this.setData({
          avatar,
          name,
          timeStamp,
          content,
          lighted
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
    lighted: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 点击点亮
     */
    clickLight() {
      let lighted = !this.data.lighted
      this.setData({
        lighted,
      })
      this.triggerEvent('clickLight')
    }
  }
})
