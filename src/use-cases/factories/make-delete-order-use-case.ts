import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository';
import { DeleteOrderUseCase } from '../delete-order';

export function makeDeleteOrderUseCase() {
  const ordersRepository = new PrismaOrdersRepository();
  const deleteOrderUseCase = new DeleteOrderUseCase(ordersRepository);

  return deleteOrderUseCase;
}