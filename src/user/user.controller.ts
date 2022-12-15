import express, { Request, Response } from 'express';

import { UserModal } from '.';

class UserController {
  public path = '/user';
  public router = express.Router();
  private readonly modal: UserModal;

  constructor() {
    this.modal = new UserModal('users');
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.router.get(this.path, this.getAll);
  }

  getAll = async (request: Request, response: Response) => {
    const users = await this.modal.select('*');
    return response.json({ data: users?.rows });
  };
}

export default UserController;
