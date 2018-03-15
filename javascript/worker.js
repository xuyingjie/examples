// var myWorker = new Worker("worker.js");

// myWorker.postMessage([3, 4]); // Sending message as an array to the worker

// myWorker.onmessage = function (e) {
//     console.log(e.data);
//     console.log('Message received from worker');
// };

// 把一个函数放到worker里运行
// https://github.com/pshihn/workly

const NUM = 42;

function add(n) {
    return n < 2 ? 1 : (add(n - 1) + add(n - 2));
};

function createWorker(fn) {
    // 初始化worker
    function initWorker(fn) {
        onmessage = function (e) {
            console.log(e.data);
            const result = fn.apply(null, e.data);
            postMessage(result);
        }
    }

    // 生成url
    function createObjectURL(fn) {
        const toString = f => Function.prototype.toString.call(f);
        return URL.createObjectURL(new Blob([`(${toString(initWorker)})(${toString(fn)})`]));
    }

    const url = createObjectURL(fn);
    const myWorker = new Worker(url);

    return (...args) => new Promise((resolve, reject) => {
        myWorker.postMessage(args);
        myWorker.onmessage = e => resolve(e.data);
    });
}


const a = performance.now();
const _out = add(NUM);
console.log(performance.now() - a);
console.log(_out);

const b = performance.now();
const worker = createWorker(add);
(async () => {
    const out = await worker(NUM);
    console.log(performance.now() - b);
    console.log(out);
})();


// 成本：URL生成和消息传递
// 耗时的，会阻塞主进程的
