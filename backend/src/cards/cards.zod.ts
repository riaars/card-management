import { z } from 'zod';

export const CardIdParamSchema = z.object({
  id: z.string(),
});

export type CardIdParamDto = z.infer<typeof CardIdParamSchema>;
