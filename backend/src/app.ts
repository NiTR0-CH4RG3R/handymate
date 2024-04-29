import express from 'express';
import cors from 'cors';
import log from './core/logger'
import logger from './middleware/logger.middleware';
import corsOptions from './config/cors.config';
import Route from './core/route';
import EnvVar from './core/envvar';
import * as controllers from './controllers';

import mongoose from 'mongoose';

class App {
  private server;
  private port = 3500;

  public constructor() {

    // Connect to the MongoDB database
    mongoose.connect(EnvVar.Instance.get('BACKEND_DATABASE_URI'))
      .then(() => {
        log.info('(MONGOOSE): Connected to the MongoDB database', 'database.log');
      })
      .catch((err) => {
        log.error(`(MONGOOSE): Error connecting to the MongoDB database - ${err}`, 'database.log');
      });

    mongoose.connection.on('error', (err) => {
      log.error(`(MONGOOSE): ${err}`, 'database.log');
    });

    mongoose.connection.on('all', (info) => {
      log.info(`(MONGOOSE): ${info}`, 'database.log');
    });

    if (EnvVar.Instance.get('BACKEND_DEBUG') === 'true') {
      mongoose.set("debug", (collectionName, method, query, doc) => {
        log.info(`(MONGOOSE): ${collectionName}.${method} ${JSON.stringify(query)}, ${doc}`, 'database.log');
      });
    }

    // Set the port from the environment variables or use the default port
    this.port = parseInt(EnvVar.Instance.get('BACKEND_EXPRESS_PORT')) || this.port;

    this.server = express();

    this.middlewares();
    this.routes();

    // Add the errorLogger middleware here in order to log all the errors that occur in the application
    this.server.use(logger.errorLogger);
  }

  private middlewares() {
    this.server.use(logger.requestLogger);
    this.server.use(express.urlencoded({ extended: true }));

    // Only allow json requests
    this.server.use(express.json());

    // Enable CORS
    this.server.use(cors(corsOptions));
  }

  private routes() {
    const routes = Object.values(controllers).map((controller) => new Route(controller));
    routes.forEach((route) => {
      this.server.use(route.getRouter());
    });
    this.server.all('*', (req, res) => {
      res.status(404).json({ message: 'Route not found' });
    });
  }

  public listen() {
    mongoose.connection.once('open', () => {
      this.server.listen(this.port, () => {
        log.info(`Server is running on port ${this.port}`, 'server.log');
      });
    });
  }
}

export default new App();