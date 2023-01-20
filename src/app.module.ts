import { Module } from '@nestjs/common';

import { AppService } from '@/app.service';
import { AppController } from '@/app.controller';

import { NestConfigModule } from '@/core/libs/config/onfig.module';
import { OrmModule } from '@/core/libs/orm/orm.module';

@Module({
  imports: [NestConfigModule, OrmModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
