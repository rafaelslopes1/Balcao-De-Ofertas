import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository';
import { PrismaWalletsRepository } from '@/repositories/prisma/prisma-wallets-repository';
import { CreateOrderUseCase } from '../create-order';

export function makeCreateOrderUseCase(): CreateOrderUseCase {
  const ordersRepository = new PrismaOrdersRepository();
  const walletsRepository = new PrismaWalletsRepository();
  const createOrderUseCase = new CreateOrderUseCase(ordersRepository, walletsRepository);

  return createOrderUseCase;
}