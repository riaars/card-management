import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const TransactionsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  pageSize: z.coerce.number().int().min(1).max(100).optional().default(20),
  search: z.string().optional(),
  limit: z.coerce.number().int().min(1).optional().default(5),
});

export const TransactionsParamSchema = z.object({
  cardId: z.string(),
});

export class TransactionsQueryDto extends createZodDto(
  TransactionsQuerySchema,
) {}
export class TransactionsParamDto extends createZodDto(
  TransactionsParamSchema,
) {}
