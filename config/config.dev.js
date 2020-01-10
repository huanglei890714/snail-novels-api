const schemas = require('./config.schemas.js')

module.exports = (appInfo) => {
    exports = {}
    const config = exports

    // use for cookie sign key, should change to your own and keep security
    config.keys = `${ appInfo.name }_1539144310785_9644`

    // add your config here
    config.middleware = []

    // use for sequelize config to db
    exports.mongoose = {
        url: 'mongodb://127.0.0.1/snail-market',
        options: {},
    }

    config.schmeas = schemas

    config.security = {
        csrf: {
            enable: false
        },
        xframe: {
            enable: false,
        }
    }

    return config
}
