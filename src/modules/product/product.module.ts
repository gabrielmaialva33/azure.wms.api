import { Module } from '@nestjs/common';

import { ProductService } from '@/modules/product/product.service';
import { ProductController } from '@/modules/product/product.controller';
import { ProductRepository } from '@/modules/product/product.repository';

@Module({
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
  exports: [ProductService],
})
export class ProductModule {}
