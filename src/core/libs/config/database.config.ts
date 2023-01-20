import 'dotenv/config';

import { Knex } from 'knex';
import { registerAs } from '@nestjs/config';
import { ValidateSchema } from '@/core/libs/config/validate.config';

const env = ValidateSchema.parse(process.env);

export const DatabaseConfig = {
  client: 'mssql',
  connection: {
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    encrypt: env.DB_SSL === 'true',
    debug: env.DB_DEBUG,
    migrations: {
      tableName: 'knex_migrations',
      directory: `${process.cwd()}/src/database/migrations`,
    },
    seeds: {
      directory: `${process.cwd()}/src/database/seeds`,
    },
  },
} as Knex.Config<Knex.MsSqlConnectionConfig>;

export const database = registerAs('database', () => DatabaseConfig);
