export enum Permission {
  USERS_READ = 'users:read',
  USERS_WRITE = 'users:write',
  KYC_REVIEW = 'kyc:review',
  TRANSACTIONS_READ = 'transactions:read',
  TRANSACTIONS_REVERSE = 'transactions:reverse',
  ADMINS_MANAGE = 'admins:manage',
}

const ROLE_PERMISSIONS: Record<string, Permission[]> = {
  SUPPORT: [Permission.USERS_READ, Permission.TRANSACTIONS_READ],
  ADMIN: [
    Permission.USERS_READ,
    Permission.USERS_WRITE,
    Permission.KYC_REVIEW,
    Permission.TRANSACTIONS_READ,
  ],
  SUPER_ADMIN: Object.values(Permission),
};

export function roleHasPermission(
  role: string,
  permission: Permission,
): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}
