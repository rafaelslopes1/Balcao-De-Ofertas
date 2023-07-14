import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { WalletsRepository } from '../wallets-repository';

export class PrismaWalletsRepository implements WalletsRepository {
  async findById(id: string) {
    const wallet = await prisma.wallet.findUnique({
      where: {
        id
      }
    });

    return wallet;
  }

  async create(data: Prisma.WalletUncheckedCreateInput) {
    const wallet = await prisma.wallet.create({
      data
    });

    return wallet;
  }
}