import { User } from '../user';
import { CreateUserDto } from '../user/user.dto';
import { isEmpty } from '@/utils';
import { HttpException } from '@/exceptions';
import { UserEntity } from '../user/user.entity';
import { hash } from 'bcrypt';

export class AuthService {
  public async signup(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User | null = await UserEntity.findOne({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `This email: ${userData.email} already exists`);
    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await UserEntity.create({ ...userData, password: hashedPassword }).save();
    return createUserData;
  }
}
