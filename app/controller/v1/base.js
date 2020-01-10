const _ = require('lodash')
const { Controller } = require('egg')

class BaseController extends Controller {
    get user() {
        return this.ctx.session.user
    }

    success(data, extData = {}) {
        if (data) {
            this.ctx.body = {
                code: 200,
                data: data || extData,
            }
        }
        if (extData && Object.keys(extData).length > 0) {
            this.ctx.body = {
                code: 200,
                ...extData
            }
        }
    }

    notFound(msg) {
        msg = msg || 'not found'
        this.ctx.throw(404, msg)
    }

    async paginate (mod) {
        const res = await this.service[mod].all(this.ctx.query)
        this.success(null, res)
    }

    async add (mod) {
        const data = this.ctx.request.body
        const res = await this.service[mod].create(data)
        this.success(res)
    }

    async findById (mod) {
        const id = _.toInteger(this.ctx.params.id)
        if (id > 0) {
            const res = await this.service[mod].findById(id)
            this.success(res)
        } else {
            this.notFound()
        }
    }

    async editById (mod) {
        const data = this.ctx.request.body
        const id = _.toInteger(this.ctx.params.id)
        if (id > 0 && _.isPlainObject(data)) {
            const res = await this.service[mod].update(data, id)
            this.success(res > 0)
        } else {
            this.notFound()
        }
    }

    async remove (mod) {
        const id = _.toInteger(this.ctx.params.id)
        if (id > 0) {
            const res = await this.service[mod].remove(id)
            this.success(res > 0)
        } else {
            this.notFound()
        }
    }
}

module.exports = BaseController
