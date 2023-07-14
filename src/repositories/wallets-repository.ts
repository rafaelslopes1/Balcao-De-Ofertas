import { Prisma, Wallet } from '@prisma/client';

export interface WalletsRepository {
  findById(id: string): Promise<Wallet | null>
  create(data: Prisma.WalletUncheckedCreateInput): Promise<Wallet>
}