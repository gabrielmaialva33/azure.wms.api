import { ModelProps, Modifier, QueryBuilder } from 'objection';

import { BaseEntity } from '@/core/entities/base.entity';

export interface IBaseRepository<Entity extends BaseEntity> {
  /**
   * @description List all entities
   * @param {ListArgs<BaseEntity>} args
   * @param {Modifier<QueryBuilder<BaseEntity>>} modifiers
   * @returns {Promise<BaseEntity[]>}
   * @memberof IBaseRepository
   * @example
   * const entities = await this.repository.list({ sort: 'id', order: 'asc'});
   * // returns [{ id: 1, name: 'John' }, { id: 2, name: 'Doe' }]
   */
  list(
    args: ListArgs<Entity>,
    modifiers?: Modifier<QueryBuilder<Entity>>,
  ): Promise<Entity[]>;

  /**
   * @description Get entity by id
   * @param {string} id
   * @param {Modifier<QueryBuilder<BaseEntity>>} modifiers
   * @returns {Promise<BaseEntity>}
   * @memberof IBaseRepository
   * @example
   * const entity = await this.repository.get('1');
   * // returns { id: 1, name: 'John' }
   */
  get(id: string, modifiers?: Modifier<QueryBuilder<Entity>>): Promise<Entity>;

  /**
   * @description Create entity
   * @param {ModelAttributes<BaseEntity>} payload
   * @returns {Promise<BaseEntity>}
   * @memberof IBaseRepository
   * @example
   * const entity = await this.repository.create({ name: 'John' });
   * // returns { id: 1, name: 'John' }
   */
  create(payload: ModelAttributes<Entity>): Promise<Entity>;

  /**
   * @description Save entity
   * @param {BaseEntity} entity
   * @param {ModelAttributes<BaseEntity>} payload
   * @param {Modifier<QueryBuilder<BaseEntity>>} modifiers
   * @returns {Promise<BaseEntity>}
   * @memberof IBaseRepository
   * @example
   * const entity = await this.repository.save(entity, { name: 'Doe' });
   * // returns { id: 1, name: 'John' }
   */
  save(
    entity: Entity,
    payload: ModelAttributes<Entity>,
    modifiers?: Modifier<QueryBuilder<Entity>>,
  ): Promise<Entity>;

  /**
   * @description Destroy entity
   * @param {BaseEntity} entity
   * @param {Modifier<QueryBuilder<BaseEntity>>} modifiers
   * @returns {Promise<void>}
   * @memberof IBaseRepository
   * @example
   * await this.repository.destroy(entity);
   */
  destroy(
    entity: Entity,
    modifiers?: Modifier<QueryBuilder<Entity>>,
  ): Promise<void>;

  /**
   * @description Create many entities
   * @param {ModelAttributes<BaseEntity>[]} payload
   * @param {Modifier<QueryBuilder<BaseEntity>>} modifiers
   * @returns {Promise<BaseEntity[]>}
   * @memberof IBaseRepository
   * @example
   * const entities = await this.repository.createMany([{ name: 'John' }, { name: 'Doe' }]);
   * // returns [{ id: 1, name: 'John' }, { id: 2, name: 'Doe' }]
   */
  createMany(
    payload: ModelAttributes<Entity>[],
    modifiers?: Modifier<QueryBuilder<Entity>>,
  ): Promise<Entity[]>;

  /**
   * @description Get entity by key
   * @param {keyof BaseEntity} key
   * @param {string | number | boolean} value
   * @param {Modifier<QueryBuilder<BaseEntity>>} modifiers
   * @returns {Promise<BaseEntity>}
   * @memberof IBaseRepository
   * @example
   * const entity = await this.repository.getBy('id', 1);
   * // returns { id: 1, name: 'John' }
   */
  getBy(
    key: keyof Entity,
    value: string | number | boolean,
    modifiers?: Modifier<QueryBuilder<Entity>>,
  ): Promise<Entity | undefined>;

  /**
   * @description Get entity by many keys
   * @param { [k in keyof BaseEntity]?: BaseEntity[k] } keys
   @param {Modifier<QueryBuilder<BaseEntity>>} modifiers
   * @returns {Promise<BaseEntity>}
   * @memberof IBaseRepository
   * @example
   * const entity = await this.repository.getByManyKeys({ id: 1, name: 'John' });
   * // returns { id: 1, name: 'John' }
   */
  getBy(
    keys: { [k in keyof Entity]?: Entity[k] },
    modifiers?: Modifier<QueryBuilder<Entity>>,
  ): Promise<Entity | undefined>;

  /**
   * @description Pluck entity by key
   * @param {keyof BaseEntity} key
   * @param {Modifier<QueryBuilder<BaseEntity>>} modifiers
   * @returns {Promise<any>}
   * @memberof IBaseRepository
   * @example
   * const ids = await this.repository.pluckBy('id');
   * // returns ['1', '2' ...]
   */
  pluckBy(
    key: keyof Entity,
    modifiers?: Modifier<QueryBuilder<Entity>>,
  ): Promise<any>;

  /**
   * @description Sync relation
   * @param {BaseEntity} entity
   * @param {string} relation
   * @param {string[]} ids
   * @returns {Promise<void>}
   * @memberof IBaseRepository
   * @example
   * await this.repository.sync(entity, 'roles', ['1', '2']);
   */
  sync(entity: Entity, relation: string, ids: string[]): Promise<void>;

  /**
   * @description Attach relation
   * @param {BaseEntity} entity
   * @param {string} relation
   * @param {string[]} ids
   * @returns {Promise<void>}
   * @memberof IBaseRepository
   * @example
   * await this.repository.attach(entity, 'roles', ['1', '2']);
   */
  attach(entity: Entity, relation: string, ids: string[]): Promise<void>;
}

export type ModelAttributes<T extends BaseEntity> = { [k in keyof T]?: T[k] };

export interface ListArgs<T extends BaseEntity> {
  sort?: ModelProps<T>;
  order?: 'asc' | 'desc';
}
