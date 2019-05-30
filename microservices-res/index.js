const fs = require("fs");
const path = require("path");
const zmq = require("zeromq");

// TODO: 创建一个reponse消息节点
const responder = zmq.socket("rep");

/**
 * @description 监听message事件，异步读取文件，在调用send方法发送数据
 * content 文件内容 Buffer类型 请务必转toString();
 * timestamp 事件戳
 * pid nodejs进程号
 */
responder.on("message", data => {
    const request = JSON.parse(data);
    fs.readFile(path.resolve(__dirname, request.path), (err, content) => {
        if(err){
            throw err;
        }
        responder.send(JSON.stringify({
            content: content.toString(),
            timestamp: Date.now(),
            pid: process.pid
        }));
    });
});

// TODO: 启动tcp服务，监听60401端口
responder.bind('tcp://*:60401', err => {
    if(err){
        throw err;
    }
    console.log('listening for zmq requesters....');
});

// TODO: 监听进程SIGINT事件，即命令行按下Ctrl+C，关闭所有连接到响应器的连接
process.on('SIGINT', () => {
    console.log('Shutting down....');
    responder.close();
});