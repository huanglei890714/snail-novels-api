const _ = require('lodash')
const { Controller } = require('egg')
const club = require('./../../club/club.novel')

class NovelInfoController extends Controller {
    async bookInfo () {
        const id = _.toInteger(this.ctx.query.id)
        if (id && id > 0) {
            const res = await this.service.novels.findById(id)
            if (Object.keys(res).length > 0) {
                if (!res.sections || res.sections.length === 0) {
                    res.sections = await club.getBookCatelogs({
                        name: res.name,
                        url: res.source_url
                    })
                    this.service.novels.update(id, {
                        sections: res.sections
                    })
                }
                const obj = {
                    id: res.id,
                    name: res.name,
                    author: res.author,
                    source_url: res.source_url,
                    dec: res.dec,
                    cover: res.cover,
                    status: res.status,
                    catelogs: res.sections,
                    last_update_at: res.last_update_at
                }
                this.ctx.body = obj
            }
        } else {
            this.ctx.throw(404, 'NOT FOUND!')
        }
    }

    async tocInfo () {
        const id = _.toInteger(this.ctx.query.id)
        const index = _.toInteger(this.ctx.query.index)
        if (id && id > 0) {
            const res = await this.service.novels.findById(id)
            if (Object.keys(res).length > 0) {
                const sections = res.sections
                const start = sections[0].index
                const curToc = sections[index - start]
                if (sections && curToc) {
                    // console.log('@sections[index].url', sections[index].url)
                    const contnet = await club.getBookToc({
                        url: curToc.url
                    })
                    const obj = {
                        id: res.id,
                        name: res.name,
                        author: res.author,
                        source_url: res.source_url,
                        dec: res.dec,
                        cover: res.cover,
                        status: res.status,
                        tocName: curToc.name,
                        catelogs: res.sections,
                        contnet,
                        last_update_at: res.last_update_at
                    }
                    this.ctx.body = obj
                    return
                } else {

                }
            }
        }
        this.ctx.body = 'NOT FOUND!'
    }
}

module.exports = NovelInfoController
