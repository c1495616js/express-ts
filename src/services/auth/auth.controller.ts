import { dtoValidationMiddleware } from '@/middlewares';
import { BaseController } from '@/services/common';
import { NextFunction, Request, Response } from 'express';
import { User } from '../user';
import { CreateUserDto } from '../user/user.dto';
import { AuthService } from './auth.service';

export class AuthController extends BaseController {
  public authService = new AuthService();

  constructor() {
    super('/auth');
  }

  public initializeRoutes(): void {
    this.router.post(this.path + '/signup', dtoValidationMiddleware(CreateUserDto), this.signup.bind(this));
    this.router.post(this.path + '/login', dtoValidationMiddleware(CreateUserDto), this.login.bind(this));
  }

  public async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userData: CreateUserDto = req.body;
      const signUpUserData: User = await this.authService.signup(userData);
      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (err) {
      next(err);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userData: CreateUserDto = req.body;
      const { cookie, findUser } = await this.authService.login(userData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: findUser, message: 'login' });
    } catch (err) {
      next(err);
    }
  }
}
