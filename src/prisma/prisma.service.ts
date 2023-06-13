// import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
// import { PrismaClient } from '@prisma/client';
//
// @Injectable()
// export class PrismaService extends PrismaClient implements OnModuleInit {
//   async onModuleInit() {
//     await this.$connect();
//   }
//   async enableShutdownHooks(app: INestApplication) {
//     this.$on('beforeExit', async () => await app.close());
//   }
// }
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService {
  private prisma: PrismaClient;
  private prismaSlave: PrismaClient;

  constructor(private configService: ConfigService) {
    this.prisma = new PrismaClient();
    this.prismaSlave = new PrismaClient({
      datasources: {
        db: {
          url: configService.get('DATABASE_URL_Replication'),
        },
      },
    });
  }

  getPrisma(): PrismaClient {
    return this.prisma;
  }
  getPrismaSlave(): PrismaClient {
    return this.prismaSlave;
  }
}
