/**
 * koa + mysql
 * 
 * https://github.com/alexmingoia/koa-router/tree/master/
 * https://github.com/koajs/session
 * https://github.com/sidorares/node-mysql2
 */


const Koa = require('koa')
const Router = require('koa-router')
const session = require('koa-session')
const mysql = require('mysql2/promise')

const app = new Koa()
const router = new Router()

app.keys = ['hj387klc87298UPI8UH8$-PI']

// const CONFIG = {
//   key: 'koa:sess',
//   maxAge: 86400000,
//   overwrite: true,
//   httpOnly: true,
//   signed: true,
// }
// app.use(session(CONFIG, app))
app.use(session(app))

router.get('/', (ctx, next) => {
  let n = ctx.session.views || 0
  ctx.session.views = ++n
  ctx.body = n + ' views'
})

router.get('/item/:id', (ctx, next) => {
  ctx.body = ctx.params.id
})

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3001)
