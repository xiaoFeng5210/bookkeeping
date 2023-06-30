'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const {id} = ctx.query;
    ctx.body = {id};
  }
  // 获取用户信息
  async user() {
    const { ctx } = this;
    const { id } = ctx.params; // 通过 params 获取申明参数
    ctx.body = id;
  }

}

module.exports = HomeController;
