import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '../product.controller';
import { ProductService } from '../product.service';
import { productMock, productPaginationMock } from '../__mocks__/product.mock';
import { createProductMock } from '../__mocks__/create-product.mock';
import { returnDeleteMock } from '../../__mocks__/return-delete.mock';
import { updateProductMock } from '../__mocks__/update-product.mock';

describe('ProductController', () => {
  let controller: ProductController;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ProductService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([productMock]),
            createProduct: jest.fn().mockResolvedValue(productMock),
            findProductById: jest.fn().mockResolvedValue(productMock),
            updateProduct: jest.fn().mockResolvedValue(productMock),
            deleteProduct: jest.fn().mockResolvedValue(returnDeleteMock),
            findAllPage: jest.fn().mockResolvedValue(productPaginationMock),
          },
        },
      ],
      controllers: [ProductController],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(productService).toBeDefined();
  });

  it('should return returnProduct in findAll', async () => {
    const products = await controller.findAll();

    expect(products).toEqual([
      {
        id: productMock.id,
        name: productMock.name,
        price: productMock.price,
        image: productMock.image,
        diameter: productMock.diameter,
        height: productMock.height,
        length: productMock.length,
        weight: productMock.weight,
        width: productMock.width,
      },
    ]);
  });

  it('should return returnProduct in findByProductId', async () => {
    const products = await controller.findProductById(productMock.id);

    expect(products).toEqual({
      id: productMock.id,
      name: productMock.name,
      price: productMock.price,
      image: productMock.image,
      diameter: productMock.diameter,
      height: productMock.height,
      length: productMock.length,
      weight: productMock.weight,
      width: productMock.width,
    });
  });

  it('should return productEntity in createProduct', async () => {
    const product = await controller.createProduct(createProductMock);

    expect(product).toEqual(productMock);
  });

  it('should return returnDelete in deleteProduct', async () => {
    const product = await controller.deleteProduct(productMock.id);

    expect(product).toEqual(returnDeleteMock);
  });

  it('should return ProductEntity in updateProduct', async () => {
    const product = await controller.updateProduct(
      updateProductMock,
      productMock.id,
    );

    expect(product).toEqual(productMock);
  });

  it('shoud retun ProductEntity in findAllPage', async () => {
    const product = await controller.findAllPage();

    expect(product).toEqual(productPaginationMock);
  });

  it('shoud retun ProductEntity in findAllPage', async () => {
    const mockSearch = 'mockSearch';
    const mockSize = 112;
    const mockPage = 48392;
    const spy = jest.spyOn(productService, 'findAllPage');
    await controller.findAllPage(mockSearch, mockSize, mockPage);

    expect(spy.mock.calls[0][0]).toEqual(mockSearch);
    expect(spy.mock.calls[0][1]).toEqual(mockSize);
    expect(spy.mock.calls[0][2]).toEqual(mockPage);
  });
});
