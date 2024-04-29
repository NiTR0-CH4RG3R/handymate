import { RequestHandler, ErrorRequestHandler } from 'express'

import logger from '../core/logger'

const requestLogger : RequestHandler = (req, res, next) => {
    // log incomming requests
    const message = `(RH) ${req.method}\t${req.ip}\t${req.headers.origin}\t${req.path}`;
    logger.info(message, 'requests.log');

    // log outgoing responses
    res.on('finish', () => {
        const message = `(RH) ${req.ip}\t${res.statusCode}\t${res.statusMessage}`;
        logger.info(message, 'requests.log');
    });

    // continue with the request
    next();
}

const errorLogger : ErrorRequestHandler = (err, req, res, next) => {
    // log the error
    logger.error(JSON.stringify(err), null);

    // send the error response
    res.status(500).json({ message: 'Internal Server Error' });

    // continue with the request
    next(err);
}

export default { requestLogger, errorLogger }