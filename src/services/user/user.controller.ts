import { authMiddleware, dtoValidationMiddleware } from '@/middlewares';
import express, { Request, Response, NextFunction } from 'express';
import { BaseController } from '../common';
import { CreateUserDto } from './user.dto';
import UserService from './user.service';
import { User } from './user.type';

class UserController extends BaseController {
  public userService = new UserService();

  constructor() {
    super('/user');
  }

  public initializeRoutes(): void {
    this.router.get(this.path, authMiddleware, this.getUsers.bind(this));
    this.router.post(this.path, dtoValidationMiddleware(CreateUserDto), this.createUser.bind(this));
  }

  public async getUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const findAllUsersData: User[] = await this.userService.findAllUser();

      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  }

  public async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userData: CreateUserDto = req.body;
      const createUserData: User = await this.userService.createUser(userData);

      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
