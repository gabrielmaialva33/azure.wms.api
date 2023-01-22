import {
  IBaseRepository,
  ListArgs as BaseListArgs,
} from '@/core/interfaces/base-repository.interface';
import { ProductEntity } from '@/modules/product/entities/product.entity';

export namespace IProduct {
  export interface Repository extends IBaseRepository<ProductEntity> {
    softDelete(id: number): Promise<void>;
  }

  export interface ListArgs extends BaseListArgs<ProductEntity> {
    code?: string;
    search?: string;
  }
}
