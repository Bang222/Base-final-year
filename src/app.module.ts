import { Module } from '@nestjs/common';
// import { CacheModule } from '@nestjs/cache-manager';
// import type { RedisClientOptions } from 'redis';
// import * as redisStore from 'cache-manager-redis-store';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from './store/store.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { TouristModule } from './tourist/tourist.module';
import { TripFollowerModule } from './tripFollowers/tripFollower.module';
import { OrderModule } from './order/order.module';
import { OrderDetailModule } from './orderDetail/orderDetail.module';
import { ReviewerModule } from './reviewer/reviewer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   replication: {
    //     master: {
    //       host: 'postgresql-master',
    //       port: 5432,
    //       username: process.env.USERNAME,
    //       password: process.env.PASSWORD,
    //       database: process.env.DATABASE,
    //     },
    //     slaves: [
    //       {
    //         host: 'postgresql-slave',
    //         port: 5433,
    //         username: process.env.USERNAME,
    //         password: process.env.PASSWORD,
    //         database: process.env.DATABASE,
    //       },
    //     ],
    //   },
    //   synchronize: true,
    //   autoLoadEntities: true,
    // }),
    // CacheModule.register<RedisClientOptions>({
    //   isGlobal: true,
    //   store: redisStore,
    //   host: process.env.REDIS_HOST,
    //   port: process.env.REDIS_PORT,
    // }),
    AuthModule,
    StoreModule,
    PrismaModule,
    UserModule,
    TouristModule,
    TripFollowerModule,
    OrderModule,
    OrderDetailModule,
    ReviewerModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
