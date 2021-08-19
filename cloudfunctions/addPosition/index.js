// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID
  const position = event.position
  const db = cloud.database()
  const date = db.serverDate()
  try{
    db.collection('t_position')
    .add({
        data: {
          company:position.company,
          name: position.name,
          type: position.type,
          location: position.location,
          detail:position.detail,
          email:position.email,
          tag1:position.tag1,
          tag2:position.tag2,
          tag3:position.tag3,
          tip:position.tip,
          user_id: openid,
          is_deleted: 0,
          create_time:date, 
          update_time:date
          //position:position
        }
        })
  }catch (e) {
  }
  
}