import { DateTime } from 'luxon';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { IProduct } from '@/modules/product/product.interface';
import { ProductRepository } from '@/modules/product/product.repository';
import { ProductEntity } from '@/modules/product/entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '@/modules/product/dto';
import { PaginationObject } from '@/core/lib/pagination';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  paginate({ code, search, ...args }: IProduct.PaginateArgs) {
    return this.productRepository
      .paginate(args, (qb) => {
        if (code) qb.modify(ProductEntity.modifiers.scope_code, code);
        if (search) qb.modify(ProductEntity.modifiers.scope_search, search);
      })
      .then(({ total, data }) =>
        PaginationObject<ProductEntity>({
          total,
          data,
          page: args.page,
          per_page: args.per_page,
          route: '/products',
        }),
      );
  }

  async list({ code, search, ...args }: IProduct.ListArgs) {
    return this.productRepository.list(args, (qb) => {
      if (code) qb.modify(ProductEntity.modifiers.scope_code, code);
      if (search) qb.modify(ProductEntity.modifiers.scope_search, search);
    });
  }

  async get(id: number) {
    const product = await this.productRepository.get(id);
    if (!product)
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);

    return product;
  }

  async create(data: CreateProductDto) {
    return this.productRepository.create(data);
  }

  update(id: number, data: UpdateProductDto) {
    return this.get(id).then(async (product) => {
      await product.$query().patch(data);
      return this.get(id);
    });
  }

  remove(id: number) {
    return this.get(id).then(async (product) => {
      await product
        .$query()
        .patch({ is_deleted: true, deleted_at: DateTime.local().toISO() });
    });
  }
}
