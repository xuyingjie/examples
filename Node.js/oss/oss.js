const path = require('path')
const co = require('co')
const OSS = require('ali-oss')

const { listDir, filterList } = require('./fs')

// 把 DIR 里的内容上传到 oss:\\${dir}
const DIR = process.argv[2] || ''
const bucket = process.argv[3] || ''

const store = new OSS({
  accessKeyId: '',
  accessKeySecret: '',
  bucket,
  region: 'oss-cn-beijing'
})


// 比较上传
const main = async () => {
  const [localList, remoteList] = await Promise.all([listDir(DIR), listBucket()])
  const syncList = await filterList(DIR, localList, remoteList)
  await Promise.all(syncList.map(putObject))
  console.log('----------- done ------------')
}
main()


// 上传
// https://help.aliyun.com/document_detail/32072.html
function putObject(filename) {
  return new Promise((resolve, reject) => {
    co(function* () {
      const result = yield store.put(filename, path.join(DIR, filename))
      console.log(result.name)
      resolve()
    }).catch(reject)
  })
}

// 获取 Object 列表
function listBucket() {
  return new Promise((resolve, reject) => {
    co(function* () {
      const result = yield store.list({ 'max-keys': 1000 })
      if (!result.objects) result.objects = []
      const out = result.objects.map(item => ({ name: item.name, etag: item.etag }))
      resolve(out)
    }).catch(reject)
  })
}