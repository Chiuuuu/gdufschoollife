// pages/main/profile/myTakenList/pItem/pItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: Object,
    last: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {

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
      this.triggerEvent('showInfo', {
        title: '您正在护送该小伙伴的包裹',
        name: this.data.item.recv,
        phone: this.data.item.phone
      })
    },
  }
})
