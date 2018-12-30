class ConsoleLogger {
    constructor(id) {
        this.id = (typeof id === 'string') ? id : '';
    }

    info(msg) {
        const strTime = this.getTime();
        console.log(`${strTime} \x1b[32m[INFO]\x1b[39m ${this.id} ${msg}`);
    }

    debug(msg) {
        const strTime = this.getTime();
        console.log(`${strTime} \x1b[34m[DEBUG]\x1b[39m ${this.id} ${msg}`);
    }

    error(msg) {
        const strTime = this.getTime();
        console.log(`${strTime} \x1b[31m[ERROR]\x1b[39m ${this.id} ${msg}`);
    }

    getTime() {
        const now = new Date();
        const result =
            (now.getHours() < 10 ? '0' + now.getHours() : now.getHours()) + ':' 
            + (now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()) + ':'
            + (now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds());
        return result;
    }
}

module.exports = (id) => { return new ConsoleLogger(id); }
