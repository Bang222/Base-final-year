import { Body, Controller, Post, Req } from '@nestjs/common';
import { OrderDetailService } from './orderDetail.service';
import { OrderDetailsDto } from './dto';

@Controller('orderDetail')
export class OrderDetailController {
  constructor(private orderDetailService: OrderDetailService) {}
  @Post('create')
  async createOrderDetail(@Body() orderDetailsDto: OrderDetailsDto) {
    return await this.orderDetailService.makeOrderDetail(orderDetailsDto);
  }
}
