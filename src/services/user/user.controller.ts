import express, { Request, Response } from 'express';

class UserController {
  public path = '/user';
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.router.get(this.path, this.getAll);
  }

  getAll = async (request: Request, response: Response) => {
    return response.json({ data: [] });
  };
}

export default UserController;
