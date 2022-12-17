import express from 'express';

export abstract class BaseController {
  public path: string;
  public router = express.Router();

  constructor(path: string) {
    this.path = path;
    this.initializeRoutes();
  }

  abstract initializeRoutes(): void;
}
