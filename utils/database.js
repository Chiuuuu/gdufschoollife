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