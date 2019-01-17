export default class Messenger {
    port: number

    constructor(_port) {
        this.port = _port        
    }

    messagePrint() {
        return `Node and express server is running on port ${this.port}`
    }
}