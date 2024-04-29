import fs from 'fs';
import path from 'path';
import { format } from 'date-fns/format'
import { v4 as uuid } from 'uuid';

enum LogType { INFO, WARN, ERROR }

const logDirectory = path.join(__dirname, '..', '..', 'logs');

const log = async (message: string, type: LogType, filename?: string) => {
    // encode the message with the current date and time
    const logMessage = `${format(new Date(), 'yyyy-MM-dd\tHH:mm:ss')}\t${uuid()}\t[${LogType[type]}]\t${message}\n`;

    // try to write the message to the log files
    try {
        // if the directory does not exist, create it
        if (!fs.existsSync(logDirectory)) {
            await fs.promises.mkdir(logDirectory);
        }

        // write the message to the log file
        if (filename) await fs.promises.appendFile(path.join(logDirectory, filename), logMessage);

        // write the message to the other relevant log files
        await fs.promises.appendFile(path.join(logDirectory, 'all.log'), logMessage);

        switch (type) {
            case LogType.INFO:
                await fs.promises.appendFile(path.join(logDirectory, 'info.log'), logMessage);
                break;
            case LogType.WARN:
                await fs.promises.appendFile(path.join(logDirectory, 'warn.log'), logMessage);
                break;
            case LogType.ERROR:
                await fs.promises.appendFile(path.join(logDirectory, 'error.log'), logMessage);
                break;
            default:
                break;
        }

        // log the message to the console
        console.log(logMessage);
    }
    catch (err) {
        console.error(err);
    }
}

const info = async (message: string, filename?: string) => {
    await log(message, LogType.INFO, filename);
}

const warn = async (message: string, filename?: string) => {
    await log(message, LogType.WARN, filename);
}

const error = async (message: string, filename?: string) => {
    await log(message, LogType.ERROR, filename);
}

export default { info, warn, error };