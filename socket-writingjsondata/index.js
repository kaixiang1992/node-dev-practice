const fs = require("fs");
const path = require("path");
const net = require("net");
const filename = process.argv[2];

if(!filename){
    throw new Error(`Error: No filename specified.`);
}

net.createServer((c) => {
    // 'connection' 监听器。
    console.log('客户端已连接');
    c.write(JSON.stringify({type: 'watching', file: filename}) + '\n');
    const watcher = fs.watch(path.resolve(__dirname, filename), () => {
        c.write(JSON.stringify({type: 'changed', timestamp: Date.now()}) + '\n');
    });
    c.on('end', () => {
        console.log('客户端已断开连接');
        watcher.close();
    });
}).listen(8124, () => {
    console.log('服务器已启动');
});