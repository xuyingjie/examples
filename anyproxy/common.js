/* eslint-disable require-yield */
// 定制query
// Object.entries()


const { URL } = require('url')

let mapCache = []
let timestamp = 0

function readMapFile(filepath) {
    const now = Date.now()
    if (timestamp === 0 || now - timestamp > 3000) {
        timestamp = now

        //清除require的缓存
        timestamp && delete require.cache[require.resolve(filepath)]
        mapCache = require(filepath)
    }
    return mapCache
}

function proxy(filepath) {
    return {
        // 发送请求前拦截处理
        *beforeSendRequest(requestDetail) {
            const list = readMapFile(filepath)

            let out
            for (let item of list) {
                const from = item[0]

                //判断是完整url还是部分的api路径
                const isURL = from.indexOf('http') === 0
                if (isURL) {
                    //是否有通用匹配*
                    const isPatternPath = from.lastIndexOf('*') !== -1
                    if (!isPatternPath) {
                        out = fullURL(requestDetail, item)
                        if (out) return out
                    } else {
                        out = patternURL(requestDetail, item)
                        if (out) return out
                    }
                } else {
                    out = api(requestDetail, item)
                    if (out) return out
                }
            }
        },
        *beforeDealHttpsRequest(requestDetail) {
            return true
        }
    }
}

function fullURL(requestDetail, item) {
    const from = item[0]
    if (requestDetail.url.indexOf(from) === 0) {
        const to = item[1]
        const url = new URL(to)
        requestDetail.protocol = url.protocol.slice(0, -1)
        requestDetail.requestOptions.hostname = url.hostname
        requestDetail.requestOptions.headers.Host = url.hostname
        requestDetail.requestOptions.port = url.port
        requestDetail.requestOptions.path = url.pathname
        return requestDetail
    }
}

function patternURL(requestDetail, item) {
    const from = item[0].slice(0, -1)
    if (requestDetail.url.indexOf(from) === 0) {
        const to = item[1]
        const url = new URL(to)
        requestDetail.protocol = url.protocol.slice(0, -1)
        requestDetail.requestOptions.hostname = url.hostname
        requestDetail.requestOptions.headers.Host = url.hostname
        requestDetail.requestOptions.port = url.port

        const target = requestDetail.url.replace(from, '')
        requestDetail.requestOptions.path = url.pathname + target
        return requestDetail
    }
}

// mock 数据
function api(requestDetail, item) {
    const from = item[0]
    if (requestDetail.url.match(from)) {
        const to = item[1]
        const localResponse = {
            statusCode: 200,
            header: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Cache-Control': 'no-cache'
            },
            body: JSON.stringify(to)
        }
        return {
            response: localResponse
        }
    }
}


module.exports = proxy