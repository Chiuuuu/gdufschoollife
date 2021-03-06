// pages/main/profile/myPushList/eItem/eItem.js
const getCourier = require('../../../../../utils/database').getCourier

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {},
      observer(newVal) {
        // 下载图片
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
        // 获取对方信息
        if (newVal.takenid !== null) {
          getCourier(newVal.takenid).then(res => {
            this.setData({
              partner: res.data[0]
            })
          })
        }
      }
    },
    last: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    image: null,
    partner: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 传入接单人信息
    clickDetail() {
      this.triggerEvent('showInfo', {
        title: '您的交易伙伴',
        name: this.data.partner.name,
        phone: this.data.partner.phone
      })
    },
  }
})
