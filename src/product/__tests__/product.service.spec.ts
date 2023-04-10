import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CategoryService } from '../../category/category.service';
import { categoryMock } from '../../category/__mocks__/category.mock';
import { ILike, In, Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { ProductService } from '../product.service';
import { createProductMock } from '../__mocks__/create-product.mock';
import { productMock } from '../__mocks__/product.mock';
import { returnDeleteMock } from '../../__mocks__/return-delete.mock';
import { CorreiosService } from '../../correios/correios.service';

describe('ProductService', () => {
  let service: ProductService;
  let productRepository: Repository<ProductEntity>;
  let categoryService: CategoryService;
  let correiosService: CorreiosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: CategoryService,
          useValue: {
            findCategoryById: jest.fn().mockResolvedValue(categoryMock),
          },
        },
        {
          provide: CorreiosService,
          useValue: {
            priceDelivery: jest.fn().mockResolvedValue({}),
          },
        },
        {
          provide: getRepositoryToken(ProductEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([productMock]),
            findOne: jest.fn().mockResolvedValue(productMock),
            save: jest.fn().mockResolvedValue(productMock),
            delete: jest.fn().mockResolvedValue(returnDeleteMock),
            findAndCount: jest.fn().mockResolvedValue([[productMock], 1]),
          },
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    categoryService = module.get<CategoryService>(CategoryService);
    correiosService = module.get<CorreiosService>(CorreiosService);
    productRepository = module.get<Repository<ProductEntity>>(
      getRepositoryToken(ProductEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(categoryService).toBeDefined();
    expect(productRepository).toBeDefined();
    expect(correiosService).toBeDefined();
  });

  it('should return all products', async () => {
    const products = await service.findAll();

    expect(products).toEqual([productMock]);
  });

  it('should return relations in find all products', async () => {
    const spy = jest.spyOn(productRepository, 'find');
    const products = await service.findAll([], true);

    expect(products).toEqual([productMock]);
    expect(spy.mock.calls[0][0]).toEqual({
      relations: {
        category: true,
      },
    });
  });

  it('should return relatiosn and array in find all products', async () => {
    const spy = jest.spyOn(productRepository, 'find');
    const products = await service.findAll([1], true);

    expect(products).toEqual([productMock]);
    expect(spy.mock.calls[0][0]).toEqual({
      where: {
        id: In([1]),
      },
      relations: {
        category: true,
      },
    });
  });

  it('should return error if products empty', async () => {
    jest.spyOn(productRepository, 'find').mockResolvedValue([]);

    expect(service.findAll()).rejects.toThrowError();
  });

  it('should return error in exception', async () => {
    jest.spyOn(productRepository, 'find').mockRejectedValue(new Error());

    expect(service.findAll()).rejects.toThrowError();
  });

  it('should return product after insert in DB', async () => {
    const product = await service.createProduct(createProductMock);

    expect(product).toEqual(productMock);
  });

  it('should return product after insert in DB', async () => {
    jest
      .spyOn(categoryService, 'findCategoryById')
      .mockRejectedValue(new Error());

    expect(service.createProduct(createProductMock)).rejects.toThrowError();
  });

  it('should return product in find by id', async () => {
    const spy = jest.spyOn(productRepository, 'findOne');
    const product = await service.findProductById(productMock.id);

    expect(product).toEqual(productMock);
    expect(spy.mock.calls[0][0]).toEqual({
      where: {
        id: productMock.id,
      },
    });
  });

  it('should return product in find by id use relations', async () => {
    const spy = jest.spyOn(productRepository, 'findOne');
    const product = await service.findProductById(productMock.id, true);

    expect(product).toEqual(productMock);
    expect(spy.mock.calls[0][0]).toEqual({
      where: {
        id: productMock.id,
      },
      relations: {
        category: true,
      },
    });
  });

  it('should return error in product not found', async () => {
    jest.spyOn(productRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.findProductById(productMock.id)).rejects.toThrowError();
  });

  it('should return deleted true in delete product', async () => {
    const deleted = await service.deleteProduct(productMock.id);

    expect(deleted).toEqual(returnDeleteMock);
  });

  it('should return produt after update', async () => {
    const product = await service.updateProduct(
      createProductMock,
      productMock.id,
    );

    expect(product).toEqual(productMock);
  });

  it('should error in update product', async () => {
    jest.spyOn(productRepository, 'save').mockRejectedValue(new Error());

    expect(
      service.updateProduct(createProductMock, productMock.id),
    ).rejects.toThrowError();
  });

  it('should return product pagination', async () => {
    const spy = jest.spyOn(productRepository, 'findAndCount');
    const productsPagination = await service.findAllPage();

    expect(productsPagination.data).toEqual([productMock]);
    expect(productsPagination.meta).toEqual({
      itemsPerPage: 10,
      totalItems: 1,
      currentPage: 1,
      totalPages: 1,
    });
    expect(spy.mock.calls[0][0]).toEqual({
      take: 10,
      skip: 0,
    });
  });

  it('should return product pagination send size and page', async () => {
    const mockSize = 432;
    const mockPage = 532;
    const productsPagination = await service.findAllPage(
      undefined,
      mockSize,
      mockPage,
    );

    expect(productsPagination.data).toEqual([productMock]);
    expect(productsPagination.meta).toEqual({
      itemsPerPage: mockSize,
      totalItems: 1,
      currentPage: mockPage,
      totalPages: 1,
    });
  });

  it('should return product pagination search', async () => {
    const mockSearch = 'mockSearch';
    const spy = jest.spyOn(productRepository, 'findAndCount');
    await service.findAllPage(mockSearch);

    expect(spy.mock.calls[0][0].where).toEqual({
      name: ILike(`%${mockSearch}%`),
    });
  });
});
