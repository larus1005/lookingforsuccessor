// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID
  const db = cloud.database()
  const user =(await db.collection('t_user')
  .aggregate()
    .lookup({
      from: 't_position',
      localField: 'savePositions',
      foreignField: '_id',
      as: 'positions',
    })
    .match({
          _openid: openid
        })
    .end()
    ) 

  return {
    data:user
  }
}