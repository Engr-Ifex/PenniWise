import { prisma } from '../../config/database';

export const authRepository = {
  findAdminByEmail(email: string) {
    return prisma.adminUser.findUnique({ where: { email } });
  },

  findAdminById(id: string) {
    return prisma.adminUser.findUnique({ where: { id } });
  },

  touchLastLogin(adminId: string) {
    return prisma.adminUser.update({
      where: { id: adminId },
      data: { lastLoginAt: new Date() },
    });
  },

  createSession(data: {
    id: string;
    adminId: string;
    refreshTokenHash: string;
    userAgent?: string;
    ipAddress?: string;
    expiresAt: Date;
  }) {
    return prisma.adminSession.create({ data });
  },

  findSessionById(id: string) {
    return prisma.adminSession.findUnique({ where: { id } });
  },

  rotateSession(id: string, refreshTokenHash: string, expiresAt: Date) {
    return prisma.adminSession.update({
      where: { id },
      data: { refreshTokenHash, expiresAt },
    });
  },

  revokeSession(id: string) {
    return prisma.adminSession.update({
      where: { id },
      data: { revokedAt: new Date() },
    });
  },

  revokeAllSessions(adminId: string) {
    return prisma.adminSession.updateMany({
      where: { adminId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  },

  listActiveSessions(adminId: string) {
    return prisma.adminSession.findMany({
      where: { adminId, revokedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  },
};
