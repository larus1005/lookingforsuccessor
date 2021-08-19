// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  //需要传入的参数，用户的openid，岗位的id
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID
  const positionId = event.pid
  const db = cloud.database()
  const users = db.collection('t_user')
  const _ = db.command
  try {
    return await users
      .where({
        _openid: openid,
      })
      .update({
        data: {
          savePositions: _.pull(positionId)
        }
      })
 
  } catch (e) {
    // console.log(e)
  }
}