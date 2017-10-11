/**
 * 给html文件里的href和src添加hash
 */

const path = require('path')
const fs = require('fs')
const crypto = require('crypto')

const DIR = 'dist'
let list = [];

// 获取目录下所有html文件
(function getFileList(dir) {
  let files = fs.readdirSync(dir)
  files.forEach(el => {
    let p = path.join(dir, el)
    let stats = fs.statSync(p)
    if (!stats.isDirectory() && p.match(/\.html$/)) {
      list.push(p)
    }
  })
})(DIR)

// 给html文件里的 src 和 href 加 hash
// 用于构建正则的字符串，特殊字符 \\.
let pattern = '(href|src)="(.+?\\.(css|js)).*?"'
let hashCache = {}
list.forEach(p => {
  fs.readFile(p, 'utf8', async (err, content) => {
    if (err) throw err

    // 计算文件中href和src路径文件的hash
    let match = content.match(/href=".+?\.css.*?"|src=".+?\.js.*?"/ig)
    await Promise.all(match.map(async item => {
      let match = item.match(new RegExp(pattern, 'i'))
      let href = match[2]
      if (!hashCache[href]) {
        let hash = await readHash(href)
        hashCache[href] = hash
      }
    }))

    // 替换
    content = content.replace(new RegExp(pattern, 'ig'), (match, $1, $2) => {
      let hash = hashCache[$2]
      let out = `${$1}="${$2}${hash ? '?' + hash : ''}"`
      if (match !== out) console.log(out)
      return out
    })

    fs.writeFile(p, content, 'utf8', (err) => {
      if (err) throw err
    })
  })
})

// 读取文件 md5
function readHash(filename) {
  return new Promise(resolve => {
    const hash = crypto.createHash('md5')
    const p = path.join(__dirname, DIR, filename)

    if (isExists(p)) {
      const input = fs.createReadStream(p)
      input.on('readable', () => {
        const data = input.read()
        if (data)
          hash.update(data)
        else {
          resolve(hash.digest('hex'))
        }
      })
    } else {
      resolve('')
    }
  })
}

// 检测路径是否有效
function isExists(p) {
  try {
    fs.accessSync(p)
    return true
  } catch (e) {
    return false
  }
}