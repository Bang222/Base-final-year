import { Module } from '@nestjs/common';
import { TouristService } from './tourist.service';
import { TouristController } from './tourist.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [TouristService],
  controllers: [TouristController],
  exports: [TouristService],
})
export class TouristModule {}
