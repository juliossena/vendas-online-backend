import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CartProductService } from '../../cart-product/cart-product.service';
import { Repository } from 'typeorm';
import { CartService } from '../cart.service';
import { CartEntity } from '../entities/cart.entity';
import { returnDeleteMock } from '../../__mocks__/return-delete.mock';
import { cartMock } from '../__mocks__/cart.mock';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import { NotFoundException } from '@nestjs/common';
import { insertCartMock } from '../__mocks__/insert-cart.mock';
import { productMock } from '../../product/__mocks__/product.mock';
import { updateCartMock } from '../__mocks__/update-cart.mock';

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

  it('should return error in findOne undefined', async () => {
    jest.spyOn(cartRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.clearCart(userEntityMock.id)).rejects.toThrowError(
      NotFoundException,
    );
  });

  it('should return cart in success (not send relations)', async () => {
    const spy = jest.spyOn(cartRepository, 'findOne');
    const cart = await service.findCartByUserId(userEntityMock.id);

    expect(cart).toEqual(cartMock);
    expect(spy.mock.calls[0][0].relations).toEqual(undefined);
  });

  it('should return cart in success (send relations)', async () => {
    const spy = jest.spyOn(cartRepository, 'findOne');
    const cart = await service.findCartByUserId(userEntityMock.id, true);

    expect(cart).toEqual(cartMock);
    expect(spy.mock.calls[0][0].relations).toEqual({
      cartProduct: {
        product: true,
      },
    });
  });

  it('should return notFoundException in not found cart', async () => {
    jest.spyOn(cartRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.findCartByUserId(userEntityMock.id)).rejects.toThrowError(
      NotFoundException,
    );
  });

  it('should return send info in save (createCart)', async () => {
    const spy = jest.spyOn(cartRepository, 'save');

    const cart = await service.createCart(userEntityMock.id);

    expect(cart).toEqual(cartMock);
    expect(spy.mock.calls[0][0]).toEqual({
      active: true,
      userId: userEntityMock.id,
    });
  });

  it('should return cart in cart not found (insertProductInCart)', async () => {
    jest.spyOn(cartRepository, 'findOne').mockRejectedValue(undefined);
    const spy = jest.spyOn(cartRepository, 'save');
    const spyCartProductService = jest.spyOn(
      cartProductService,
      'insertProductInCart',
    );

    const cart = await service.insertProductInCart(
      insertCartMock,
      userEntityMock.id,
    );

    expect(cart).toEqual(cartMock);
    expect(spy.mock.calls.length).toEqual(1);
    expect(spyCartProductService.mock.calls.length).toEqual(1);
  });

  it('should return cart in cart found (insertProductInCart)', async () => {
    const spy = jest.spyOn(cartRepository, 'save');
    const spyCartProductService = jest.spyOn(
      cartProductService,
      'insertProductInCart',
    );

    const cart = await service.insertProductInCart(
      insertCartMock,
      userEntityMock.id,
    );

    expect(cart).toEqual(cartMock);
    expect(spy.mock.calls.length).toEqual(0);
    expect(spyCartProductService.mock.calls.length).toEqual(1);
  });

  it('should return DeleteResult in deleteProductCart', async () => {
    const spy = jest.spyOn(cartProductService, 'deleteProductCart');
    const deleteResult = await service.deleteProductCart(
      productMock.id,
      userEntityMock.id,
    );

    expect(deleteResult).toEqual(returnDeleteMock);
    expect(spy.mock.calls.length).toEqual(1);
  });

  it('should return NotFoundException in cart not exist', async () => {
    jest.spyOn(cartRepository, 'findOne').mockResolvedValue(undefined);
    const spy = jest.spyOn(cartProductService, 'deleteProductCart');

    expect(
      service.deleteProductCart(productMock.id, userEntityMock.id),
    ).rejects.toThrowError(NotFoundException);
    expect(spy.mock.calls.length).toEqual(0);
  });

  it('should return DeleteResult in deleteProductCart', async () => {
    const spy = jest.spyOn(cartProductService, 'deleteProductCart');
    const deleteResult = await service.deleteProductCart(
      productMock.id,
      userEntityMock.id,
    );

    expect(deleteResult).toEqual(returnDeleteMock);
    expect(spy.mock.calls.length).toEqual(1);
  });

  it('should return NotFoundException in cart not exist', async () => {
    jest.spyOn(cartRepository, 'findOne').mockResolvedValue(undefined);
    const spy = jest.spyOn(cartProductService, 'deleteProductCart');

    expect(
      service.deleteProductCart(productMock.id, userEntityMock.id),
    ).rejects.toThrowError(NotFoundException);
    expect(spy.mock.calls.length).toEqual(0);
  });

  it('should return cart in updateProductInCart', async () => {
    const spyCartProductService = jest.spyOn(
      cartProductService,
      'updateProductInCart',
    );
    const spySave = jest.spyOn(cartRepository, 'save');
    const cart = await service.updateProductInCart(
      updateCartMock,
      userEntityMock.id,
    );

    expect(cart).toEqual(cartMock);
    expect(spyCartProductService.mock.calls.length).toEqual(1);
    expect(spySave.mock.calls.length).toEqual(0);
  });

  it('should return cart in createCart', async () => {
    jest.spyOn(cartRepository, 'findOne').mockResolvedValue(undefined);

    const spySave = jest.spyOn(cartRepository, 'save');
    const cart = await service.updateProductInCart(
      updateCartMock,
      userEntityMock.id,
    );

    expect(cart).toEqual(cartMock);
    expect(spySave.mock.calls.length).toEqual(1);
  });
});
