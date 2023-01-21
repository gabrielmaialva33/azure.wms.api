import { BaseEntity } from '@/core/entities/base.entity';
import { DateTime } from 'luxon';

export class Product extends BaseEntity {
  static tableName = 'product';

  /**
   * ------------------------------------------------------
   * Columns
   * ------------------------------------------------------
   */
  code: string;
  description: string;
  color: string;
  grid: number;
  quantity: number;
  length: number;

  height?: number;
  width?: number;
  depth?: number;
  component?: string;
  brand_code?: string;

  is_active: boolean;

  /**
   * ------------------------------------------------------
   * Hooks
   * ------------------------------------------------------
   */

  /**
   * ------------------------------------------------------
   * Query Scopes
   * ------------------------------------------------------
   */

  /**
   * ------------------------------------------------------
   * Misc
   * ------------------------------------------------------
   */

  /**
   * ------------------------------------------------------
   * Serializer
   * ------------------------------------------------------
   */
}
