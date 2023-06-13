import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { GoogleAuthGuard, MyJwtGuard } from '../auth/guard';
import { CreateStoreDto } from './dto';
import { AuthService } from '../auth/auth.service';

@Controller('store')
@UseGuards(MyJwtGuard)
export class StoreController {
  constructor(private storeService: StoreService) {}
  @Post('create')
  @UsePipes(new ValidationPipe())
  async createStore(@Body() createStore: CreateStoreDto, @Req() req) {
    const userId: string = req.user.id;
    return await this.storeService.create(createStore, userId);
  }
  @Get('detail-tourist')
  async manager(@Req() req) {
    const storeId = req.user.store?.id;
    if (!storeId) {
      return { msg: 'you are not a seller' };
    }
    return await this.storeService.managerTrip(storeId);
  }
}
