import { usersRepository } from './users.repository';
import { NotFoundError } from '../../utils/appError';
import type { UpdateStatusInput } from './users.validation';

export function listUsers() {
  return usersRepository.list();
}

export async function getUser(id: string) {
  const user = await usersRepository.findById(id);
  if (!user) throw new NotFoundError('User not found');
  return user;
}

export async function updateUserStatus(id: string, input: UpdateStatusInput) {
  const user = await usersRepository.findById(id);
  if (!user) throw new NotFoundError('User not found');
  return usersRepository.updateStatus(id, input.status);
}
