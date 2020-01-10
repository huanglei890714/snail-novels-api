const Controller = require('./base')

const m = 'administrators'

class AdministratorsController extends Controller {
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
}

module.exports = AdministratorsController
