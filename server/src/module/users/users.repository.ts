import { prisma } from '../../config/database';
import type { UserStatus, ConversationState, Prisma } from '@prisma/client';

export const usersRepository = {
  findByWhatsappNumber(whatsappNumber: string) {
    return prisma.user.findUnique({ where: { whatsappNumber } });
  },

  findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  },

  list(take = 50) {
    return prisma.user.findMany({
      select: {
        id: true,
        whatsappNumber: true,
        firstName: true,
        lastName: true,
        status: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
      take,
    });
  },

  findOrCreate(whatsappNumber: string) {
    return prisma.user.upsert({
      where: { whatsappNumber },
      update: {},
      create: {
        whatsappNumber,
        status: 'PENDING_KYC',
        conversationState: 'ONBOARDING',
      },
    });
  },

  // "Account settings" for a customer — set via conversation flow, not a form.
  updateProfile(
    id: string,
    data: { firstName?: string; lastName?: string; email?: string },
  ) {
    return prisma.user.update({ where: { id }, data });
  },

  updateConversationState(
    id: string,
    state: ConversationState,
    context?: Prisma.InputJsonValue,
  ) {
    return prisma.user.update({
      where: { id },
      data: {
        conversationState: state,
        ...(context !== undefined ? { conversationContext: context } : {}),
      },
    });
  },

  updateStatus(id: string, status: UserStatus) {
    return prisma.user.update({ where: { id }, data: { status } });
  },

  setTransactionPin(id: string, transactionPinHash: string) {
    return prisma.user.update({ where: { id }, data: { transactionPinHash } });
  },
};
