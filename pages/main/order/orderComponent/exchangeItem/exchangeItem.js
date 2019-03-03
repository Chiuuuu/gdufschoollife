// pages/main/order/orderComponent/exchangeItem/exchangeItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    exchangeItem: {
      type: Object,
      value: {},
      observer(newVal) {
        let {_id, fileID, image, price, goodsName, desc, timeStamp, name, phone} = newVal
        wx.cloud.downloadFile({
          fileID: fileID, // 文件 ID
          success: res => {
            // 返回临时文件路径
            // console.log(res.tempFilePath)
            image = res.tempFilePath
            this.setData({
              _id,
              image,
              price,
              goodsName,
              desc,
              timeStamp,
              name,
              phone
            })
          },
          fail: console.error
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    _id: null,
    image: '',
    goodsName: '',
    price: '',
    desc: '',
    timeStamp: '',
    name: '',
    phone: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickShowDetail() {
      this.triggerEvent('clickDetail', {
        desc: this.data.desc,
        id: this.data._id
      })
    }
  }
})
