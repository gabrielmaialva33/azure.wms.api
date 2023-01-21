import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateProductDto, UpdateProductDto } from '@/modules/product/dto';
import { ProductService } from '@/modules/product/product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('paginate')
  paginate() {
    return this.productService.paginate();
  }

  @Get()
  list() {
    return this.productService.list();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.get(+id);
  }

  @Post()
  create(@Body() data: CreateProductDto) {
    return this.productService.create(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
