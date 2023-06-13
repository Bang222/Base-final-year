import { Controller, UseGuards } from '@nestjs/common';
import { MyJwtGuard } from '../auth/guard';
import { TripFollowerService } from './tripFollower.service';

@Controller('trip-followers')
@UseGuards(MyJwtGuard)
export class TripFollowerController {
  constructor(private tripFollowerService: TripFollowerService) {}
}
