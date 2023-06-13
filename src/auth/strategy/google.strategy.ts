import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private prismaService: PrismaService,
    private authService: AuthService,
    private configService: ConfigService
  ) {
    super({
      secret: configService.get('googleSecret'),
      jwtOptions: {
        expiresIn: '5m',
      },
      clientID: configService.get('clientID'),
      clientSecret: configService.get('clientSecret'),
      callbackURL: configService.get('callbackURL'),
      scope: ['email', 'profile'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback
  ): Promise<any> {
    const user = { email: profile.emails[0].value };
    // console.log('google');
    done(null, user);
  }
}
