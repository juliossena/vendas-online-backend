import { UserEntity } from '../../user/entities/user.entity';

export class LoginPayload {
  id: number;
  typeUser: number;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.typeUser = user.typeUser;
  }
}
