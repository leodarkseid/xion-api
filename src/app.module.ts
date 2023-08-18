import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';

import { XionModule } from './xion/xion.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';


@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl:1,
      limit:10,
    }),
    XionModule, ConfigModule.forRoot({isGlobal:true})],
  controllers: [AppController],
  providers:[{
    provide:APP_GUARD,
    useClass:ThrottlerGuard
  }]
})
export class AppModule {}
