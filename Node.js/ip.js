const os = require('os');

function getIP() {
    const networkInterfaces = os.networkInterfaces();

    let ip;
    for (var devName in networkInterfaces) {
        var iface = networkInterfaces[devName];
        iface.forEach(alias => {
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                // console.log(alias.address);
                return ip = alias.address;
            }
        })
    }
    return ip;
}

console.log(getIP());