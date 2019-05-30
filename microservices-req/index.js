const zmq = require("zeromq");
const filename = process.argv[2];

// TODO: 创建request请求节点
const requester = zmq.socket('req');

/**
 * @description 监听message事件，接收响应消息
 * 节点每次只处理一件事情，暂无并行处理能力
 */
requester.on("message", data => {
    const response = JSON.parse(data);
    console.log('response: ', response);
});

// TODO: 连接TCP服务
requester.connect("tcp://localhost:60401");
// TODO: send发送请求(单次处理信息)
// requester.send(JSON.stringify({path: filename}));

// TODO: 多次处理多个信息
for (let index = 0; index < 5; index++) {
    console.log(`sending request ${index} for ${filename}`);
    requester.send(JSON.stringify({path: filename}));
}