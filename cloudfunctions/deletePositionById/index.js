// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const pid = event.pid
  const db = cloud.database();
  const date = db.serverDate()
  try{
    db.collection('t_position').doc(pid)
    .update({
      data: {
        is_deleted: 1,
        update_time:date
      },
    })
  }catch (e) {
  }
}