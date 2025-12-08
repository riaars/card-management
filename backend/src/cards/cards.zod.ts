import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const CardIdParamSchema = z.object({
  cardId: z.string(),
});

export class CardIdParamDto extends createZodDto(CardIdParamSchema) {}
