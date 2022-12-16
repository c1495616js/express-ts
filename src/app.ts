import 'reflect-metadata';
import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { DataSource } from 'typeorm';

import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@config';
import { errorMiddleware } from '@/middlewares';

class App {
  public app: Application;
  public env: string;
  public port: string | number;
  private database: DataSource | null;

  constructor({
    controllers = [],
    middlewares = [],
    database = null,
    port = 4000,
  }: {
    controllers: any[];
    middlewares: any[];
    database?: DataSource | null;
    port: number;
  }) {
    this.app = express();
    this.port = port;
    this.env = NODE_ENV || 'development';
    this.database = database;

    this.connectToDatabase();
    this.initializeGlobalMiddlewares(middlewares);
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
    this.initializeSwagger();
  }

  private connectToDatabase() {
    this.database
      ?.initialize()
      .then(({ isInitialized }) =>
        isInitialized
          ? console.log('The database is initialized')
          : console.log('There is error in initailizing the database')
      );
  }

  private initializeGlobalMiddlewares(middlewares: any[]) {
    middlewares.forEach((middleware) => this.app.use(middleware));
  }

  private initializeControllers(controllers: any[]) {
    this.app.get('/v1', (_request, response) => {
      response.json({ info: 'Hello World!' });
    });
    controllers.forEach((controller) => this.app.use('/v1', controller.router));
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'The api documentation',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
