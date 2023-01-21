import { Module } from '@nestjs/common';

import { ProductService } from '@/modules/product/product.service';
import { ProductController } from '@/modules/product/product.controller';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
