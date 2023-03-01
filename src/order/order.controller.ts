import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { UserId } from '../decorators/user-id.decorator';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { OrderEntity } from './entities/order.entity';
import { OrderService } from './order.service';
import { ReturnOrderDTO } from './dtos/return-order.dto';

@Roles(UserType.Admin, UserType.User)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createOrder(
    @Body() createOrderDTO: CreateOrderDTO,
    @UserId() userId: number,
  ): Promise<OrderEntity> {
    return this.orderService.createOrder(createOrderDTO, userId);
  }

  @Get()
  async findOrdersByUserId(@UserId() userId: number): Promise<OrderEntity[]> {
    return this.orderService.findOrdersByUserId(userId);
  }

  @Roles(UserType.Admin)
  @Get('/all')
  async findAllOrders(): Promise<ReturnOrderDTO[]> {
    return (await this.orderService.findAllOrders()).map(
      (order) => new ReturnOrderDTO(order),
    );
  }
}
