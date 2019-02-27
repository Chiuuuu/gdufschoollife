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
        let {fileID, image, price, goodsName, desc, timeStamp, name, phone} = newVal
        if (fileID) {
          wx.cloud.downloadFile({
            fileID: fileID, // 文件 ID
            success: res => {
              // 返回临时文件路径
              // console.log(res.tempFilePath)
              image = res.tempFilePath
              this.setData({
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
        }else {
          this.setData({
            image,
            goodsName,
            price,
            desc,
            timeStamp,
            name,
            phone
          })
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
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
      this.triggerEvent('clickDetail', {desc: this.data.desc})
    }
  }
})
