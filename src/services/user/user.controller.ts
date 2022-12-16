import { dtoValidationMiddleware } from '@/middlewares';
import express, { Request, Response, NextFunction } from 'express';
import { CreateUserDto } from './user.dto';
import UserService from './user.service';
import { User } from './user.type';

class UserController {
  public path = '/user';
  public router = express.Router();
  public userService = new UserService();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.router.get(this.path, this.getUsers);
    this.router.post(this.path, dtoValidationMiddleware(CreateUserDto, { value: 'body' }), this.createUser);
  }

  public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllUsersData: User[] = await this.userService.findAllUser();

      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      const createUserData: User = await this.userService.createUser(userData);

      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
