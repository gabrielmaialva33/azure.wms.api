import { Module } from '@nestjs/common';

import { AppService } from '@/app.service';
import { AppController } from '@/app.controller';

import { NestConfigModule } from '@/core/libs/config/onfig.module';

@Module({
  imports: [NestConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
