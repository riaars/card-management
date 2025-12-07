import { z } from 'zod';

export const DashboardQuerySchema = z.object({
  companyId: z.string(),
});

export type DashboardQueryDto = z.infer<typeof DashboardQuerySchema>;
