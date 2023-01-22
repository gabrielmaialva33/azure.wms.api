import { Knex } from 'knex';
import { ProductEntity } from '@/modules/product/entities/product.entity';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(ProductEntity.tableName, (table) => {
    table.increments('id').primary();

    table.string('code').notNullable().unique();
    table.text('description').notNullable();
    table.string('color').notNullable();
    table.string('grid').notNullable();
    table.integer('quantity').notNullable();
    table.integer('length').notNullable();

    table.integer('height');
    table.integer('width');
    table.integer('depth');

    table.string('component');
    table.string('brand_code');
    table.string('receipt');
    table.string('ean');
    table.integer('level');

    table.boolean('control_batch').defaultTo(false);
    table.boolean('control_batch_receipt').defaultTo(false);
    table.boolean('control_batch_storage').defaultTo(false);
    table.boolean('control_batch_separator');
    table.boolean('control_batch_conference').defaultTo(false);

    table.boolean('control_validity').defaultTo(false);
    table.boolean('control_validity_receipt').defaultTo(false);
    table.boolean('control_validity_storage').defaultTo(false);
    table.boolean('control_validity_separator').defaultTo(false);
    table.boolean('control_validity_conference').defaultTo(false);

    table.boolean('is_active').defaultTo(true);

    table.boolean('is_deleted').defaultTo(false);
    table.timestamps(true, true);
    table.timestamp('deleted_at');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(ProductEntity.tableName);
}
