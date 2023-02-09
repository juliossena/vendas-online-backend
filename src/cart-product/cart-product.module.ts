import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartProductService } from './cart-product.service';
import { CartProdutEntity } from './entities/cart-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartProdutEntity])],
  providers: [CartProductService],
  exports: [CartProductService],
})
export class CartProductModule {}
