const fs = require("fs");
const path = require("path");
const { spawn } = require('child_process');
/**
 * @description process.argv[2]
 * 接收使用命令行参数 
 * [2]为命令行下标第二个参数
 */
const filename = process.argv[2];
console.log(filename);

/**
 * @description 必须指定观察文件
 */
if(!filename){
    throw new Error("a file to watch must be specified!");
}

fs.watch(path.resolve(__dirname, filename), () => {
    /**
     * @description spawn
     * ls 运行命令
     * ['-l', '-h', filename] 字符串参数列表
     */
    const ls = spawn('ls', ['-l', '-h', path.resolve(__dirname, filename)]);
    let output = '';

    ls.stdout.on('data', (chunk) => {
        console.log(`stdout: ${chunk}`);
        output += chunk;
    });
    // TODO: 子进程监听退出
    ls.on('close', (code) => {
        console.log(`子进程退出码：${code}`);
        console.log(output);
    });
    // TODO: 子进程监听错误
    ls.on('error', (e) => {
        console.log(e);
    });
});

console.log(`Now watching ${filename} for changes....`);