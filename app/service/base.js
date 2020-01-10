const debug = require('debug')
const _ = require('lodash')
const qs = require('qs')
const { Service } = require('egg')

const info = debug('service:log')

class BaseService extends Service {

    async paginate (serverName, showFileds, options = {}) {
        options = qs.parse(options)
        const { keywords, params } = options
        let { $limit, $skip, $sort } = options
        let $match = { status: 0 }

        if (!_.isEmpty(keywords)) {
            $match.name = {
                $regex: new RegExp(keywords, 'i')
            }
        }
        if (_.isArray(params) && params.length > 0) {
            $match = Object.assign($match, ...params)
        }
        $skip = parseInt($skip || 1)
        $limit = parseInt($limit || 10)
        if (!$sort || _.isEmpty($sort)) {
            $sort = {
                _nid: -1
            }
        } else {
            for (const item of Object.keys($sort)) {
                $sort[item] = parseInt($sort[item])
            }
        }
        const filters = [
            {
                $match
            },
            {
                $sort: {
                    ...$sort
                }
            },
            {
                $skip: ($skip - 1) * $limit
            },
            {
                $limit
            }
        ]
        info(`${ serverName }：分页查询`, JSON.stringify(filters))
        const res = await this.ctx.model[serverName].aggregate(filters)
        const total = await this.ctx.model[serverName].count({
            ...$match
        })
        return {
            data: res,
            total
        }
    }

    async add (serverName, data) {
        let res = []
        if (_.isPlainObject(data) || _.isArray(data)) {
            res = await this.ctx.model[serverName].create(data)
        }
        info(`${ serverName }：批量新增`, res)
        return res
    }

    async find (serverName, options) {
        const { id, showFileds } = options
        const res = await this.ctx.model[serverName].find({
            _nid: id
        }, showFileds)
        return (res && res.length > 0) ? res[0] : {}
    }

    async edit (serverName, options) {
        const { id, data } = options
        const res = await this.ctx.model[serverName].update({
            _nid: id
        }, data)
        info(`${ serverName }：更新`, res, id)
        return res
    }

    async delete (serverName, options) {
        const { id } = options
        const res = await this.ctx.model[serverName].remove({
            _nid: id
        })
        info(`${ serverName }：删除`, res)
        return res
    }
}

module.exports = BaseService