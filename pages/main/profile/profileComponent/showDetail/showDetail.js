// pages/main/profile/profileComponent/showDetail/showDetail.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hideInfo: {
      type: Boolean,
      value: true
    },
    detail: Object
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
    /**
     * 隐藏信息栏
     */
    clickHideInfo(e) {
      if (e.target.id === 'detail-info-mask') {
        this.setData({
          hideInfo: true
        })
      }
    }
  }
})
