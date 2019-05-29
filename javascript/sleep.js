function sleep(second) {
    return new Promise(resolve => setTimeout(resolve, second * 1000));
}

function People(name) {
    let list = [];
    list.push(() => console.log(`Hi! This is ${name}!`));

    setTimeout(async () => {
        console.log(list);
        for (let i = 0; i < list.length; i++) {
            await list[i]();
        }
    }, 0);

    this.eat = (food) => {
        list.push(() => console.log(`Eat ${food}~`));
        return this;
    };

    this.sleep = (second) => {
        const fn = async () => await sleep(second);
        list.push(fn);
        return this;
    };

    this.sleepFirst = (second) => {
        const fn = async () => {
            await sleep(second);
            console.log(`Wake up after ${second}`);
        };
        list = [fn, ...list];
        return this;
    };
}

function Person(name) {
    return new People(name);
}

// sleep(5).then(console.log)
Person('xiaojia').sleepFirst(5).eat('bread').sleep(5).eat('fish');



// const parseData = (data) => {
//     const metaName = data.metaData.map(item => item.name);
//     return data.rows.map(item => {
//         let obj = {}
//         metaName.forEach((name, index) => {
//             obj[name] = item[index]
//         })
//         return obj
//     })
// }

function chunk(arr, num) {
    let result = []
    arr.forEach((item, index) => {
        let i = Math.floor(index / num)
        if (!result[i]) {
            result[i] = []
        }
        result[i].push(item)
    })
    return result;
}



function chunkReduce(arr, num) {
    return arr.reduce((out, v) => {
        let last = out[out.length - 1]
        if (!last || last.length === num) {
            out.push([v]);
        } else {
            last.push(v);
        }
        return out;
    }, [])
}
