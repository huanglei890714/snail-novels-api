const path = require('path')
const sendToWormhole = require('stream-wormhole')
const { Controller } = require('egg')

{/* <form method="POST" action="/upload?_csrf={{ ctx.csrf | safe }}" enctype="multipart/form-data">
    <p>文件名称：<input name="title"/></p>
    <p>文件：<input name="file" type="file" /></p>
    <button type="submit">上传</button>
</form> */}

class UploaderController extends Controller {
    async upload () {
        const { ctx } = this
        const stream = await ctx.getFileStream()
        const name = 'egg-multipart-test/' + path.basename(stream.filename)
        // 文件处理、传到云存储等
        let result
        try {
            result = await ctx.oss.put(name, stream)
        } catch(err) {
            // 将上传的文件流消费掉，避免浏览器卡死
            await sendToWormhole(stream)
            throw err
        }
        // 获取表单字段，则可通过`stream.fields`对象
    }

    async uploadMultiple () {
        const { ctx } = this
        const parts = ctx.multipart() // 返回的是Promise
        let part
        while ((part = await parts()) !== null) {
            // 如果是数组，是filed
            if (part.length) {
                console.log(`field: ${part[0]}`)
                console.log(`value: ${part[1]}`)
                console.log(`valueTruncated: ${part[2]}`)
                console.log(`filedNameTruncated: ${part[3]}`)
            } else {
                // 若用户不选择文件就上传，那么part是file stream，但part.filename为空
                if (!part.filename) return
                // 获取信息
                console.log(`field: ${part.fieldname}`)
                console.log(`filename: ${part.filename}`)
                console.log(`encoding: ${part.encoding}`)
                console.log(`mime: ${part.mime}`)
                // 文件处理、传到云存储等
                let result
                try {
                    result = await ctx.oss.put(name, stream)
                } catch(err) {
                    // 将上传的文件流消费掉，避免浏览器卡死
                    await sendToWormhole(stream)
                    throw err
                }
            }
        }
    }
}

module.exports = UploaderController