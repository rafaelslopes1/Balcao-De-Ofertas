import { Order, Prisma } from '@prisma/client';

export interface OrdersRepository {
  findById(id: string): Promise<Order | null>
  findManyActive(page: number, date: Date, user_id?: string): Promise<Order[]>;
  create(data: Prisma.OrderUncheckedCreateInput): Promise<Order>;
  update(data: Order): Promise<Order>
}