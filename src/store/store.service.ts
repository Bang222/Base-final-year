import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStoreDto } from './dto';

@Injectable()
export class StoreService {
  constructor(private prismaService: PrismaService) {}
  async create(createStore: CreateStoreDto, userId: string) {
    try {
      const store = await this.prismaService.getPrisma().store.create({
        data: {
          ...createStore,
          userId,
        },
      });
      const updateRole = await this.prismaService.getPrisma().user.update({
        where: {
          id: userId,
        },
        data: {
          roles: ['USER', 'SELLER'],
        },
      });
      return store;
    } catch (err) {
      throw new ForbiddenException('user have been store: ' + userId);
    }
  }
  async managerTrip(storeId: string) {
    try {
      const getAllInfomationInStoreOfUser = await this.prismaService
        .getPrisma()
        .store.findUnique({
          where: {
            id: storeId,
          },
          include: {
            trip: {
              where: {
                isActive: true,
              },
            },
          },
        });
    } catch (err) {
      throw new Error(err);
    }
  }
}
