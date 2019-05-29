const zmq = require("zeromq");

// TODO: 创建订阅subscriber节点
const subscriber = zmq.socket('sub');

/**
 * @description 接收发布者所有信息
 * 接收特定类型信息，传入一个字符串作为前缀过滤
 */
subscriber.subscribe('');

/**
 * @description 接收发布者publisher信息，触发message事件
 * data类型为buffer
 */
subscriber.on('message', data => {
    const message = JSON.parse(data);
    let { file, timestamp } = message;
    console.log(`File "${file}" changed at ${new Date(timestamp)}`)
});

// TODO: 建立连接
subscriber.connect('tcp://localhost:60400');
