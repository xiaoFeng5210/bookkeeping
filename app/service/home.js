'use strict'
const Service = require('egg').Service;

class HomeService extends Service {
  async user() {
    const QUERY_STR = 'id, name';
    let sql = `select ${QUERY_STR} from users`; // 获取 id 的 sql 语句
    console.log(sql)
    const result = await this.app.mysql.query(sql).catch(err => {
      return null
    })
    return result;
  }

  // 新增
  async addUser(name) {
    const { ctx, app } = this;
    try {
      const result = await app.mysql.insert('list', { name }); // 给 list 表，新增一条数据
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }


  async editUser(id, name) {
    const { ctx, app } = this
    try {
      let result = await app.mysql.update('users', { name }, { where: { id } })
    } catch (error) {
      console.log(error)
      return null
    }
  }

  // 删除
  async deleteUser(id) {
    const { ctx, app } = this;
    try {
      let result = await app.mysql.delete('users', { id });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
module.exports = HomeService;
