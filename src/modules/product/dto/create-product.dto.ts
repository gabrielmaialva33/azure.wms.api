import { z } from '@/core/lib/zod/z';
import { CreateZodDto, isUnique } from '@/core/lib/zod';
import { ProductEntity } from '@/modules/product/entities/product.entity';

export const NewProductSchema = z.object({
  code: z
    .string()
    .min(1)
    .max(255)
    .refine(
      async (v) => isUnique<ProductEntity>(ProductEntity, 'code', v),
      (v) => ({
        message: `Product code ${v} already exists`,
      }),
    ),
  description: z.string().min(1).max(255),
  color: z.string().min(1).max(255),
  grid: z.string().min(1).max(255),
  quantity: z.number().int(),
  length: z.number().int(),

  height: z.number().int().nullable().optional(),
  width: z.number().int().nullable().optional(),
  depth: z.number().int().nullable().optional(),
  component: z.string().min(1).max(255).nullable().optional(),
  brand_code: z.string().min(1).max(255).nullable().optional(),
  receipt: z.string().min(1).max(255).nullable().optional(),
  ean: z.string().min(1).max(255).nullable().optional(),
  level: z.number().int().nullable().optional(),

  control_batch: z.boolean().optional(),
  control_batch_receipt: z.boolean().optional(),
  control_batch_storage: z.boolean().optional(),
  control_batch_separator: z.boolean().optional(),
  control_batch_conference: z.boolean().optional(),

  control_validity: z.boolean().optional(),
  control_validity_receipt: z.boolean().optional(),
  control_validity_storage: z.boolean().optional(),
  control_validity_separator: z.boolean().optional(),
  control_validity_conference: z.boolean().optional(),

  is_active: z.boolean().optional(),
});

export class CreateProductDto extends CreateZodDto(NewProductSchema) {}
