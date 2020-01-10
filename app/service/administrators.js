const Service = require('./base')

const showFileds = [
    'id',
    'name',
    'status'
]

const modelName = 'Administrators'

class AdministratorsService extends Service {
    all (options = {}) {
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
}

module.exports = AdministratorsService
