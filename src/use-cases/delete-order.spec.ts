import { InMemoryOrdersRepository } from '@/repositories/in-memory/in-memory-orders-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { DeleteOrderUseCase } from './delete-order';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { UnauthorizedError } from './errors/unauthorized-error';

let ordersRepository: InMemoryOrdersRepository;
let sut: DeleteOrderUseCase;
describe('Delete Order Use Case', () => {
  beforeEach(async () => {
    ordersRepository = new InMemoryOrdersRepository();
    sut = new DeleteOrderUseCase(ordersRepository);

    await ordersRepository.create({
      id: 'order-id-01',
      user_id: 'user-id-01',
      currency_amount: 32,
      price_usd: 2.3,
      source_wallet_id: 'source-wallet-id-01'
    });
  });

  it('should be able to delete an order', async () => {
    await sut.execute({
      orderId: 'order-id-01',
      userId: 'user-id-01',
    });

    const order = await ordersRepository.findById('order-id-01');

    expect(order).toBeNull();
  });

  it('should not be able to delete an order if the user is not the owner', async () => {
    await expect(() =>
      sut.execute({
        orderId: 'order-id-01',
        userId: 'user-id-02'
      })
    ).rejects.toBeInstanceOf(UnauthorizedError);
  });

  it('should not be able to delete an order twice', async () => {
    await sut.execute({
      orderId: 'order-id-01',
      userId: 'user-id-01',
    });

    await expect(() =>
      sut.execute({
        orderId: 'order-id-01',
        userId: 'user-id-01'
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});