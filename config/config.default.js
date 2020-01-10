const OSS = require('ali-oss')
const env = require('./../.env')

module.exports = (appInfo) => {
    exports = {}
    const config = exports

    // use for cookie sign key, should change to your own and keep security
    config.keys = `${ appInfo.name }_1539144310785_9644`

    // add your config here
    config.middleware = []

    // use for sequelize config to db
    exports.mongoose = {
        url: 'mongodb://127.0.0.1/snail-novel',
        options: {},
    }

    exports.aliClient = new OSS({
        accessKeyId: env.aliApp.AccessKeyID,
        accessKeySecret: env.aliApp.AccessKeySecret,
        bucket: env.aliApp.bucket
    })

    exports.redis = {
        client: {
            port: 6379,          // Redis port
            host: '127.0.0.1',   // Redis host
            password: '',
            db: 0,
        }
    }

    exports.bodyParser = {
        jsonLimit: '1mb',
        formLimit: '1mb'
    }

    exports.multipart = {
        whitelist: ['.png'] // 只支持`.png`文件上传
    }

    config.security = {
        domainWhiteList: ['http://localhost:8080'],
        methodnoallow: {
          enable: false,
        },
        csrf: {
            enable: false
        }
    }

    config.cors = {
        origin:'*',
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
    }

    return config
}
