// 占位图片生成服务

const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
    // console.log(ctx.url);
    // if (ctx.url === '/favicon.ico') return;

    const conf = parsePathname(ctx.url);
    const svg = createSVG(conf);

    // 文件类型
    ctx.type = 'image/svg+xml; charset=utf-8';
    ctx.body = svg;
});

app.listen(3000);
console.log('port: 3000');



// 解析路径参数
function parsePathname(pathname) {
    if (pathname === '/') return; //无参数

    const arr = decodeURI(pathname).slice(1).split('&');
    const size = arr[0].split(/x/);
    const query = arr.slice(1).map(str => str.split(/=/));

    const out = {};
    out.width = size[0];
    out.height = size[1];
    query.forEach(el => {
        out[el[0]] = el[1];
    });
    return out;
}

// SVG
function createSVG({ width = 200, height = 200, text = '' } = {}) {
    const fontSize = scaleFontSize(width, text);

    // XML declaration allowed only at the start of the document
    const svg = `<?xml version="1.0" standalone="no"?>
<svg width="${width}" height="${height}" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="${width}" height="${height}" fill="#ccc" />
    <text x="50%" y="50%" text-anchor="middle" font-size="${fontSize}" fill="#969696">
        ${text}
    </text>
</svg>`;

    // 压缩文本
    return svg.replace(/\n\s*/g, '');
}

// 文字大小适配
function scaleFontSize(width, text) {
    // max= size50 len6; min= size16 len20; on width= 300
    const MIN_FONT_SIZE = 16;
    const MAX_FONT_SIZE = 50;

    const len = text.length;
    let size = 24;
    if (len <= 6) {
        size = MAX_FONT_SIZE;
    } else if (len >= 20) {
        size = MIN_FONT_SIZE;
    } else {
        size = MAX_FONT_SIZE - (MAX_FONT_SIZE - MIN_FONT_SIZE) / (20 - 6) * (len - 6);
    }

    size = size * (width / 300);
    // console.log(size);
    return size;
}
