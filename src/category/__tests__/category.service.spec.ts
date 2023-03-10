import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductService } from '../../product/product.service';
import { Repository } from 'typeorm';
import { CategoryService } from '../category.service';
import { CategoryEntity } from '../entities/category.entity';
import { categoryMock } from '../__mocks__/category.mock';
import { createCategoryMock } from '../__mocks__/create-category.mock';
import { countProductMock } from '../../product/__mocks__/count-product.mock';
import { ReturnCategory } from '../dtos/return-category.dto';
import { returnDeleteMock } from '../../__mocks__/return-delete.mock';
import { productMock } from '../../product/__mocks__/product.mock';
import { BadRequestException } from '@nestjs/common';
import { updateCategoryMock } from '../__mocks__/update-category.mock';

describe('CategoryService', () => {
  let service: CategoryService;
  let categoryRepository: Repository<CategoryEntity>;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: ProductService,
          useValue: {
            countProdutsByCategoryId: jest
              .fn()
              .mockResolvedValue([countProductMock]),
          },
        },
        {
          provide: getRepositoryToken(CategoryEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(categoryMock),
            find: jest.fn().mockResolvedValue([categoryMock]),
            save: jest.fn().mockResolvedValue(categoryMock),
            delete: jest.fn().mockResolvedValue(returnDeleteMock),
          },
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    productService = module.get<ProductService>(ProductService);
    categoryRepository = module.get<Repository<CategoryEntity>>(
      getRepositoryToken(CategoryEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(productService).toBeDefined();
    expect(categoryRepository).toBeDefined();
  });

  it('should return list category', async () => {
    const categories = await service.findAllCategories();

    expect(categories).toEqual([
      new ReturnCategory(categoryMock, countProductMock.total),
    ]);
  });

  it('should return error in list category empty', async () => {
    jest.spyOn(categoryRepository, 'find').mockResolvedValue([]);

    expect(service.findAllCategories()).rejects.toThrowError();
  });

  it('should return error in list category exception', async () => {
    jest.spyOn(categoryRepository, 'find').mockRejectedValue(new Error());

    expect(service.findAllCategories()).rejects.toThrowError();
  });

  it('should return error if exist category name', async () => {
    expect(service.createCategory(createCategoryMock)).rejects.toThrowError();
  });

  it('should return category after save', async () => {
    jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(undefined);

    const category = await service.createCategory(createCategoryMock);

    expect(category).toEqual(categoryMock);
  });

  it('should return error in exception', async () => {
    jest.spyOn(categoryRepository, 'save').mockRejectedValue(new Error());

    expect(service.createCategory(createCategoryMock)).rejects.toThrowError();
  });

  it('should return category in find by name', async () => {
    const category = await service.findCategoryByName(categoryMock.name);

    expect(category).toEqual(categoryMock);
  });

  it('should return error if category find by name empty', async () => {
    jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(undefined);

    expect(
      service.findCategoryByName(categoryMock.name),
    ).rejects.toThrowError();
  });

  it('should return category in find by id', async () => {
    const category = await service.findCategoryById(categoryMock.id);

    expect(category).toEqual(categoryMock);
  });

  it('should return error in not found category id', async () => {
    jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.findCategoryById(categoryMock.id)).rejects.toThrowError();
  });

  it('should return delete result in success', async () => {
    const deleteResult = await service.deleteCategory(categoryMock.id);

    expect(deleteResult).toEqual(returnDeleteMock);
  });

  it('should send relations in request findOne', async () => {
    const spy = jest.spyOn(categoryRepository, 'findOne');
    await service.deleteCategory(categoryMock.id);

    expect(spy.mock.calls[0][0]).toEqual({
      where: {
        id: categoryMock.id,
      },
      relations: {
        products: true,
      },
    });
  });

  it('should return error if category with relations', async () => {
    jest.spyOn(categoryRepository, 'findOne').mockResolvedValue({
      ...categoryMock,
      products: [productMock],
    });

    expect(service.deleteCategory(categoryMock.id)).rejects.toThrowError(
      BadRequestException,
    );
  });

  it('should return category in update category', async () => {
    const spy = jest.spyOn(categoryRepository, 'findOne');
    const category = await service.editCategory(
      categoryMock.id,
      updateCategoryMock,
    );

    expect(category).toEqual(categoryMock);
    expect(spy.mock.calls.length > 0).toEqual(true);
  });

  it('should send new category to save', async () => {
    const spy = jest.spyOn(categoryRepository, 'save');
    await service.editCategory(categoryMock.id, updateCategoryMock);

    expect(spy.mock.calls[0][0]).toEqual({
      ...categoryMock,
      ...updateCategoryMock,
    });
  });
});
