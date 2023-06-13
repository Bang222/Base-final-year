import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { MyJwtGuard } from '../auth/guard';

@Controller('order')
@UseGuards(MyJwtGuard)
export class OrderController {
  constructor(private orderService: OrderService) {}
  // @Post('create')
  // async createOrder(@Body() orderDto: OrderEntity, @Req() rq) {
  //   const userId: number = await rq.user.id;
  //   return await this.orderService.createOrder(orderDto, userId);
  // }
  @Get('all-order')
  async listOrder(@Body() orderId: string, @Req() rq) {
    const userId = await rq.user.id;
    return await this.orderService.listOrder(orderId, userId);
  }
}
