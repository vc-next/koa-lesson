import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
// import body from 'koa-better-body'
const app = new Koa()
const router = new Router()
app.use(bodyParser())
// app.use(body())
// router.get('/form', async ctx => {
//   ctx.body = ctx.query
// })
//
// router.post('/form', async ctx => {
//   ctx.body = ctx.request.body
// })
router.post('/form', async ctx => {
  ctx.body = ctx.req
})
router.get('/form', async ctx => {
  ctx.body = ctx.query
})
app.use(router.routes()).use(router.allowedMethods())
app.listen(3000)
