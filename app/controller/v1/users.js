const Controller = require('./base')

const m = 'users'

class UsersController extends Controller {
    //get 获取分页数据
    async index () {
        await this.paginate(m)
    }
    //post
    async create () {
        await this.add(m)
    }
    //get
    async show () {
        await this.findById(m)
    }
    //put
    async update () {
        await this.editById(m)
    }
    //delete
    async destroy () {
        await this.remove(m)
    }

    async login () {
        const { name, pass } = this.ctx.request.body
        const user = await this.app.redis.get('user')
        let res = { code: 200, msg: '登录成功!', data: [] }
        if (!user) {
            res = await this.service[m].findByLogin(name, pass)
            if (res.data && res.data._nid) {
                await this.app.redis.set('user', res.data)
            }
        }
        this.ctx.body = res
    }
}

module.exports = UsersController
