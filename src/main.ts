import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
import { PrismaClient } from "@prisma/client";

// How to generation module
//   nest g module "name module"
// controllers is where to receive request from client
// controllers will call services to do implementations
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const prisma = new PrismaClient();

  app.use((req, _, next) => {
    req['prisma'] = prisma;
    next();
  });
  //add middleware
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    session({
      secret: 'hahahaha555555',
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60000,
      },
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(cookieParser());
  await app.listen(process.env.PORT || 1005);
}
bootstrap();
