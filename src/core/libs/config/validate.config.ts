import { z } from 'zod';
import { Logger } from '@nestjs/common';

export const ValidateSchema = z.object({
  HOST: z.string().trim().default('localhost'),
  PORT: z
    .string()
    .trim()
    .min(1)
    .default('3333')
    .transform((value) => Number(value)),
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
