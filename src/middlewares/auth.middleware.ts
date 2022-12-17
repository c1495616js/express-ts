import { NextFunction, Response, Request } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { UserEntity } from '@/services/user';
import { DataStoredInToken, RequestWithUser } from '@/services/auth/auth.type';
import { HttpException } from '@/exceptions';

const authMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const Authorization =
      req.cookies['Authorization'] ||
      (req.header('Authorization') ? req.header('Authorization')!.split('Bearer ')[1] : null);

    if (Authorization) {
      const secretKey = SECRET_KEY as string;
      const { id } = verify(Authorization, secretKey) as DataStoredInToken;
      const findUser = await UserEntity.findOneBy({ id });

      if (findUser) {
        (req as RequestWithUser).user = findUser;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default authMiddleware;
