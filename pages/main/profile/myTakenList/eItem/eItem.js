// pages/main/profile/myTakenList/eItem/eItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {},
      observer(newVal) {
        wx.cloud.downloadFile({
          fileID: newVal.fileID, // 文件 ID
          success: res => {
            // 返回临时文件路径
            // console.log(res.tempFilePath)
            this.setData({
              image: res.tempFilePath
            })
          },
          fail: console.error
        })
      }
    },
    last: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    image: null
  },

  lifetimes: {
    ready() {

    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickDetail() {
      // 传入订单发布者的信息
      this.triggerEvent('showInfo', {
        title: '您的交易伙伴',
        name: this.data.item.name,
        phone: this.data.item.phone
      })
    },
  }
})
