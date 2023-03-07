import { forwardRef, Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { CategoryModule } from '../category/category.module';
import { CorreiosModule } from '../correios/correios.module';

@Module({
  imports: [
    CorreiosModule,
    TypeOrmModule.forFeature([ProductEntity]),
    forwardRef(() => CategoryModule),
  ],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
