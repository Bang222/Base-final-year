import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO, LoginDTO } from './dto';
import { GoogleAuthGuard } from './guard';

@Controller('auth')
export class AuthController {
  // khi ma auth controllers duoc tao ra thi tu dung auth Service se duoc tao ra
  constructor(private authService: AuthService) {
    // authService.doSomething();
  }

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async handleLogin() {
    return 'bang danh';
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect')
  async googleRedirect(@Req() req, @Res() res) {
    // console.log('googleRedirect');
    const checkUser = await this.authService.validateUser(req.user);
    if (!checkUser) {
      return res.redirect('http://localhost:3000/login');
    }
    const token = checkUser.jwtToken.accessToken;
    const refreshToken = checkUser.refreshToken.refreshToken;
    res.cookie('token', token, { httpOnly: true });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
    });
    return res.redirect('http://localhost:3000/home');
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() registerDTO: RegisterDTO) {
    try {
      return await this.authService.register(registerDTO);
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  @Post('login')
  async login(
    @Body() loginDTO: LoginDTO,
    @Res({ passthrough: true }) response: Response
  ) {
    return await this.authService.login(loginDTO, response);
  }
  @Post('refresh-token')
  async refreshToken(@Res() res, @Req() req) {
    return await this.authService.rqRefreshToken(res, req);
  }

  @Get('logout')
  async logout(@Res() res) {
    res.clearCookie('token');
    res.clearCookie('refreshToken');
    res.clearCookie('connect.sid');
    return res.redirect('http://localhost:3000/');
  }
}
