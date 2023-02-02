import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dtos/createUser.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  private users: User[] = [];

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;

    const passwordHashed = await hash(createUserDto.password, saltOrRounds);

    const user: User = {
      ...createUserDto,
      id: this.users.length + 1,
      password: passwordHashed,
    };

    this.users.push(user);

    return user;
  }

  async getAlUser(): Promise<User[]> {
    return this.users;
  }
}
