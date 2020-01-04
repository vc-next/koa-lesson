import Koa from 'koa'
import Router from 'koa-router'

import mid1 from './middleware/mid1'
import mid2 from './middleware/mid2'
import mid3 from './middleware/mid3'

const app = new Koa()
const router = new Router()

app.use(mid1())
app.use(mid2())
app.use(mid3())

router.get('/', async ctx => {
  ctx.body = 'hello world'
})

router.get('/list', mid1(), async ctx => {
  ctx.body = [1, 2, 3]
})

app.use(router.routes()).use(router.allowedMethods())
app.listen(3000)
