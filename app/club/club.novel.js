const axios = require('axios')
const cheerio = require('cheerio')

const domain = 'https://www.jx.la'
const startPage = 'https://www.jx.la/wanbenxiaoshuo/'

/**
 * 采集网页
 * @param {*} url
 */
const ajaxAxios = function (url) {
    const instance = axios.create({
        baseURL: url,
        timeout: 20000,
        headers: {
            //'User-Agent': setAgent(),
            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
            'Cache-Control': 'max-age=0',
            'pgrade-Insecure-Requests': 1,
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36',
            Cookie: '__cfduid=d91d66f4ff3103f88394c7ab3520fae401577952779; UM_distinctid=16f6550e92d225-037e25bb2e4b69-1d376b5c-1fa400-16f6550e92e5d8; CNZZDATA1261736110=546197572-1577950080-%7C1577950080; Hm_lvt_5ee23c2731c7127c7ad800272fdd85ba=1577952800; Hm_lpvt_5ee23c2731c7127c7ad800272fdd85ba=1577954720; cscpvrich7919_fidx=1'
        }
    })
    return instance.get().then((res) => {
        if (res.status === 200) {
            return res.data
        }
        return ''
    })
}

const getBookToc = async function (options = {}) {
    const { url } = options
    const content = await ajaxAxios(domain + url)
    const $ = cheerio.load(content, {
        decodeEntities: false
    })
    const tocContent = $('#content').html()
    const s = tocContent.indexOf('<script>')
    if (s > 0) {
        return tocContent.substr(0, s)
    }
    return ''
}

const titleWords = ['第1章 ', '第一章 ', '0001章 ']

const getBookCatelogs = async function (options = {}) {
    const { url } = options
    const content = await ajaxAxios(url)
    const $ = cheerio.load(content, {
        decodeEntities: false
    })
    const catelogs = $('#list dl a')
    const arr = []
    let start = false
    catelogs.each((index, ele) => {
        const title = $(ele).html()
        if (title.indexOf('第一章 ') > -1 || title.indexOf('0001章 ') > -1 || title.indexOf('第1章 ') > -1) {
            start = true
        }
        if (start) {
            arr.push({
                index,
                name: $(ele).html(),
                url: $(ele).attr('href')
            })
        }
    })
    return arr
}

const pushBookLists = async function (books) {
    if (books.length > 0) {
        const novels = []
        for (const url of books) {
            console.log('@正在采集...', url)
            const content = await ajaxAxios(url)
            const novel = {}
            const $ = cheerio.load(content, {
                decodeEntities: false
            })
            const info = $('#info p')
            info.each((i, ele) => {
                if (i === 0) {
                    novel.author = $(ele).html().replace(/作.*者：/,'')
                }
            })
            novel.name = $('#info h1').text().trim()
            novel.source_url = url
            novel.dec = $('#intro').html()
            novel.down_url = url.replace('/book', '/txt')
            novel.cover = domain + $('#fmimg img').attr('src')
            novel.last_update_at = new Date()
            novel.status = false
            novels.push(novel)
        }
        return novels
    }
    return []
}

const getBookLists = async function (callback) {
    const content = await ajaxAxios(startPage)
    // console.log('@content', content)
    const $ = cheerio.load(content, {
        decodeEntities: false
    })
    const attrA = $('#main li a').toArray()
    const arr = []
    for (const a of attrA) {
        arr.push(domain + $(a).attr('href'))
    }
    return await callback(arr)
}

module.exports = {
    getBookToc,
    getBookCatelogs,
    getBookLists,
    pushBookLists
}
