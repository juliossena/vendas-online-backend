import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderProductEntity } from './entities/order-product.entity';
import { OrderProductService } from './order-product.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderProductEntity])],
  providers: [OrderProductService],
  exports: [OrderProductService],
})
export class OrderProductModule {}
