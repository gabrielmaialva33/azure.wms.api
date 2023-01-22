import { BaseRepository } from '@/core/repositories/base.repository';
import { ProductEntity } from '@/modules/product/entities/product.entity';
import { IProduct } from '@/modules/product/product.interface';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { DateTime } from 'luxon';

export class ProductRepository
  extends BaseRepository<ProductEntity>
  implements IProduct.Repository
{
  constructor() {
    super(ProductEntity);
  }

  async softDelete(id: number): Promise<void> {
    try {
      return this.model.transaction(async (trx) => {
        const query = this.model.query(trx);
        await query.patchAndFetchById(id, {
          is_deleted: true,
          deleted_at: DateTime.local().toISO(),
        });
      });
    } catch (err) {
      Logger.error(err, 'ProductRepository.softDelete');
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
