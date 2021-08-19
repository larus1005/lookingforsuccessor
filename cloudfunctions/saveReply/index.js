// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  const date = db.serverDate()
  const qid = event.qid
  const reply = event.reply

  const templateId = 'HXYk-G1i2wENsdt0I_mJyD9xhvp-9erSq5aI7R5MEB0'
  const push_msg = (user_id) => {
    db.collection('t_message')
      .add({
        data: {
          touser: user_id,
          data: {
            time6: {
              value: (() => {
                let timezone = 8
                let date = new Date()
                let curtime = date.getTime()
                let offset = date.getTimezoneOffset() * 60 * 1000
                return (new Date(curtime + offset + timezone * 60 * 60 * 1000)).format('yyyy-MM-dd hh:mm:ss')
              })()
            },
            thing5: {
              value: (() => {
                let text = '你收到了一个回答'
                if (reply.length) {
                  text = reply.length > 15 ? reply.slice(0, 12) + '...' : reply
                }
                return text
              })()
            }
          },
          page: 'myQuestion',
          templateId,
          done: false,
        },
      })
    }

  db.collection('t_question')
    .doc(qid)
    .get()
    .then(res => {
      if (res.data) {
        let {
          quizzer_id,
          subscribe
        } = res.data
        if (subscribe) {
          push_msg(quizzer_id)
        }
      }
    })
    .catch(res => {

    })

  db.collection('t_question').doc(qid)
    .update({
    data: {
      reply,
      reply_time: date,
      status: 1
    }
  })

}

Date.prototype.format = function(fmt) {
  let o = {
      "M+": this.getMonth() + 1,
      "d+": this.getDate(),
      "h+": this.getHours(),
      "m+": this.getMinutes(),
      "s+": this.getSeconds(),
      "q+": Math.floor((this.getMonth() + 3) / 3),
      "S": this.getMilliseconds()
  };
  
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (let k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  }
  return fmt;
};