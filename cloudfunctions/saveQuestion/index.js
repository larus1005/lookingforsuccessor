// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const  wxContext = cloud.getWXContext()
  const db = cloud.database()
  const date = db.serverDate()
  const pid = event.pid
  const question_no = event.question_no
  const question = event.question
  const openid = wxContext.OPENID
  const userid = event.userid

  const templateId = 'ZCRFIawEZH7f5M5uHVveBlhufhbl1_jdxNt3bF0SxOc'

  const push_msg = (user_id) => {
    db.collection('t_message')
      .add({
        data: {
          touser: user_id,
          data: {
            date2: {
              value: (() => {
                let timezone = 8
                let date = new Date()
                let curtime = date.getTime()
                let offset = date.getTimezoneOffset() * 60 * 1000
                return (new Date(curtime + offset + timezone * 60 * 60 * 1000)).format('yyyy-MM-dd hh:mm:ss')
              })()
            },
            thing3: {
              value: (() => {
                let text = '你收到了一个提问'
                if (question.length) {
                  text = question.length > 15 ? question.slice(0, 12) + '...' : question
                }
                return text
              })()
            }
          },
          page: 'myAnswer',
          templateId,
          done: false,
        },
      })
    }

  db.collection('t_position')
    .doc(pid)
    .get()
    .then(res => {
      if (res.data) {
        let {
          user_id,
          subscribe
        } = res.data
        if (subscribe) {
          push_msg(user_id)
        }
      }
    })
    .catch(res => {

    })
    
  const questionid = await db.collection('t_question')
    .add({
      data: {
        pid,
        question,
        question_no,
        subscribe: event.subscribe,
        quizzer_id: openid,
        replier_id: userid,
        create_time: date,
        status: 0
      },
    })
    
  return {
    data: questionid
  }
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