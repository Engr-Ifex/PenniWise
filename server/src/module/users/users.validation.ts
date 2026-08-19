import { z } from 'zod';

export const updateStatusSchema = z.object({
  status: z.enum(['PENDING_KYC', 'ACTIVE', 'SUSPENDED', 'CLOSED']),
});

export type UpdateStatusInput = z.infer<typeof updateStatusSchema>;
