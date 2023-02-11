import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CartProductService } from '../../cart-product/cart-product.service';
import { Repository } from 'typeorm';
import { CartService } from '../cart.service';
import { CartEntity } from '../entities/cart.entity';
import { returnDeleteMock } from '../../__mocks__/return-delete.mock';
import { cartMock } from '../__mocks__/cart.mock';
import { userEntityMock } from '../../user/__mocks__/user.mock';

describe('CartService', () => {
  let service: CartService;
  let cartRepository: Repository<CartEntity>;
  let cartProductService: CartProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartService,
        {
          provide: CartProductService,
          useValue: {
            insertProductInCart: jest.fn().mockResolvedValue(undefined),
            deleteProductCart: jest.fn().mockResolvedValue(returnDeleteMock),
            updateProductInCart: jest.fn().mockResolvedValue(undefined),
          },
        },
        {
          provide: getRepositoryToken(CartEntity),
          useValue: {
            save: jest.fn().mockResolvedValue(cartMock),
            findOne: jest.fn().mockResolvedValue(cartMock),
          },
        },
      ],
    }).compile();

    service = module.get<CartService>(CartService);
    cartProductService = module.get<CartProductService>(CartProductService);
    cartRepository = module.get<Repository<CartEntity>>(
      getRepositoryToken(CartEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(cartProductService).toBeDefined();
    expect(cartRepository).toBeDefined();
  });

  it('should return delete result if delete cart', async () => {
    const spy = jest.spyOn(cartRepository, 'save');

    const resultDelete = await service.clearCart(userEntityMock.id);

    expect(resultDelete).toEqual(returnDeleteMock);
    expect(spy.mock.calls[0][0]).toEqual({
      ...cartMock,
      active: false,
    });
  });
});
