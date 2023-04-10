import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { UserId } from '../decorators/user-id.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { DeleteResult } from 'typeorm';
import { CartService } from './cart.service';
import { InsertCartDTO } from './dtos/insert-cart.dto';
import { ReturnCartDTO } from './dtos/return-cart.dto';
import { UpdateCartDTO } from './dtos/update-cart.dto';
import { Response } from 'express';

@Roles(UserType.User, UserType.Admin, UserType.Root)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createCart(
    @Body() insertCart: InsertCartDTO,
    @UserId() userId: number,
  ): Promise<ReturnCartDTO> {
    return new ReturnCartDTO(
      await this.cartService.insertProductInCart(insertCart, userId),
    );
  }

  @Get()
  async findCartByUserId(
    @UserId() userId: number,
    @Res({ passthrough: true }) res?: Response,
  ): Promise<ReturnCartDTO> {
    const cart = await this.cartService
      .findCartByUserId(userId, true)
      .catch(() => undefined);

    if (cart) {
      return cart;
    }

    res.status(204).send();

    return;
  }

  @Delete()
  async clearCart(@UserId() userId: number): Promise<DeleteResult> {
    return this.cartService.clearCart(userId);
  }

  @Delete('/product/:productId')
  async deleteProductCart(
    @Param('productId') productId: number,
    @UserId() userId: number,
  ): Promise<DeleteResult> {
    return this.cartService.deleteProductCart(productId, userId);
  }

  @UsePipes(ValidationPipe)
  @Patch()
  async updateProductInCart(
    @Body() updateCartDTO: UpdateCartDTO,
    @UserId() userId: number,
  ): Promise<ReturnCartDTO> {
    return new ReturnCartDTO(
      await this.cartService.updateProductInCart(updateCartDTO, userId),
    );
  }
}
