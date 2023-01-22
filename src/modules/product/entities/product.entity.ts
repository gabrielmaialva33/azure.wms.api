import { BaseEntity } from '@/core/entities/base.entity';
import { DateTime } from 'luxon';
import { AnyQueryBuilder, Pojo } from 'objection';

export class ProductEntity extends BaseEntity {
  static tableName = 'products';

  /**
   * ------------------------------------------------------
   * Columns
   * ------------------------------------------------------
   */
  code: string;
  description: string;
  color: string;
  grid: string;
  quantity: number;
  length: number;

  height?: number;
  width?: number;
  depth?: number;
  component?: string;
  brand_code?: string;
  receipt?: string;
  ean?: string;
  level?: number;

  control_batch?: boolean;
  control_batch_receipt?: boolean;
  control_batch_storage?: boolean;
  control_batch_separator?: boolean;
  control_batch_conference?: boolean;

  control_validity?: boolean;
  control_validity_receipt?: boolean;
  control_validity_storage?: boolean;
  control_validity_separator?: boolean;
  control_validity_conference?: boolean;

  is_active: boolean;

  /**
   * ------------------------------------------------------
   * Hooks
   * ------------------------------------------------------
   */
  async $beforeUpdate() {
    this.updated_at = DateTime.local().toISO();
  }

  /**
   * ------------------------------------------------------
   * Query Scopes
   * ------------------------------------------------------
   */
  static modifiers = {
    scope_code: (query: AnyQueryBuilder, code: string) =>
      query.where('code', code),
    scope_search: (query: AnyQueryBuilder, search: string) => {
      const { ref } = ProductEntity;
      query.where(function () {
        for (const field of ProductEntity.searchFields)
          this.orWhere(ref(field), 'like', `%${search}%`);
      });
    },
  };

  /**
   * ------------------------------------------------------
   * Misc
   * ------------------------------------------------------
   */
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['code', 'description', 'color', 'grid', 'quantity', 'length'],

      properties: {
        id: { type: 'integer' },
        code: { type: 'string', minLength: 1, maxLength: 255 },
        description: { type: 'string', minLength: 1, maxLength: 255 },
        color: { type: 'string', minLength: 1, maxLength: 255 },
        grid: { type: 'string', minLength: 1, maxLength: 255 },
        quantity: { type: 'integer' },
        length: { type: 'integer' },

        height: { type: ['integer', 'null'] },
        width: { type: ['integer', 'null'] },
        depth: { type: ['integer', 'null'] },
        component: { type: ['string', 'null'], minLength: 1, maxLength: 255 },
        brand_code: { type: ['string', 'null'], minLength: 1, maxLength: 255 },
        receipt: { type: ['string', 'null'], minLength: 1, maxLength: 255 },
        ean: { type: ['string', 'null'], minLength: 1, maxLength: 255 },
        level: { type: ['integer', 'null'] },

        control_batch: { type: 'boolean' },
        control_batch_receipt: { type: 'boolean' },
        control_batch_storage: { type: 'boolean' },
        control_batch_separator: { type: 'boolean' },
        control_batch_conference: { type: 'boolean' },

        control_validity: { type: 'boolean' },
        control_validity_receipt: { type: 'boolean' },
        control_validity_storage: { type: 'boolean' },
        control_validity_separator: { type: 'boolean' },
        control_validity_conference: { type: 'boolean' },

        is_active: { type: 'boolean' },
        is_deleted: { type: 'boolean' },
        created_at: { type: 'string' },
        updated_at: { type: 'string' },
        deleted_at: { type: ['string', 'null'] },
      },
    };
  }

  static searchFields = [
    'code',
    'description',
    'color',
    'grid',
    'quantity',
    'length',
  ];

  /**
   * ------------------------------------------------------
   * Serializer
   * ------------------------------------------------------
   */
  $formatJson(json: Pojo) {
    json = super.$formatJson(json);
    return json;
  }
}
