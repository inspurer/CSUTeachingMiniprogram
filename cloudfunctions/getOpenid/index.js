// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
//获取用户的openid
exports.main = async (event, context) => {
  return event.userInfo; //返回用户信息
}
