import { Test, TestingModule } from '@nestjs/testing';
import { OrderProductService } from '../order-product.service';

describe('OrderProductService', () => {
  let service: OrderProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderProductService],
    }).compile();

    service = module.get<OrderProductService>(OrderProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
