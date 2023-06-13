import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Req,
  Res,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDTO, LoginDTO, LoginWithGoogleDTO } from './dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}
  async validateUser(loginWithGoogleDTO: LoginWithGoogleDTO) {
    try {
      const user = await this.prismaService.getPrisma().user.findFirst({
        where: {
          email: loginWithGoogleDTO.email,
        },
      });
      if (!user) return undefined;
      delete user.hasPassword;
      const jwtToken = await this.generateAccessToken(
        user.id,
        user.userName,
        user.email
      );
      const refreshToken = await this.generateRefreshToken(
        user.id,
        user.userName,
        user.email
      );
      return { ...user, jwtToken, refreshToken };
    } catch (err) {
      throw new ForbiddenException(err);
    }
  }
  async findUser(id: string | null) {
    try {
      const findUser = await this.prismaService.getPrisma().user.findUnique({
        where: { id: id },
      });
      console.log('findUser of deSerialzers');
      return findUser;
    } catch (err) {
      throw new ForbiddenException(err);
    }
  }
  async register(registerDTO: RegisterDTO) {
    try {
      // generation password to hasedPassword
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(registerDTO.hasPassword, salt);
      const isMatch = await bcrypt.compare(
        registerDTO.hasPassword,
        hashedPassword
      );
      const createUser = await this.prismaService.getPrisma().user.create({
        data: {
          ...registerDTO,
          sex: registerDTO.sex,
          DateOfBirth: new Date(registerDTO.DateOfBirth),
          hasPassword: hashedPassword,
        },
      });
      return await this.generateAccessToken(
        createUser.id,
        createUser.userName,
        createUser.email
      );
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }
  async login(loginDTO: LoginDTO, response) {
    try {
      const user = await this.prismaService.getPrisma().user.findFirst({
        where: {
          AND: [
            {
              OR: [
                { userName: loginDTO.userName },
                { email: loginDTO.email },
                { phone: loginDTO.phone },
              ],
            },
          ],
        },
      });
      if (!user) {
        throw new ForbiddenException('user not found');
      }
      const passwordMatchEd = await bcrypt.compare(
        loginDTO.hasPassword,
        user.hasPassword
      );
      delete user.hasPassword;
      if (!passwordMatchEd) {
        throw new ForbiddenException('Incorrect Passwords');
      }
      const refreshToken: { refreshToken: string } =
        await this.generateRefreshToken(user.id, user.userName, user.email);
      const token: { accessToken: string } = await this.generateAccessToken(
        user.id,
        user.userName,
        user.email
      );
      const cookieRefreshToken = response.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        path: '/',
        sameSite: 'strict',
      });
      const cookieJWT = response.cookie('token', token, {
        httpOnly: true,
        secure: false,
        path: '/',
        sameSite: 'strict',
        expiresIn: '365d',
      });
      return { token, refreshToken };
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
  async rqRefreshToken(@Req() req, @Res() res) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) throw new ForbiddenException('authentication');
    const verify = await this.jwtService.verify(
      refreshToken,
      this.configService.get('RefreshToken')
    );
    if (!verify) {
      throw new BadRequestException('err');
    }
    const user = await this.prismaService.getPrisma().user.findFirst({
      where: { id: refreshToken.userId },
    });
    const newAccessToken = await this.generateAccessToken(
      user.id,
      user.userName,
      user.email
    );
    const newRefeshToken = await this.generateAccessToken(
      user.id,
      user.userName,
      user.email
    );
    res.cookie('refreshToken', newRefeshToken, {
      httpOnly: true,
      secure: false,
      path: '/',
      sameSite: 'strict',
    });
    res.cookie('token', newAccessToken, {
      httpOnly: true,
      secure: false,
      path: '/',
      sameSite: 'strict',
    });
    return { accessToken: newAccessToken, refreshToken: newRefeshToken };
  }
  async generateRefreshToken(
    userId: string,
    userName: string,
    email: string
  ): Promise<{ refreshToken: string }> {
    const payload = {
      sub: userId,
      userName,
      email,
    };
    const jwtString = await this.jwtService.signAsync(payload, {
      expiresIn: '365d',
      secret: this.configService.get('RefreshToken'),
    });
    return {
      refreshToken: jwtString,
    };
  }
  async generateAccessToken(
    userId: string,
    userName: string,
    email: string
  ): Promise<{ accessToken: string }> {
    const payload = {
      sub: userId,
      userName,
      email,
    };
    const jwtString = await this.jwtService.signAsync(payload, {
      expiresIn: '365d',
      secret: this.configService.get('JWT_SECRET'),
    });
    return {
      accessToken: jwtString,
    };
  }

  // async logOut(response) {
  //   return response.cookie('token', '', {
  //     httpOnly: true,
  //     expires: new Date(),
  //   });
  // }
}

// export  = "make public"
