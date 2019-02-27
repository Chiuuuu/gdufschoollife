// components/pageNav/pageNav.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0,
    pageWidth: 0,
    startX: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
  },

  lifetimes: {
    ready() {
      let pageWidth = wx.getSystemInfoSync().screenWidth / 2
      // console.log(pageWidth)
      this.setData({
        pageWidth
      })
    }
  }
})
