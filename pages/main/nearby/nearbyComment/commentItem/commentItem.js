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
        let {avatar, name, timeStamp, content, light, lighted} = newVal
        this.setData({
          avatar,
          name,
          timeStamp,
          content,
          light,
          lighted
        })
      }
    },
    itemIndex: Number,
    itemId: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    avatar: null,
    name: null,
    timeStamp: null,
    content: null,
    light: null,
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
      let light = this.data.light += lighted ? 1 : -1
      this.setData({
        light,
        lighted
      })
      this.triggerEvent('clickLight', {
        index: this.data.itemIndex,
        lighted: lighted
      })
    }
  }
})
