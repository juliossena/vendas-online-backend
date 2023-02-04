import { StateEntity } from '../entities/state.entity';

export class ReturnStateDto {
  name: string;

  constructor(state: StateEntity) {
    this.name = state.name;
  }
}
