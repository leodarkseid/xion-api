import { Module } from '@nestjs/common';
import { XionController } from './xion.controller';
import { XionService } from './xion.service';

@Module({
  controllers: [XionController],
  providers: [XionService]
})
export class XionModule {}
