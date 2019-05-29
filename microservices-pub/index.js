const path = require("path");
const fs = require("fs");
const zmq = require("zeromq");
const filename = process.argv[2];

if(!filename){
    throw new Error("a file to watch must be specified!");
}

// TODO: 创建一个消息发布节点
const publisher = zmq.socket('pub');

/**
 * @description watch监听改变，回调使用发布者send
 */
fs.watch(path.resolve(__dirname, filename), () => {
    publisher.send(JSON.stringify({
        type: 'changed',
        file: filename,
        timestamp: Date.now()
    }));
});

// TODO: 启动pub服务，监听60400端口
publisher.bind('tcp://*:60400', err => {
    if(err){
        throw new Error(err);
    }
    console.log('Listening for zmq subsribers...');
});