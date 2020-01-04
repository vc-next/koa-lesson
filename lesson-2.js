import Koa from 'koa'
import Router from 'koa-router'

const app = new Koa()
const router = new Router()

router.get('/', async ctx => {
  ctx.body = 'hello world!'
})

router.get('/list', async ctx => {
  ctx.body = [1, 2, 30]
})

router.get('/list/:name', async ctx => {
  ctx.body = {
    name: ctx.params.name,
    time: Date.now()
  }
})

router.post('/list', async ctx => {
  ctx.body = {
    code: 0,
    list: [1, 3, 5]
  }
})
// postman
//
const group = new Router({
  prefix: '/group'
})

group.get('/', async ctx => {
  ctx.body = 'group'
})

group.get('/list', async ctx => {
  ctx.body = [3, 7, 8]
})
group.get('/address', async ctx => {
  ctx.body = [6, 7, 8]
})

const sub = new Router({
  prefix: '/sub'
})

sub.get('/forms/:uid', async ctx => {
  ctx.body = {
    code: 0,
    uid: ctx.params.uid,
    time: Date.now()
  }
})
sub.get('/froms', async ctx => {
  ctx.body = {
    code: 0,
    forms: true
  }
})

const nest = new Router()
nest.use('/nest', sub.routes())

const db = new Router()
db.get('/db/:id', async (ctx, next) => {
  // mongoose
  ctx.user = 'test'
  next()
}, async (ctx, next) => {
  // log
  ctx.time = Date.now()
  next()
}, async ctx => {
  ctx.body = {
    user: ctx.user,
    time: ctx.time
  }
})

const proxy = new Router()

proxy.get('/find', async ctx => {
  ctx.redirect('/list')
})

app.use(router.routes()).use(router.allowedMethods())
app.use(group.routes()).use(group.allowedMethods())
app.use(nest.routes()).use(nest.allowedMethods())
app.use(db.routes()).use(db.allowedMethods())
app.use(proxy.routes()).use(proxy.allowedMethods())
app.listen(3000)
