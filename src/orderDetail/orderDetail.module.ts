import { Module } from '@nestjs/common';
import { OrderDetailService } from './orderDetail.service';
import { OrderDetailController } from './orderDetail.controller';

@Module({
  providers: [OrderDetailService],
  controllers: [OrderDetailController],
})
export class OrderDetailModule {}
