import { InMemoryOrdersRepository } from '@/repositories/in-memory/in-memory-orders-repository';
import { InMemoryWalletsRepository } from '@/repositories/in-memory/in-memory-wallets-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { CreateOrderUseCase } from './create-order';
import { DailyOrderLimitExceededError } from './errors/daily-order-limit-exceeded-error';
import { InsufficientBalanceError } from './errors/insufficient-balance-error';
import { UnauthorizedError } from './errors/unauthorized-error';

let ordersRepository: InMemoryOrdersRepository;
let walletsRepository: InMemoryWalletsRepository;
let sut: CreateOrderUseCase;
describe('Create Order Use Case', async () => {
  beforeEach(async () => {
    ordersRepository = new InMemoryOrdersRepository();
    walletsRepository = new InMemoryWalletsRepository();
    sut = new CreateOrderUseCase(ordersRepository, walletsRepository);

    walletsRepository.create({
      id: 'source-wallet-id-01',
      user_id: 'user-id-01',
      balance: 120,
      currency_id: 'BTC',
    });
  });

  it('should be able to create order', async () => {
    const { order } = await sut.execute({
      userId: 'user-id-01',
      currencyAmount: 2.3,
      priceUsd: 10.54,
      sourceWalletId: 'source-wallet-id-01'
    });

    expect(order.id).toEqual(expect.any(String));
  });

  it('should not be able to create orders if the wallet does not belong to the same user', async () => {
    walletsRepository.create({
      id: 'source-wallet-id-02',
      user_id: 'user-id-02',
      balance: 120,
      currency_id: 'BTC',
    });

    await expect(() =>
      sut.execute({
        userId: 'user-id-01',
        currencyAmount: 2.3,
        priceUsd: 10.54,
        sourceWalletId: 'source-wallet-id-02'
      })
    ).rejects.toBeInstanceOf(UnauthorizedError);
  });


  it('should not be able to create order when wallet balance is insufficient', async () => {
    await expect(() =>
      sut.execute({
        userId: 'user-id-01',
        currencyAmount: 4000,
        priceUsd: 10.54,
        sourceWalletId: 'source-wallet-id-01'
      })
    ).rejects.toBeInstanceOf(InsufficientBalanceError);
  });

  it('should not be able to exceed the daily limit of 5 orders per user', async () => {
    walletsRepository.create({
      id: 'source-wallet-id-02',
      user_id: 'user-id-01',
      balance: 24.9,
      currency_id: 'BTC',
    });

    for (let i = 0; i < 5; i++) {
      const walletIndex = (i % 2) + 1;
      const order = {
        userId: 'user-id-01',
        currencyAmount: 2.3,
        priceUsd: 10.54,
        sourceWalletId: `source-wallet-id-0${walletIndex}`,
      };

      await sut.execute(order);
    }

    await expect(() =>
      sut.execute({
        userId: 'user-id-01',
        currencyAmount: 4.99,
        priceUsd: 10.54,
        sourceWalletId: 'source-wallet-id-01'
      })
    ).rejects.toBeInstanceOf(DailyOrderLimitExceededError);
  });
});