import { Module } from '@nestjs/common';
import { TripFollowerService } from './tripFollower.service';
import { TripFollowerController } from './tripFollower.controller';

@Module({
  providers: [TripFollowerService],
  controllers: [TripFollowerController],
})
export class TripFollowerModule {}
