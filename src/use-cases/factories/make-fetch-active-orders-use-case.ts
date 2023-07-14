import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository';
import { FetchActiveOrdersUseCase } from '../fetch-active-orders';

export function makeFetchActiveOrdersUseCase() {
  const ordersRepository = new PrismaOrdersRepository();
  const fetchActiveOrdersUseCase = new FetchActiveOrdersUseCase(ordersRepository);

  return fetchActiveOrdersUseCase;
}