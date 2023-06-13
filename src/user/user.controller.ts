import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { MyJwtGuard } from '../auth/guard';

@Controller('users')
@UseGuards(MyJwtGuard)
export class UserController {
  @Get('detail')
  userDetails(@Req() rq) {
    try {
      return rq.user;
    } catch (error) {
      console.log(error);
    }
  }
}
