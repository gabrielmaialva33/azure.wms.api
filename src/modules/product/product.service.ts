import { Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from '@/modules/product/dto';

@Injectable()
export class ProductService {
  paginate() {
    return `This action returns all product`;
  }

  list() {
    return `This action returns all product`;
  }

  get(id: number) {
    return `This action returns a #${id} product`;
  }

  create(data: CreateProductDto) {
    return 'This action adds a new product';
  }

  update(id: number, data: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
