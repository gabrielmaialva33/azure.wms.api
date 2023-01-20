import { z } from 'zod';
import { Logger } from '@nestjs/common';

export const ValidateSchema = z.object({
  // APP
  HOST: z.string().trim().default('localhost'),
  PORT: z
    .string()
    .trim()
    .min(1)
    .default('3333')
    .transform((value) => Number(value)),
  // DB
  DB_HOST: z.string().trim().default('localhost'),
  DB_PORT: z.string().trim().default('1433'),
  DB_USERNAME: z.string().trim().default('sa'),
  DB_PASSWORD: z.string().trim().default('123456'),
  DB_NAME: z.string().trim().default('wms'),
  DB_SSL: z.string().trim().default('false'),
  DB_DEBUG: z
    .string()
    .trim()
    .default('false')
    .transform((value) => value === 'true'),
});

export function validate(config: Record<string, unknown>) {
  const result: any = ValidateSchema.safeParse(config);

  if (!result.success) {
    for (const { message, path } of result.error.issues)
      Logger.error(message, path.join('.'));
    process.exit(1);
  }

  return result.data;
}
