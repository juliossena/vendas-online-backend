import { CategoryEntity } from '../entities/category.entity';

export class ReturnCategory {
  id: number;
  name: string;
  amountProducts?: number;

  constructor(categoryEntity: CategoryEntity, amountProducts?: number) {
    this.id = categoryEntity.id;
    this.name = categoryEntity.name;
    this.amountProducts = amountProducts;
  }
}
