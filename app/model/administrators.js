const { Models } = require('./../../config/config.schema')

module.exports = (app) => {
    const Administrators = Models({
        name: 'Administrators',
        schema: {
            role_id: Number,
            username: String,
            name: String,
            pass: String,
            visited_at: Date
        }
    }, app)
    return Administrators
}