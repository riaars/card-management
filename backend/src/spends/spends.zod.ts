import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const CompaniesSpendParamSchema = z.object({
  companyId: z.string(),
});

export const CardsSpendParamSchema = z.object({
  cardId: z.string(),
});

export class CompaniesSpendParamDto extends createZodDto(
  CompaniesSpendParamSchema,
) {}
export class CardsSpendParamDto extends createZodDto(CardsSpendParamSchema) {}
