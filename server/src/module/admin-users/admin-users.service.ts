import { adminUsersRepository } from './admin-users.repository';
import { hashPassword, comparePassword } from '../../utils/password';
import { ConflictError, UnauthorizedError } from '../../utils/appError';
import type {
  CreateAdminInput,
  UpdateAccountInput,
  ChangePasswordInput,
} from './admin-users.validation';

export function listAdmins() {
  return adminUsersRepository.list();
}

export async function createAdmin(input: CreateAdminInput) {
  const existing = await adminUsersRepository.findByEmail(input.email);
  if (existing)
    throw new ConflictError('An admin with this email already exists');

  const passwordHash = await hashPassword(input.password);
  return adminUsersRepository.create({
    email: input.email,
    passwordHash,
    role: input.role,
  });
}

export function deactivateAdmin(id: string) {
  return adminUsersRepository.deactivate(id);
}

export function updateAccount(id: string, input: UpdateAccountInput) {
  return adminUsersRepository.updateAccount(id, input);
}

export async function changePassword(id: string, input: ChangePasswordInput) {
  const admin = await adminUsersRepository.findById(id);
  const matches = await comparePassword(
    input.currentPassword,
    admin.passwordHash,
  );
  if (!matches) throw new UnauthorizedError('Current password is incorrect');

  const passwordHash = await hashPassword(input.newPassword);
  await adminUsersRepository.updatePassword(id, passwordHash);
}
