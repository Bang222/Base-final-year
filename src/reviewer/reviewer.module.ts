import { Module } from '@nestjs/common';
import { ReviewerController } from './reviewer.controller';
import { ReviewerService } from './reviewer.service';

@Module({
  providers: [ReviewerService],
  controllers: [ReviewerController],
})
export class ReviewerModule {}
