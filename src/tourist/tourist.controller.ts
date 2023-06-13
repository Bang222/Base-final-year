import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MyJwtGuard } from '../auth/guard';
import { TouristService } from './tourist.service';
import { CartDto, CreateTourist } from './dto';
import { AuthService } from '../auth/auth.service';
@Controller('tourist')
export class TouristController {
  constructor(
    private touristService: TouristService,
    private authService: AuthService
  ) {}
  @UseGuards(MyJwtGuard)
  @Post('create')
  @UsePipes(new ValidationPipe())
  async createTour(@Body() createTourist: CreateTourist, @Req() req) {
    try {
      const storeId: string = await req.user.store?.id;
      if (!storeId) {
        return 'Register store to create Tourist';
      }
      return await this.touristService.createTour(createTourist, storeId);
    } catch (error) {
      // throw new ForbiddenException('Register store to create Tourist');
      throw new ForbiddenException(error);
    }
  }
  @Get('view')
  async getAllToursView(@Req() req) {
    return await this.touristService.listTours();
  }
  // @Get('all')
  // async getAllTours1(@Req() req) {
  //   return await this.touristService.listTours();
  // }
  @UseGuards(MyJwtGuard)
  @Get('all')
  async getAllTours(@Req() req) {
    return await this.touristService.listTours();
  }
  @UseGuards(MyJwtGuard)
  @Post('cart')
  async addToCart(@Req() rq, @Body() cartDto: CartDto) {
    const userId = await rq.user.id;
    return await this.touristService.createCart(cartDto, userId);
  }
  @UseGuards(MyJwtGuard)
  @Get('checkout')
  async checkout(@Req() rq) {
    const userID = rq.user.id;
    return await this.touristService.checkoutCart(userID);
  }
}
