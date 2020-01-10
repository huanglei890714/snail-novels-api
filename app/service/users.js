const Service = require('./base')

const showFileds = [
    'id',
    'name',
    'phone',
    'balance',
    'status'
]

const modelName = 'Users'

class UsersService extends Service {
    all (options = {}) {
        console.log('this.ctx.model[modelName]', this.ctx.model[modelName])
        return this.paginate(modelName, showFileds, options)
    }

    create (data) {
        return this.add(modelName, data)
    }

    findById (id) {
        return this.find(modelName, {
            id,
            showFileds
        })
    }

    update (id, data) {
        return this.edit(modelName, {
            id,
            data
        })
    }

    remove (id) {
        return this.delete(modelName, {
            id
        })
    }

    async findByLogin(name, pass) {
        const res = {
            msg: '登录失败, 用户名或者密码错误!',
            code: 201,
            data: {}
        }
        var data = await this.ctx.model[modelName].findByLogin(name, pass)
        if (data) {
            if (data.status >= 0) {
                res.msg = '登录成功'
                res.code = 200
                await this.ctx.model[modelName].logSignin(res.data._nid)
                res.data = data
                return res
            }
            if (data.status === -1) {
                res.msg = '登录失败，用户已被锁定!'
                res.data = {}
            }
        } else {
            res.data = []
        }
        return res
    }
}

module.exports = UsersService
