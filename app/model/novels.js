const { Models } = require('../../config/config.schema')

module.exports = (app) => {
    const Novels = Models({
        name: 'Novels',
        schema: {
            name: String,
            cate_id: Number,
            source_url: String,
            down_url: String,
            author: String,
            dec: String,
            cover: String,
            sections: Array,
            last_update_at: Date
        }
    }, app)
    return Novels
}