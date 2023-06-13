import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrderDetailsDto } from './dto';

@Injectable()
export class OrderDetailService {
  constructor(
    private prismaService: PrismaService
  ) // private prismaPrimary: PrismaService
  {}
  async makeOrderDetail(orderDetailsDto: OrderDetailsDto) {
    try {
      const createOrderDetail = await this.prismaService
        .getPrisma()
        .orderDetail.create({
          data: {
            ...orderDetailsDto,
            quantity: Number(orderDetailsDto.quantity),
            tripId: orderDetailsDto.tripId,
            orderId: orderDetailsDto.orderId,
          },
        });
      return createOrderDetail;
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }
}
