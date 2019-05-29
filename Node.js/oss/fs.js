const fs = require('fs')
const path = require('path')
const md5sum = require('md5')

// 转成 Promise
function gen(fn) {
  return (...args) => {
    return new Promise((resolve, reject) => {
      const cb = (err, data) => {
        if (err) return reject(err)
        resolve(data)
      }
      fn.apply(null, [...args, cb])
    })
  }
}

const readdir = gen(fs.readdir)
const readFile = gen(fs.readFile)
const stat = gen(fs.stat)

// 获取本地目录文件列表
async function listDir(localDir) {
  const list = []
  async function getFileList(dir) {
    const files = await readdir(dir)
    await Promise.all(files.map(async file => {
      const p = path.join(dir, file)
      const s = await stat(p)
      if (s.isDirectory()) {
        await getFileList(p)
      } else {
        list.push(p)
      }
    }))
  }
  await getFileList(localDir)
  return list
}

// 过滤出需要上传的文件
async function filterList(localDir, localList, remoteList) {
  const list = []
  await Promise.all(localList.map(async filepath => {
    const filename = path.relative(localDir, filepath).split(path.sep).join('/')
    const item = remoteList.find(item => item.name === filename)
    if (item) {
      const buf = await readFile(filepath)
      const md5 = md5sum(buf)
      const re = new RegExp(md5, 'i')
      if (item.etag.search(re) === -1) {
        list.push(filename)
      }
    } else {
      list.push(filename)
    }
  }))
  return list
}


module.exports = {
  readdir,
  readFile,
  stat,
  listDir,
  filterList
}
