import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CartDto, CreateTourist } from './dto';

@Injectable()
export class TouristService {
  constructor(private prismaService: PrismaService) {}
  public async createTour(createTourist: CreateTourist, storeId: string) {
    try {
      if (new Date(Date.now()) > new Date(createTourist.lastRegisterDate)) {
        return 'date can not smallness now';
      }
      const createtrip = await this.prismaService.getPrisma().trip.create({
        data: {
          ...createTourist,
          price: +createTourist.price,
          quantity: +createTourist.quantity,
          phone: createTourist.phone,
          startDate: new Date(createTourist.startDate),
          endDate: new Date(createTourist.endDate),
          lastRegisterDate: new Date(createTourist.lastRegisterDate),
          storeId,
        },
      });
      const createFollower = await this.prismaService
        .getPrisma()
        .followerOfTrip.create({
          data: {
            tripId: createtrip.id,
            storeId: storeId,
          },
        });
      return createtrip;
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }
  async getATourist() {}
  async listTours() {
    const getAllTours = await this.prismaService.getPrisma().trip.findMany({
      where: {
        isActive: true,
      },
    });
    return getAllTours;
  }
  async createCart(cartDto: CartDto, userId: string) {
    try {
      const fromDb = await this.prismaService.getPrisma().cart.findFirst({
        where: {
          AND: [
            { userId: userId },
            { tripId: cartDto.tripId },
            { isActive: true },
          ],
        },
        include: {
          trip: {},
        },
      });
      const checkToRegisterTour = await this.prismaService
        .getPrisma()
        .trip.findFirst({
          where: {
            id: cartDto.tripId,
          },
          select: {
            quantity: true,
            lastRegisterDate: true,
            isActive: true,
          },
        });
      if (!checkToRegisterTour) {
        return { msg: 'can not found trip' };
      }
      if (checkToRegisterTour.quantity < cartDto.quantity) {
        return {
          msg: 'not enough quantity',
          quantityOftrip: checkToRegisterTour.quantity,
        };
      }
      if (checkToRegisterTour.lastRegisterDate < new Date(Date.now())) {
        return { msg: 'het han' };
      }
      if (fromDb === null && checkToRegisterTour.isActive === true) {
        const create = await this.prismaService.getPrisma().cart.create({
          data: {
            userId: userId,
            tripId: cartDto.tripId,
            quantity: +cartDto.quantity,
          },
        });
        return create;
      } else if (fromDb !== null && checkToRegisterTour.isActive === true) {
        const updateQuantity = await this.prismaService
          .getPrisma()
          .cart.updateMany({
            where: {
              AND: [{ userId: userId }, { tripId: cartDto.tripId }],
            },
            data: {
              quantity: +cartDto.quantity,
            },
          });
        return updateQuantity;
      }
    } catch (error) {
      return new ForbiddenException(error);
      // throw new ForbiddenException(error);
    }
  }
  async checkoutCart(userId: string) {
    try {
      const myDetailsCart = await this.prismaService.getPrisma().cart.findMany({
        where: { AND: [{ userId: userId, isActive: true }] },
        include: {
          trip: {},
        },
      });
      for (const x of myDetailsCart) {
        const checkConditionOfTrip = await this.prismaService
          .getPrisma()
          .trip.findFirst({
            where: { id: x.tripId },
          });
        if (checkConditionOfTrip.quantity < x.quantity) {
          return 'not enough quantity you need please decrease quantity';
        }
      }
      const total = myDetailsCart.map(
        (item) => item.quantity * +item.trip.price
      );
      const sum = total.reduce((a, b) => a + b);
      const createOrderOfUser = await this.prismaService
        .getPrisma()
        .order.create({
          data: {
            orderDate: new Date(Date.now()),
            totalPrice: sum,
            userId,
          },
        });
      for (const x of myDetailsCart) {
        const createOrderDetail = await this.prismaService
          .getPrisma()
          .orderDetail.create({
            data: {
              quantity: x.quantity,
              tripId: x.tripId,
              orderId: createOrderOfUser.id,
            },
          });
        const checkConditionOfTrip = await this.prismaService
          .getPrisma()
          .trip.findFirst({
            where: { id: x.tripId },
          });
        const updateQuantityOftrip = await this.prismaService
          .getPrisma()
          .trip.update({
            where: { id: x.tripId },
            data: {
              quantity: checkConditionOfTrip.quantity - x.quantity,
            },
          });
        const findIdOfFollwer = await this.prismaService
          .getPrisma()
          .followerOfTrip.findFirst({
            where: {
              AND: [{ tripId: x.tripId }, { storeId: x.trip.storeId }],
            },
          });
        const addUserInFollwer = await this.prismaService
          .getPrisma()
          .followerOfTrip.update({
            where: { id: findIdOfFollwer.id },
            data: {
              user: {
                connect: {
                  id: userId,
                },
              },
            },
          });
        const createReview = await this.prismaService
          .getPrisma()
          .reviewer.create({
            data: {
              tripId: x.tripId,
              userId: userId,
            },
          });
        if (
          updateQuantityOftrip.quantity === 0 ||
          updateQuantityOftrip.lastRegisterDate < new Date(Date.now())
        ) {
          const UpdateData = await this.prismaService.getPrisma().trip.update({
            where: { id: x.tripId },
            data: {
              status: 'Finished',
            },
          });
        }
      }
      const deleteCart = await this.prismaService.getPrisma().cart.updateMany({
        where: {
          userId: userId,
        },
        data: {
          isActive: false,
        },
      });
      return myDetailsCart;
    } catch (error) {
      throw new ForbiddenException('cart null');
    }
  }
}
