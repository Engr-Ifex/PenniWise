import { z } from 'zod';

export const createAdminSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['SUPPORT', 'ADMIN', 'SUPER_ADMIN']),
});

export const updateAccountSchema = z.object({
  email: z.string().email().optional(),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string().min(8),
});

export type CreateAdminInput = z.infer<typeof createAdminSchema>;
export type UpdateAccountInput = z.infer<typeof updateAccountSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
