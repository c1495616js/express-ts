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
}
