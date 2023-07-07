'use strict'

const Controller = require('egg').Controller

class UserController extends Controller {
  async register() {
    const {ctx} = this
    const {username, password} = ctx.request.body

    if (!username || !password) {
      ctx.body = {
        code: 500,
        msg: '用户名或密码不能为空',
        data: null
      }
    }

    const userInfo = await ctx.service.user.getUserByName(username)

    if (userInfo && userInfo.id) {
      ctx.body = {
        code: 500,
        msg: '用户已存在',
        data: null
      }
      return
    }

    const defaultAvatar = 'http://s.yezgea02.com/1615973940679/WeChat77d6d2ac093e247c361f0b8a7aeb6c2a.png'
    const result = await ctx.service.user.register({
      username,
      password,
      signature: '世界和平',
      avatar: defaultAvatar
    })

    if (result) {
      ctx.body = {
        code: 200,
        msg: '注册成功',
        data: null
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '注册失败',
        data: null
      }
    }
  }

  async login() {
    const {ctx, app} = this
    const {username, password} = ctx.request.body
    const userInfo = await ctx.service.user.getUserByName(username)
    if (!userInfo || !userInfo.id) {
      ctx.body = {
        code: 500,
        msg: '用户不存在',
        data: null
      }
      return
    }

    if (userInfo && password !== userInfo.password) {
      ctx.body = {
        code: 500,
        msg: '密码错误',
        data: null
      }
      return
    }

    const token = app.jwt.sign({
      id: userInfo.id,
      username: userInfo.username,
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // token 有效期为 24 小时
      
    }, app.config.jwt.secret)

    ctx.body = {
      code: 200,
      msg: '登录成功',
      data: {token}
    }
  }
}

module.exports = UserController
