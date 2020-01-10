const { Models } = require('./../../config/config.schema')

module.exports = (app) => {
    const Users = Models({
        name: 'Users',
        schema: {
            name: String,
            pass: String,
            email: String,
            mobile: String,
            balance: Number,
            visited_at: Date
        }
    }, app)

    Users.findByLogin = async (name, pass) => {
        const data = await Users.findOne({
            name,
            pass
        }, {
            _nid: 1,
            name: 1,
            status: 1
        })
        return data
    }

    Users.logSignin = async (id) => {
        const data = await Users.update({ _nid: id }, { last_sign_in_at: new Date() })
        return data
    }

    return Users
}
