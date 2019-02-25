//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    shareList: [
      {
        avatar: '/images/nearby/didLike.png',
        name: 'xxx',
        timeStamp: (new Date()).getTime(),
        content: '道路千万条,学习第一条,寒假不努力,开学两行泪',
        comment: [
          {
            avatar: '/images/nearby/didLike.png',
            name: 'xxx',
            timeStamp: (new Date()).getTime(),
            content: '1',
            lighted: false
          },
          {
            avatar: '/images/nearby/didLike.png',
            name: 'xxx',
            timeStamp: (new Date()).getTime(),
            content: '2',
            lighted: false
          },
          {
            avatar: '/images/nearby/didLike.png',
            name: 'xxx',
            timeStamp: (new Date()).getTime(),
            content: '3',
            lighted: false
          },
        ],
        like: 5,
        liked: false
      },
      {
        avatar: '/images/nearby/didLike.png',
        name: 'xxx',
        timeStamp: (new Date()).getTime(),
        content: '道路千万条,学习第一条,寒假不努力,开学两行泪',
        comment: [],
        like: 5,
        liked: true
      },
    ],
    clickLightBtn(itemIndex, commentIndex) {
      console.log(itemIndex, commentIndex)
      let lighted = this.shareList[itemIndex].comment[commentIndex].lighted
      this.shareList[itemIndex].comment[commentIndex].lighted = !lighted
    }
  },

})