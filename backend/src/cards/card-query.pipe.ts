import { Injectable } from '@nestjs/common';
import { CardIdParamSchema } from './cards.zod';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import type { CardIdParamDto } from './cards.zod';

@Injectable()
export class CardsQueryPipe extends ZodValidationPipe<CardIdParamDto> {
  constructor() {
    super(CardIdParamSchema);
  }
}
