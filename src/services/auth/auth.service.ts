import { User } from '../user';
import { CreateUserDto } from '../user/user.dto';
import { isEmpty } from '@/utils';
import { HttpException } from '@/exceptions';
import { UserEntity } from '../user/user.entity';
import { compare, hash } from 'bcrypt';
import { DataStoredInToken, TokenData } from './auth.type';
import { SECRET_KEY } from '@/config';
import { sign } from 'jsonwebtoken';

export class AuthService {
  public async signup(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User | null = await UserEntity.findOne({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `This email: ${userData.email} already exists`);
    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await UserEntity.create({ ...userData, password: hashedPassword }).save();
    return createUserData;
  }

  public async login(userData: CreateUserDto): Promise<{ cookie: string; findUser: User }> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User | null = await UserEntity.findOne({ where: { email: userData.email } });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Password not matching');

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, findUser };
  }

  private createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = SECRET_KEY as string;
    const expiresIn: number = 60 * 60;
    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  private createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }
}
