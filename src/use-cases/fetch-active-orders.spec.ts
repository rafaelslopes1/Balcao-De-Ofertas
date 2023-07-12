import { InMemoryOrdersRepository } from '@/repositories/in-memory/in-memory-orders-repository';
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { FetchActiveOrdersUseCase } from './fetch-active-orders';

let ordersRepository: InMemoryOrdersRepository;
let sut: FetchActiveOrdersUseCase;
describe('Fetch Active Orders Use Case', () => {
  beforeEach(async () => {
    ordersRepository = new InMemoryOrdersRepository();
    sut = new FetchActiveOrdersUseCase(ordersRepository);

    vi.useFakeTimers();
  });

  afterAll(async () => {
    vi.useRealTimers();
  });

  it('should be able to fetch active orders in descending order by creation time', async () => {
    const order1 = {
      user_id: 'user-id-01',
      currency_amount: 2.3,
      price_usd: 10.54,
      source_wallet_id: 'source-wallet-id-01'
    };

    const order2 = {
      user_id: 'user-id-02',
      currency_amount: 5.2,
      price_usd: 100,
      source_wallet_id: 'source-wallet-id-02'
    };

    const order3 = {
      user_id: 'user-id-03',
      currency_amount: 2.3,
      price_usd: 10.54,
      source_wallet_id: 'source-wallet-id-03'
    };

    const order4 = {
      user_id: 'user-id-04',
      currency_amount: 12.34,
      price_usd: 1023,
      source_wallet_id: 'source-wallet-id-04'
    };

    await ordersRepository.create(order1);
    await ordersRepository.create(order2);

    vi.setSystemTime(new Date(2023, 7, 1, 17, 0, 0));

    await ordersRepository.create(order3);
    await ordersRepository.create(order4);

    const { orders } = await sut.execute({
      page: 1
    });

    expect(orders).toHaveLength(2);
    expect(orders).toEqual([
      expect.objectContaining({ user_id: 'user-id-03' }),
      expect.objectContaining({ user_id: 'user-id-04' })
    ]);

    const orderDates = orders.map(order => order.created_at);
    const isDescendingOrder = orderDates.every((date, index) => index === 0 || date <= orderDates[index - 1]);
    expect(isDescendingOrder).toBe(true);
  });

  it('should be able to fetch paginated orders', async () => {
    for (let i = 1; i <= 22; i++) {
      const order = {
        user_id: `user-id-${i}`,
        currency_amount: 2.3,
        price_usd: 10.54,
        source_wallet_id: `source-wallet-id-${i}`,
      };

      await ordersRepository.create(order);
    }

    const { orders } = await sut.execute({
      page: 2
    });

    expect(orders).toHaveLength(2);
    expect(orders).toEqual([
      expect.objectContaining({ user_id: 'user-id-21' }),
      expect.objectContaining({ user_id: 'user-id-22' }),
    ]);
  });
});