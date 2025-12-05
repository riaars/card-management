import { z } from 'zod';

export const DashboardQuerySchema = z.object({
  companyId: z.string().uuid(),
});

export type DashboardQueryDto = z.infer<typeof DashboardQuerySchema>;
