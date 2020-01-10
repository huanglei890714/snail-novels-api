
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
    const { router, controller } = app

    router.get('/', controller.home.index)

    const routers = [
        'administrators',
        'novels',
        'users'
    ]

    const extRouters = [
        {
            user: {
                post: ['login']
            },
            novelInfo: {
                get: ['getBookInfo']
            }
        }
    ]

    //部署crud路由
    for (const item of routers) {
        router.resources(item, `/apis/v1/${ item }`, controller.v1[item])
    }
    //部署扩展路由
    router.post('/apis/v1/user/login', controller.v1.users.login)
    router.get('/apis/v1/novelInfo/bookInfo', controller.v1.novelInfo.bookInfo)
    router.get('/apis/v1/novelInfo/tocInfo', controller.v1.novelInfo.tocInfo)
}
