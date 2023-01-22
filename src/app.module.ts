import { Module } from '@nestjs/common';

import { NestConfigModule } from '@/core/lib/config/onfig.module';
import { OrmModule } from '@/core/lib/orm/orm.module';
import { ProductModule } from '@/modules/product/product.module';

@Module({
  imports: [NestConfigModule, OrmModule, ProductModule],
})
export class AppModule {}
