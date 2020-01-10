
module.exports = {
    schedule: {
        cron: '10/* 0 0 * * *', //秒 分 时 天 月 周, */ 代表 每多少执行一次, 每天凌晨三点执行
        type: 'all' // 指定所有的 worker 都需要执行
    },
    async task (ctx) {
        try {
            await ctx.service.users.create({
                name: 'hsl',
                pass: '12345SSDFGHHJJJ'
            })
            console.log('@正在采集书的信息...')

        } catch (err) {
            console.error(err)
        }
    }
}
