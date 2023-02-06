import { ReturnUserDto } from '../../user/dtos/returnUser.dto';

export interface ReturnLogin {
  user: ReturnUserDto;
  accessToken: string;
}
