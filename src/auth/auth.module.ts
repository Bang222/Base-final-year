import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';
import { PrismaService } from '../prisma/prisma.service';
import { GoogleStrategy } from './strategy/google.strategy';
import { SessionSerializer } from './guard/Serializer';
import { PassportModule } from '@nestjs/passport';
import { TouristService } from '../tourist/tourist.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    JwtStrategy,
    GoogleStrategy,
    SessionSerializer,
    TouristService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
