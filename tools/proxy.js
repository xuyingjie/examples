/**
 * 本地代理，用于测试跨域接口
 */

// const path = require('path')
const express = require('express')
const proxy = require('http-proxy-middleware')

const app = express()

app.use(express.static(__dirname))

app.use('/api', function (req, res, next) {
  console.log(req.url)
  next()
})

app.use('/api', proxy({ target: 'https://eqldwf.cn', changeOrigin: true }))

app.listen(3000)

console.log('Listening on 3000...')
