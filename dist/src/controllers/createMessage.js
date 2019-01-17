"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Messenger {
    constructor(_port) {
        this.port = _port;
    }
    messagePrint() {
        return `Node and express server is running on port ${this.port}. http://localhost:${this.port}`;
    }
}
exports.default = Messenger;
