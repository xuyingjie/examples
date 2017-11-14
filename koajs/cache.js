// 设置返回的报文头部 Cache-Control, Last-Modified, Expires
// 浏览器回车刷新后退行为 http://blog.csdn.net/kane_canpower/article/details/56487591
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching

const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

// logger
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}`)
})

// app.use(async (ctx, next) => {
//   if (ctx.request.fresh) {
//     ctx.status = 304
//     return
//   }
//   await next()
// })

function resolveAfter2Seconds(x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x)
    }, 2000)
  })
}

router.get('/', async (ctx, next) => {
  // ctx.status = 201
  await resolveAfter2Seconds()
  ctx.body = 'hello world'
})

// Cache-Control优先级高于Expires
router.get('/0', ctx => {
  ctx.set('Cache-Control', `max-age=${1000 * 60 * 10}`)
  ctx.body = '200 OK; 已缓存'
})
router.get('/1', ctx => {
  let now = new Date()
  now.setMinutes(now.getMinutes() + 10)
  ctx.set('Expires', now.toUTCString())
  ctx.body = '200 OK; 已缓存'
})

// 如果设置了Last-Modified而没有Cache-Control
// 则Cache-Control的max-age默认值为 (creationTime - lastModifiedValue) * 0.1;
router.get('/2', ctx => {
  let now = new Date()
  now.setMinutes(now.getMinutes() - 10)
  ctx.set('Last-Modified', now.toUTCString())
  ctx.body = '200 OK; 已缓存'
})

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3001)
