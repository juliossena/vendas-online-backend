import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { orderMock } from '../../order/__mocks__/order.mock';
import { productMock } from '../../product/__mocks__/product.mock';
import { Repository } from 'typeorm';
import { OrderProductEntity } from '../entities/order-product.entity';
import { OrderProductService } from '../order-product.service';
import { orderProductMock } from '../__mocks__/order-product.mock';

describe('OrderProductService', () => {
  let service: OrderProductService;
  let orderProductRepository: Repository<OrderProductEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(OrderProductEntity),
          useValue: {
            save: jest.fn().mockResolvedValue(orderProductMock),
          },
        },
        OrderProductService,
      ],
    }).compile();

    service = module.get<OrderProductService>(OrderProductService);
    orderProductRepository = module.get<Repository<OrderProductEntity>>(
      getRepositoryToken(OrderProductEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(orderProductRepository).toBeDefined();
  });

  it('should return orderProduct in save', async () => {
    const spy = jest.spyOn(orderProductRepository, 'save');
    const orderProduct = await service.createOrderProduct(
      productMock.id,
      orderMock.id,
      orderProductMock.price,
      orderProductMock.amount,
    );

    expect(orderProduct).toEqual(orderProductMock);
    expect(spy.mock.calls[0][0].price).toEqual(orderProductMock.price);
    expect(spy.mock.calls[0][0].amount).toEqual(orderProductMock.amount);
    expect(spy.mock.calls[0][0].orderId).toEqual(orderMock.id);
    expect(spy.mock.calls[0][0].productId).toEqual(productMock.id);
  });

  it('should return exception in error DB', async () => {
    jest.spyOn(orderProductRepository, 'save').mockRejectedValue(new Error());

    expect(
      service.createOrderProduct(
        productMock.id,
        orderMock.id,
        orderProductMock.price,
        orderProductMock.amount,
      ),
    ).rejects.toThrowError();
  });
});
