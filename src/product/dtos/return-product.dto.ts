import { ReturnCategory } from '../../category/dtos/return-category.dto';
import { ProductEntity } from '../entities/product.entity';

export class ReturnProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  weight: number;
  length: number;
  height: number;
  width: number;
  diameter: number;
  category?: ReturnCategory;

  constructor(productEntity: ProductEntity) {
    this.id = productEntity.id;
    this.name = productEntity.name;
    this.price = productEntity.price;
    this.image = productEntity.image;
    this.weight = productEntity.weight;
    this.length = productEntity.length;
    this.height = productEntity.height;
    this.width = productEntity.width;
    this.diameter = productEntity.diameter;
    this.category = productEntity.category
      ? new ReturnCategory(productEntity.category)
      : undefined;
  }
}
