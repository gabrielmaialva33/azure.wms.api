import { Id, Modifier, QueryBuilder } from 'objection';

import {
  IBaseRepository,
  ListArgs,
  ModelAttributes,
  PaginateArgs,
} from '@/core/interfaces/base-repository.interface';
import { BaseEntity } from '@/core/entities/base.entity';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';

export class BaseRepository<Entity extends BaseEntity>
  implements IBaseRepository<Entity>
{
  constructor(protected readonly model: typeof BaseEntity) {}

  async paginate(
    args?: PaginateArgs<Entity>,
    modifiers?: Modifier<QueryBuilder<Entity>>,
  ): Promise<{ data: Entity[]; total: number }> {
    try {
      return this.model.transaction(async (trx) => {
        const query = this.model.query(trx);
        if (modifiers) query.modify(modifiers);

        if (args) {
          if (args.sort && args.order)
            query.orderBy(String(args.sort), args.order);
          else query.orderBy('created_at', 'desc');

          if (args.page && args.per_page)
            query.page(args.page - 1, args.per_page);
          else query.page(0, 10);
        }

        const [data, total] = await Promise.all([
          query as unknown as any,
          query.resultSize(),
        ]).then(([{ results, total }]) => [results, total]);

        return { total, data: data as Entity[] };
      });
    } catch (err) {
      Logger.error(err, 'BaseRepository.paginate');
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async list(
    args?: ListArgs<Entity>,
    modifiers?: Modifier<QueryBuilder<Entity>>,
  ): Promise<Entity[]> {
    try {
      return this.model.transaction(async (trx) => {
        const query = this.model.query(trx).whereNot('is_deleted', true);
        if (modifiers) query.modify(modifiers);
        if (args.sort && args.order)
          query.orderBy(String(args.sort), args.order);
        else query.orderBy('created_at', 'desc');
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
        const query = this.model.query(trx).whereNot('is_deleted', true);
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
        const query = this.model.query(trx).whereNot('is_deleted', true);
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
        const query = this.model
          .query(trx)
          .select(key)
          .whereNot('is_deleted', true);
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
