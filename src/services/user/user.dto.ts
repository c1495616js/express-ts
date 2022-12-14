import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}
