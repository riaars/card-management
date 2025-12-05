import { Injectable } from '@nestjs/common';
import type { DashboardQueryDto } from './dashboard.zod';
import { DashboardQuerySchema } from './dashboard.zod';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';

@Injectable()
export class DashboardQueryPipe extends ZodValidationPipe<DashboardQueryDto> {
  constructor() {
    super(DashboardQuerySchema);
  }
}
