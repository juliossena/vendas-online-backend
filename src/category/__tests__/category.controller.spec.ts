import { Test, TestingModule } from '@nestjs/testing';
import { returnDeleteMock } from '../../__mocks__/return-delete.mock';
import { CategoryController } from '../category.controller';
import { CategoryService } from '../category.service';
import { categoryMock } from '../__mocks__/category.mock';
import { createCategoryMock } from '../__mocks__/create-category.mock';
import { updateCategoryMock } from '../__mocks__/update-category.mock';

describe('CategoryController', () => {
  let controller: CategoryController;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CategoryService,
          useValue: {
            findAllCategories: jest.fn().mockResolvedValue([categoryMock]),
            createCategory: jest.fn().mockResolvedValue(categoryMock),
            deleteCategory: jest.fn().mockResolvedValue(returnDeleteMock),
            editCategory: jest.fn().mockResolvedValue(categoryMock),
            findCategoryById: jest.fn().mockResolvedValue(categoryMock),
          },
        },
      ],
      controllers: [CategoryController],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    categoryService = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(categoryService).toBeDefined();
  });

  it('should return category Entity in findAllCategories', async () => {
    const category = await controller.findAllCategories();

    expect(category).toEqual([categoryMock]);
  });

  it('should return category Entity in createCategory', async () => {
    const category = await controller.createCategory(createCategoryMock);

    expect(category).toEqual(categoryMock);
  });

  it('should return DeleteResult in delete category', async () => {
    const category = await controller.deleteCategory(categoryMock.id);

    expect(category).toEqual(returnDeleteMock);
  });

  it('should send category id to delete category', async () => {
    const spy = jest.spyOn(categoryService, 'deleteCategory');
    await controller.deleteCategory(categoryMock.id);

    expect(spy.mock.calls[0][0]).toEqual(categoryMock.id);
  });

  it('should return category in update category', async () => {
    const category = await controller.editCategory(
      categoryMock.id,
      updateCategoryMock,
    );

    expect(category).toEqual(categoryMock);
  });

  it('should send category id and body', async () => {
    const spy = jest.spyOn(categoryService, 'editCategory');
    await controller.editCategory(categoryMock.id, updateCategoryMock);

    expect(spy.mock.calls[0][0]).toEqual(categoryMock.id);
    expect(spy.mock.calls[0][1]).toEqual(updateCategoryMock);
  });

  it('should return category in find category by id', async () => {
    const category = await controller.findCategoryById(categoryMock.id);

    expect(category).toEqual({
      id: categoryMock.id,
      name: categoryMock.name,
    });
  });

  it('should send id and true relations to findCategoryById', async () => {
    const spy = jest.spyOn(categoryService, 'findCategoryById');
    await controller.findCategoryById(categoryMock.id);

    expect(spy.mock.calls[0][0]).toEqual(categoryMock.id);
    expect(spy.mock.calls[0][1]).toEqual(true);
  });
});
