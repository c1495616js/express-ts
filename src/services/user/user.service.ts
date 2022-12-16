import { hash } from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';
import { UserEntity } from './user.entity';
import { HttpException } from '@exceptions/index';
import { User } from './user.type';

class UserService {
  public async findAllUser(): Promise<User[]> {
    const users: User[] = await UserEntity.find();
    return users;
  }

  //   public async findUserById(userId: number): Promise<User> {
  //     if (iuserId)) throw new HttpException(400, 'UserId is empty');

  //     const findUser: User = await UserEntity.findOne({ where: { id: userId } });
  //     if (!findUser) throw new HttpException(409, "User doesn't exist");

  //     return findUser;
  //   }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (!userData) throw new HttpException(400, 'userData is empty');

    const findUser: User | null = await UserEntity.findOne({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await UserEntity.create({ ...userData, password: hashedPassword }).save();

    return createUserData;
  }

  //   public async updateUser(userId: number, userData: CreateUserDto): Promise<User> {
  //     if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

  //     const findUser: User = await UserEntity.findOne({ where: { id: userId } });
  //     if (!findUser) throw new HttpException(409, "User doesn't exist");

  //     const hashedPassword = await hash(userData.password, 10);
  //     await UserEntity.update(userId, { ...userData, password: hashedPassword });

  //     const updateUser: User = await UserEntity.findOne({ where: { id: userId } });
  //     return updateUser;
  //   }

  //   public async deleteUser(userId: number): Promise<User> {
  //     if (isEmpty(userId)) throw new HttpException(400, 'UserId is empty');

  //     const findUser: User = await UserEntity.findOne({ where: { id: userId } });
  //     if (!findUser) throw new HttpException(409, "User doesn't exist");

  //     await UserEntity.delete({ id: userId });
  //     return findUser;
  //   }
}

export default UserService;
