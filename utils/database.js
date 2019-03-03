wx.cloud.init()
const db = wx.cloud.database()
const _ = db.command

module.exports.addLike = function(id, lighted) {
  // console.log(arguments)
  db.collection('Nearby_CommentList').doc(id).update({
    data: {
      like: lighted ? _.inc(1) : _.inc(-1),
      liked: lighted
    }
  })
  .then(res => console.log(res))
}

module.exports.updateCommentList = function(id, comment) {
  db.collection('Nearby_CommentList').doc(id).update({
    data: {
      comment,
    }
  })
}

/**
 * 根据查询条件读取数据库
 */
module.exports.getDataByOptions = function(options, context) {
  let getPackage
  if (!options.isTaken) {
    getPackage = db.collection('Order_PackageList').where({
      ...options,
      cutOff: _.gt((new Date()).getTime() + 1200000)
    }).get()
  }else {
    getPackage = db.collection('Order_PackageList').where(options).get()
  }
  let getExchange = db.collection('Order_ExchangeList').where(options).get()

  Promise.all([getPackage, getExchange])
  .then(([packageList, exchangeList]) => {
    context.setData({
      done: true,
      packageList: packageList.data.reverse(),
      exchangeList: exchangeList.data.reverse()
    })
  })
}

/**
 * 查询快递员信息
 */
module.exports.getCourier = function getCourier(openID) {
  return db.collection('Couriers').where({_openid: openID}).get()
}

/**
 * 添加快递员信息
 */
module.exports.addCourier = function addCourier(info) {
  return db.collection('Couriers').add({
    data: {
      ...info
    }
  })
}

/**
 * 更新快递员信息
 */
module.exports.updateCourier = function updateCourier(id, info) {
  return db.collection('Couriers').doc(id).update({
    data: {
      ...info
    }
  })
}

/**
 * 接单函数封装
 */
module.exports.takeOrder = function(orderID, openID, type) {
  let collection;
  // 判断是包裹类还是交易类
  if (type === 'package') {
    collection = 'Order_PackageList'
  }else if (type === 'exchange') {
    collection = 'Order_ExchangeList'
  }
  // 根据数据库表名称更新数据
  db.collection(collection).doc(orderID).update({
    data: {
      isTaken: true,
      takenTime: (new Date()).getTime(),
      takenid: openID
    }
  })
  .then(res => {   // 显示吐司并跳转至接单页面
    console.log('接单成功')
    wx.showToast({
      title: '接单成功!',
      icon: 'success'
    })
    wx.navigateTo({
      url: '/pages/main/profile/myTakenList/myTakenList'
    })
  })
}