import { prisma } from '@/lib/prisma';
import { Order, Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import { OrdersRepository } from '../orders-repository';

export class PrismaOrdersRepository implements OrdersRepository {
  async findById(id: string) {
    const order = await prisma.order.findUnique({
      where: {
        id
      }
    });

    return order;
  }

  async findManyActive(page: number, date: Date, user_id?: string) {
    const startOfTheDay = dayjs(date).startOf('date');
    const endOfTheDay = dayjs(date).endOf('date');

    const orders = await prisma.order.findMany({
      where: {
        user_id,
        created_at: {
          gte: startOfTheDay.toDate(),
          lt: endOfTheDay.toDate()
        },
        deleted_at: null,
      },
      orderBy: {
        created_at: 'desc'
      },
      take: 20,
      skip: (page - 1) * 20
    });

    return orders;
  }

  async create(data: Prisma.OrderUncheckedCreateInput) {
    const order = await prisma.order.create({
      data
    });

    return order;
  }

  async update(data: Order) {
    const updatedOrder = await prisma.order.update({
      where: {
        id: data.id
      },
      data
    });

    return updatedOrder;
  }
}