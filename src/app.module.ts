import { Module } from '@nestjs/common';

import { NestConfigModule } from '@/core/lib/config/onfig.module';
import { OrmModule } from '@/core/lib/orm/orm.module';

@Module({
  imports: [NestConfigModule, OrmModule],
})
export class AppModule {}
