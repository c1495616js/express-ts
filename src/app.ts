import express, { Application } from 'express';
import logger from 'morgan';

import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@config';

class App {
  public app: Application;
  public env: string;
  public port: string | number;

  constructor(controllers: any[], port: number) {
    this.app = express();
    this.port = port;
    this.env = NODE_ENV || 'development';

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private initializeMiddlewares() {
    this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeControllers(controllers: any) {
    this.app.get('/v1', (request, response) => {
      response.json({ info: 'Node.js, Express, and Postgres API' });
    });
    controllers.forEach((controller: any) => this.app.use('/v1', controller.router));
  }
}

export default App;
