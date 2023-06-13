import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrderDto } from './dto';

@Injectable()
export class OrderService {
  constructor(private prismaService: PrismaService) {}
  // async createOrder(orderDto: OrderEntity, userId: string) {
  //   const seclectInfomationOfOrder = await this.prismaService.getPrisma().order.findUnique({
  //     where: {
  //       id: 1,
  //     },
  //     include: {
  //       orderDetail: {
  //         select: {
  //           eventId: true,
  //           quantity: true,
  //           event: {
  //             select: {
  //               price: true,
  //             },
  //           },
  //         },
  //       },
  //     },
  //   });
  // const createOrderOfUser = await this.prismaService.getPrisma().order.create({
  //   data: {
  //     ...orderDto,
  //     OrderDate: new Date(Date.now()),
  //     totalPrice: Number(orderDto.totalPrice),
  //     userId,
  //   },
  // });
  //   const total = seclectInfomationOfOrder.orderDetail.map(
  //     (item) => item.quantity * Number(item.event.price)
  //   );
  //   const sum = total.reduce((a, b) => a + b);
  //   return sum;
  // }
  async listOrder(orderId: string, userId: string) {
    const getOrder = await this.prismaService.getPrisma().order.findFirst({
      where: {
        userId: userId,
      },
      include: {
        orderDetails: {
          select: {
            id: true,
            quantity: true,
          },
        },
      },
    });
    return getOrder;
  }
}
