// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID
  const pid = event.pid
  const db = cloud.database()
  const _ = db.command
  try {
    db.collection('t_user')
      .where({
        _openid: openid,
      })
      .update({
        data: {
          savePositions: _.push(pid)
        }
      })
  } catch (e) {
    // console.log(e)
  }
 

}