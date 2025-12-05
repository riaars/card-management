import { z } from 'zod';

export const CardIdParamSchema = z.object({
  cardId: z.string().uuid(),
});

export type CardIdParamDto = z.infer<typeof CardIdParamSchema>;
