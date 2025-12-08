import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const CompaniesParamSchema = z.object({
  companyId: z.string(),
});

export class CompaniesParamDto extends createZodDto(CompaniesParamSchema) {}
