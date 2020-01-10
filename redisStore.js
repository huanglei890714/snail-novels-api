module.exports = class Store {
    constructor(app) {
        this.app = app
    }

    async get(key) {
        const res = await this.app.redis.get(key)
        if (!res) return null
        return JSON.parse(res)
    }

    async set(key, value, maxAge) {
        // maxAge not present means session cookies
        // we can't exactly know the maxAge and just set an appropriate value like one day
        if (!maxAge) maxAge = 24 * 60 * 60 * 1000
        value = JSON.stringify(value)
        await this.app.redis.set(key, value, 'PX', maxAge)
    }

    async destroy(key) {
        await app.redis.del(key)
    }
}