import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  Query,
} from '@nestjs/common';

import { CreateProductDto, UpdateProductDto } from '@/modules/product/dto';
import { ProductService } from '@/modules/product/product.service';
import { ModelProps } from 'objection';
import { ProductEntity } from '@/modules/product/entities/product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('paginate')
  paginate() {
    return this.productService.paginate();
  }

  @Get()
  list(
    @Query('code') code: string,
    @Query('search') search: string,
    @Query('column') sort: ModelProps<ProductEntity>,
    @Query('order') order: 'asc' | 'desc',
  ) {
    return this.productService.list({
      code,
      search,
      sort,
      order,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.get(+id);
  }

  @Post()
  create(@Body() data: CreateProductDto) {
    return this.productService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
