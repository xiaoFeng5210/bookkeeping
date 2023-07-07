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
  }
}

module.exports = UserController
