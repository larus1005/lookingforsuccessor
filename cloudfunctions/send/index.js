// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()  
  const db = cloud.database();

  try {
    // 从云开发数据库中查询等待发送的消息列表
    const messages = await db
      .collection('t_message')
      // 查询条件这里做了简化，只查找了状态为未发送的消息
      // 在真正的生产环境，可以根据开课日期等条件筛选应该发送哪些消息
      .where({
        done: false,
      })
      .get();

    // 循环消息列表
    const sendPromises = messages.data.map(async message => {
      try {
        // 发送订阅消息
        await cloud.openapi.subscribeMessage.send({
          touser: message.touser,
          page: message.page,
          data: message.data,
          templateId: message.templateId,
        });
        // 发送成功后将消息的状态改为已发送
        return db
          .collection('t_message')
          .doc(message._id)
          .update({
            data: {
              done: true,
            },
          });
      } catch (e) {
        console.log(e)
        return e;
      }
    });

    returnPromise.all(sendPromises);
  } catch (err) {
    // console.log(err);
    return err;
  }
}