// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID
  const db = cloud.database()
  const question = db.collection('t_question')
  const questions = (await question.aggregate()
  .lookup({
    from: 't_position',
    localField: 'pid',
    foreignField: '_id',
    as: 'positionDetail',
  })
  .match({
        quizzer_id: openid
      })
  .end()
  )
  // const questions = (await question.where({
  //   quizzer_id: openid
  // }).get())
  
  return {
    data:questions,
  }
}