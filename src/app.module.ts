import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { XionModule } from './xion/xion.module';


@Module({
  imports: [XionModule],
  controllers: [AppController],
})
export class AppModule {}
