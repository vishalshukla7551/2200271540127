const fs = require('fs');
const path = require('path');

class Logger {
    constructor() {
        this.levels = { error: 0, warn: 1, info: 2, log: 3 };
        this.currentLevel = 'log';
        this.logFilePath = null;
    }

    setLevel(level) {
        if (this.levels[level] !== undefined) {
            this.currentLevel = level;
        }
    }

    setLogFile(filePath) {
        this.logFilePath = path.resolve(filePath);
    }

    _shouldLog(level) {
        return this.levels[level] <= this.levels[this.currentLevel];
    }

    _write(message) {
        if (this.logFilePath) {
            fs.appendFileSync(this.logFilePath, message + '\n');
        }
    }

    log(message) {
        if (this._shouldLog('log')) {
            const msg = `[LOG] [${new Date().toISOString()}] ${message}`;
            console.log(msg);
            this._write(msg);
        }
    }

    info(message) {
        if (this._shouldLog('info')) {
            const msg = `[INFO] [${new Date().toISOString()}] ${message}`;
            console.info(msg);
            this._write(msg);
        }
    }

    warn(message) {
        if (this._shouldLog('warn')) {
            const msg = `[WARN] [${new Date().toISOString()}] ${message}`;
            console.warn(msg);
            this._write(msg);
        }
    }

    error(message) {
        if (this._shouldLog('error')) {
            const msg = `[ERROR] [${new Date().toISOString()}] ${message}`;
            console.error(msg);
            this._write(msg);
        }
    }
}

module.exports = new Logger();