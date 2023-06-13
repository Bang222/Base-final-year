import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Request as RequestType } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private configService: ConfigService,
    public prismaService: PrismaService
  ) {
    super({
      // token string is added to every rq (axcept login /register
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken([
        (request: any) => {
          return request?.Authentication;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }
  private static async extractJWT(req: RequestType): Promise<string | null> {
    if (req.cookies && 'token' in req.cookies && req.cookies.token.length > 0) {
      console.log(req.cookies.token);
      return req.cookies.token;
    }
    return null;
  }
  async validate(payload: { id: string; userName: string; email: string }) {
    const user = await this.prismaService.getPrisma().user.findUnique({
      where: {
        id: payload.id,
        userName: payload.userName,
      },
      include: {
        store: {
          select: {
            id: true,
          },
        },
      },
    });
    if (!user) {
      return null;
    }
    delete user.hasPassword;
    return user;
  }
}
