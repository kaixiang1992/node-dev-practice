const fs = require("fs");
const path = require("path");
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
    console.log(`File ${filename} changed!`);
});

console.log(`Now watching ${filename} for changes....`);