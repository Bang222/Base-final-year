import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewOfUSerDTO } from './dto';

@Injectable()
export class ReviewerService {
  constructor(private prismaService: PrismaService) {}
  async addReviewerContent(
    userId: string,
    tripId: string,
    createReviewerOfUSerDTO: CreateReviewOfUSerDTO
  ) {
    try {
      const findData = await this.prismaService.getPrisma().reviewer.findFirst({
        where: {
          AND: [{ userId: userId }, { tripId: tripId }],
        },
      });
      if (findData === null) {
        throw new ForbiddenException('you are not registered this is Trips');
      }
      const addContentReview = await this.prismaService
        .getPrisma()
        .reviewer.update({
          where: { id: findData.id },
          data: {
            ...createReviewerOfUSerDTO,
            vote: +createReviewerOfUSerDTO.vote,
            anonymous: Boolean(createReviewerOfUSerDTO.anonymous),
          },
        });
      return addContentReview;
    } catch (err) {
      throw new ForbiddenException(err);
    }
  }
}
