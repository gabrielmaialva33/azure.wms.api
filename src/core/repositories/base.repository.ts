import { Id, Modifier, QueryBuilder } from 'objection';

import {
  IBaseRepository,
  ListArgs,
  ModelAttributes,
} from '@/core/interfaces/base-repository.interface';
import { BaseEntity } from '@/core/entities/base.entity';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';

export class BaseRepository<Entity extends BaseEntity>
  implements IBaseRepository<Entity>
{
  constructor(protected readonly model: typeof BaseEntity) {}

  async list(
    { column, order }: ListArgs<Entity>,
    modifiers?: Modifier<QueryBuilder<Entity>>,
  ): Promise<Entity[]> {
    try {
      return this.model.transaction(async (trx) => {
        const query = this.model.query(trx);
        if (modifiers) query.modify(modifiers);
        if (column && order) query.orderBy(String(column), order);
        query.orderBy('created_at', 'desc');
        return query as unknown as Entity[];
      });
    } catch (err) {
      Logger.error(err, 'BaseRepository.list');
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async get(
    id: Id,
    modifiers?: Modifier<QueryBuilder<Entity>>,
  ): Promise<Entity> {
    try {
      return this.model.transaction(async (trx) => {
        const query = this.model.query(trx);
        if (modifiers) query.modify(modifiers);
        return query.findById(id) as unknown as Entity;
      });
    } catch (err) {
      Logger.error(err, 'BaseRepository.get');
      throw err;
    }
  }

  async getBy(
    args: { [k in keyof Entity]?: Entity[k] },
    modifiers?: Modifier<QueryBuilder<Entity>>,
  ): Promise<Entity> {
    try {
      return this.model.transaction(async (trx) => {
        const query = this.model.query(trx);
        if (modifiers) query.modify(modifiers);
        return query.findOne(args) as unknown as Entity;
      });
    } catch (err) {
      Logger.error(err, 'BaseRepository.getBy');
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(payload: ModelAttributes<Entity>): Promise<Entity> {
    try {
      return this.model.transaction(
        async (trx) =>
          this.model.query(trx).insert(payload) as unknown as Entity,
      );
    } catch (err) {
      Logger.error(err, 'BaseRepository.create');
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createMany(
    payload: ModelAttributes<Entity>[],
    modifiers?: Modifier<QueryBuilder<Entity>>,
  ): Promise<Entity[]> {
    try {
      return this.model.transaction(async (trx) => {
        const query = this.model.query(trx);
        if (modifiers) query.modify(modifiers);
        return query.insert(payload) as unknown as Entity[];
      });
    } catch (err) {
      Logger.error(err, 'BaseRepository.createMany');
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async save(
    id: Id,
    payload: ModelAttributes<Entity>,
    modifiers?: Modifier<QueryBuilder<Entity>>,
  ): Promise<Entity> {
    try {
      return this.model.transaction(async (trx) => {
        const query = this.model.query(trx);
        if (modifiers) query.modify(modifiers);
        return query.patchAndFetchById(id, payload) as unknown as Entity;
      });
    } catch (err) {
      Logger.error(err, 'BaseRepository.save');
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async destroy(
    id: Id,
    modifiers?: Modifier<QueryBuilder<Entity>>,
  ): Promise<void> {
    try {
      return (await this.model.transaction(async (trx) => {
        const query = this.model.query(trx);
        if (modifiers) query.modify(modifiers);
        return query.deleteById(id);
      })) as unknown as void;
    } catch (err) {
      Logger.error(err, 'BaseRepository.destroy');
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async pluckBy(
    key: keyof Entity,
    modifiers?: Modifier<QueryBuilder<Entity>>,
  ): Promise<any[]> {
    try {
      return this.model.transaction(async (trx) => {
        const query = this.model.query(trx).select(key);
        if (modifiers) query.modify(modifiers);
        return query as unknown as any[];
      });
    } catch (err) {
      Logger.error(err, 'BaseRepository.pluckBy');
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async attach(entity: Entity, relation: string, ids: string[]): Promise<void> {
    try {
      return this.model.transaction(async (trx) => {
        return entity
          .$relatedQuery(relation, trx)
          .for(entity.id)
          .relate(ids) as unknown as void;
      });
    } catch (err) {
      Logger.error(err, 'BaseRepository.attach');
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async sync(entity: Entity, relation: string, ids: string[]): Promise<void> {
    try {
      return this.model.transaction(async (trx) => {
        return entity
          .$relatedQuery(relation, trx)
          .for(entity.id)
          .unrelate()
          .then(() =>
            entity.$relatedQuery(relation, trx).for(entity.id).relate(ids),
          )
          .then(() => undefined) as unknown as void;
      });
    } catch (err) {
      Logger.error(err, 'BaseRepository.sync');
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
