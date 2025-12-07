import { z } from 'zod';

export const TransactionsQuerySchema = z.object({
  cardId: z.string(),
  page: z.coerce.number().int().min(1).optional().default(1),
  pageSize: z.coerce.number().int().min(1).max(100).optional().default(20),
  search: z.string().optional(),
});

export type TransactionsQueryDto = z.infer<typeof TransactionsQuerySchema>;
