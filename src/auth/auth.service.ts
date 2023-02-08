import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { validatePassword } from '../utils/password';
import { ReturnUserDto } from '../user/dtos/returnUser.dto';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { LoginDto } from './dtos/login.dto';
import { LoginPayload } from './dtos/loginPayload.dto';
import { ReturnLogin } from './dtos/returnLogin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<ReturnLogin> {
    const user: UserEntity | undefined = await this.userService
      .findUserByEmail(loginDto.email)
      .catch(() => undefined);

    const isMatch = await validatePassword(
      loginDto.password,
      user?.password || '',
    );

    if (!user || !isMatch) {
      throw new NotFoundException('Email or passord invalid');
    }

    return {
      accessToken: this.jwtService.sign({ ...new LoginPayload(user) }),
      user: new ReturnUserDto(user),
    };
  }
}
