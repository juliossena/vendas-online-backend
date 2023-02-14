import { OrderEntity } from '../../order/entities/order.entity';
import { ProductEntity } from '../../product/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'order_product' })
export class OrderProductEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'order_id', nullable: false })
  orderId: number;

  @Column({ name: 'product_id', nullable: false })
  productId: number;

  @Column({ name: 'amount', nullable: false })
  amount: number;

  @Column({ name: 'price', nullable: false })
  price: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => OrderEntity, (order) => order.ordersProduct)
  @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
  order?: OrderEntity;

  @ManyToOne(() => ProductEntity, (product) => product.ordersProduct)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product?: ProductEntity;
}
