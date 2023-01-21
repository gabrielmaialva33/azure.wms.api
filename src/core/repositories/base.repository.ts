import { Model, Modifier, QueryBuilder } from 'objection';

import {
  IBaseRepository,
  ModelAttributes,
} from '@/core/interfaces/base-repository.interface';
import { BaseEntity } from '@/core/entities/base.entity';
import { Logger } from '@nestjs/common';

export class BaseRepository<Entity extends BaseEntity>
  implements IBaseRepository<Entity>
{
  constructor(protected readonly model: typeof BaseEntity) {}

  async create(payload: ModelAttributes<Entity>): Promise<Entity> {
    try {
      return this.model.transaction(
        async (trx) =>
          this.model.query(trx).insert(payload) as unknown as Entity,
      );
    } catch (err) {
      Logger.error(err, 'BaseRepository.create');
      throw err;
    }
  }
}
