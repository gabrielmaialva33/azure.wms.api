import { Module } from '@nestjs/common';

import { NestConfigModule } from '@/core/libs/config/onfig.module';
import { OrmModule } from '@/core/libs/orm/orm.module';

@Module({
  imports: [NestConfigModule, OrmModule],
})
export class AppModule {}
