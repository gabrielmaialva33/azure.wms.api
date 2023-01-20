import { Model, ModelOptions, Pojo, QueryContext } from 'objection';

export class BaseEntity extends Model {
  static idColumn = 'id';

  /**
   * ------------------------------------------------------
   * Columns
   * ------------------------------------------------------
   */
  readonly id!: string;
  is_deleted: boolean;
  readonly created_at: string;
  updated_at: string;
  deleted_at?: string;

  /**
   * ------------------------------------------------------
   * Hooks
   * ------------------------------------------------------
   */
  async $beforeInsert(query: QueryContext) {
    super.$beforeInsert(query);
  }

  async $beforeUpdate(opt: ModelOptions, query: QueryContext) {
    super.$beforeUpdate(opt, query);
  }

  /**
   * ------------------------------------------------------
   * Base Serializer
   * ------------------------------------------------------
   */
  $formatJson(json: Pojo) {
    json = super.$formatJson(json);
    return json;
  }
}
