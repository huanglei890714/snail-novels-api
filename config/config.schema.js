const autoInc = require('mongoose-auto-increment')

const baseFileds = {
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Number,
        default: 0
    }
}

exports.Models = function (options = {}, app) {
    //设置自增
    const mg = app.mongoose
    autoInc.initialize(mg.connection)

    const schema = new mg.Schema(Object.assign(options.schema, baseFileds))

    schema.options.toObject = schema.options.toObject || {}
    schema.options.toObject.hide = '__v'
    schema.options.toObject.transform = (doc, ret, options) => {
       // 在返回结果前剔除字段
       if (options.hide) {
            options.hide.split(' ').forEach((p) => {
                delete ret[p]
            })
        }
        return ret
    }

    const serialNumber = '_nid'
    schema.plugin(autoInc.plugin, {
        model: options.name,
        field: serialNumber,
        startAt: 1
    })

    const _model = mg.model(options.name, schema)
    return _model
}
