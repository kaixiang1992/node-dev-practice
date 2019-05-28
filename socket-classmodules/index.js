const EventEmitter = require("events").EventEmitter;

/**
 * @description  LDJClient继承EventEmitter
 */
class LDJClient extends EventEmitter {
    constructor(stream){
        super();
    }
}

const client = new LDJClient()