const { Controller } = require('egg')
const clubData = require('./../club/club.novel')

class HomeController extends Controller {
    async index () {
        this.ctx.body = 'hi, egg'

    }
}

module.exports = HomeController
