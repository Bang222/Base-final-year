import {
  Body,
  Controller,
  ParseIntPipe,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ReviewerService } from './reviewer.service';
import { CreateReviewOfUSerDTO } from './dto';
import { MyJwtGuard } from '../auth/guard';

@Controller('reviewer')
@UseGuards(MyJwtGuard)
export class ReviewerController {
  constructor(private reviewerService: ReviewerService) {}
  @Put('create')
  async createReviewer(
    @Query('eventId', ParseIntPipe) tripId: string,
    @Body() createReviewerOfUserDTO: CreateReviewOfUSerDTO,
    @Req() rq
  ) {
    const userId = rq.user.id;
    return await this.reviewerService.addReviewerContent(
      userId,
      tripId,
      createReviewerOfUserDTO
    );
  }
}
