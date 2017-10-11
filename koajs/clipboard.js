const fs = require('fs')
const path = require('path')

const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
// const static = require('koa-static')

const app = new Koa()
const router = new Router()
app.use(bodyParser()) // ctx.request.body
// app.use(static('./static'))

const MSG_FILE_PATH = path.join(__dirname, 'msg.log')
const TOKEN = 'hello'

router.get('/', (ctx) => {
  ctx.body = tmpl()
})

router.post('/', (ctx) => {
  const { msg, token } = ctx.request.body
  if (token === TOKEN) {
    fs.writeFileSync(MSG_FILE_PATH, msg)
    ctx.redirect('/')
  } else {
    ctx.body = 'token error'
  }
})

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3001)


function tmpl() {
  let msg = ''
  try {
    msg = fs.readFileSync(MSG_FILE_PATH, 'utf8')
  } catch (e) { }

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Clipboard</title>
</head>
<body>
    ${msg}
    <form action="/" method="POST">
        <textarea name="msg" cols="100" rows="30"></textarea>
        <input name="token" type="password" placeholder="token">
    </form>
</body>
</html>
    `
}
