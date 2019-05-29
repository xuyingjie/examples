// 把 DIR 里的内容上传到 cos:\\${dir}

const DIR = 'D:\\_site'

const path = require('path')
const COS = require('cos-nodejs-sdk-v5')

const { listDir, readFile, filterList } = require('./fs')

const params = {
  AppId: '',
  SecretId: '',
  SecretKey: '',
}

const cos = new COS(params)

const config = {
  Bucket: '',
  Region: 'ap-beijing'
}


// 比较上传
const main = async () => {
  const [localList, remoteList] = await Promise.all([listDir(DIR), listBucket()])
  const syncList = await filterList(DIR, localList, remoteList)
  await Promise.all(syncList.map(putObject))
  console.log('----------- done ------------')
}
main()


// 上传
// https://cloud.tencent.com/document/product/436/6474
function putObject(filename) {
  return new Promise(async (resolve, reject) => {
    const body = await readFile(path.join(DIR, filename))
    cos.putObject({
      Bucket: config.Bucket, /* 必须 */
      Region: config.Region,
      Key: filename, /* 必须 */
      Body: body,
    }, function (err) {
      if (err) return reject(err)
      console.log(filename)
      resolve()
    })
  })
}

// 获取 Object 列表
function listBucket() {
  return new Promise((resolve, reject) => {
    cos.getBucket(config, function (err, data) {
      if (err) {
        reject(err)
      } else {
        if (!data.Contents) data.Contents = []
        const out = data.Contents.map(item => ({ name: item.Key, etag: item.ETag }))
        resolve(out)
      }
    })
  })
}

// 清空 Bucket
// function clearBucket() {
//   cos.getBucket(config, function (err, data) {
//     if (err) {
//       console.log(err)
//     } else {
//       const keys = data.Contents.map(item => item.Key)
//       keys.forEach(key => {
//         cos.deleteObject(Object.assign({ Key: key }, config))
//       })
//     }
//   })
// }
// clearBucket()

