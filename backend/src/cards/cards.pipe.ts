import { Injectable } from '@nestjs/common';
import { CardIdParamSchema } from './cards.zod';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import type { CardIdParamDto } from './cards.zod';

@Injectable()
export class CardsParamPipe extends ZodValidationPipe<CardIdParamDto> {
  constructor() {
    super(CardIdParamSchema);
  }
}
