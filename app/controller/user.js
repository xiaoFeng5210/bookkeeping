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
  }
}

module.exports = UserController
