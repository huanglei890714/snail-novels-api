const debug = require('debug')


module.exports = app => {
    app.sessionStore = require('./redisStore')

    app.once('server', server => {
        // websocket
        debug('booting %o', '蜗牛超市')
    })
    app.on('error', (err, ctx) => {
        // report error
        console.log('程序报错了：'. err)
    })
    app.on('request', ctx => {

    })
    app.on('response', ctx => {
        // ctx.starttime is set by framework
        // log total cost
    })
}