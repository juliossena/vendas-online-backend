import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { CategoryService } from './category.service';
import { CreateCategory } from './dtos/create-category.dto';
import { ReturnCategory } from './dtos/return-category.dto';
import { UpdateCategory } from './dtos/update-category.dto';
import { CategoryEntity } from './entities/category.entity';

@Roles(UserType.Admin, UserType.Root, UserType.User)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAllCategories(): Promise<ReturnCategory[]> {
    return this.categoryService.findAllCategories();
  }

  @Roles(UserType.Admin, UserType.Root)
  @UsePipes(ValidationPipe)
  @Post()
  async createCategory(
    @Body() createCategory: CreateCategory,
  ): Promise<CategoryEntity> {
    return this.categoryService.createCategory(createCategory);
  }

  @Roles(UserType.Admin, UserType.Root)
  @Delete(':categoryId')
  async deleteCategory(
    @Param('categoryId') categoryId: number,
  ): Promise<DeleteResult> {
    return this.categoryService.deleteCategory(categoryId);
  }

  @Roles(UserType.Admin, UserType.Root)
  @UsePipes(ValidationPipe)
  @Put(':categoryId')
  async editCategory(
    @Param('categoryId') categoryId: number,
    @Body() updateCategory: UpdateCategory,
  ): Promise<CategoryEntity> {
    return this.categoryService.editCategory(categoryId, updateCategory);
  }

  @Get(':categoryId')
  async findCategoryById(
    @Param('categoryId') categoryId: number,
  ): Promise<ReturnCategory> {
    return new ReturnCategory(
      await this.categoryService.findCategoryById(categoryId, true),
    );
  }
}
