import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from '../product/product.module';
import { CartProductService } from './cart-product.service';
import { CartProductEntity } from './entities/cart-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartProductEntity]), ProductModule],
  providers: [CartProductService],
  exports: [CartProductService],
})
export class CartProductModule {}
