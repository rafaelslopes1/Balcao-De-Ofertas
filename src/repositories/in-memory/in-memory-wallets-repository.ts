import { Prisma, Wallet } from '@prisma/client';
import { randomUUID } from 'crypto';
import { WalletsRepository } from '../wallets-repository';

export class InMemoryWalletsRepository implements WalletsRepository {
  public items: Wallet[] = [];

  async findById(id: string) {
    const wallet = this.items
      .find(wallet => wallet.id === id);

    if (!wallet) {
      return null;
    }

    return wallet;
  }

  async create(data: Prisma.WalletUncheckedCreateInput) {
    const wallet = {
      id: data.id ?? randomUUID(),
      address: data.address ?? randomUUID(),
      user_id: data.user_id,
      balance: data.balance ?? 0,
      currency_id: data.currency_id,
      created_at: new Date()
    };

    this.items.push(wallet);

    return wallet;
  }
}