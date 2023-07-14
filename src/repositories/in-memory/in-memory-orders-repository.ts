import { Order, Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import dayjs from 'dayjs';
import { OrdersRepository } from '../orders-repository';

export class InMemoryOrdersRepository implements OrdersRepository {
  public items: Order[] = [];

  async findById(id: string) {
    const order = this.items
      .find(item => item.id === id);

    if (!order || order.deleted_at !== null) {
      return null;
    }

    return order;
  }

  async findManyActive(page: number, date: Date, user_id?: string) {
    const startOfTheDay = dayjs(date).startOf('date');
    const endOfTheDay = dayjs(date).endOf('date');

    const orders = this.items
      .filter(order => {
        const orderDate = dayjs(order.created_at);
        const isOnSameDate = orderDate.isAfter(startOfTheDay) && orderDate.isBefore(endOfTheDay);
        const isNotDeleted = order.deleted_at === null;
        const belongsToTheUser = !user_id ? true : order.user_id == user_id;

        return isOnSameDate && isNotDeleted && belongsToTheUser;
      })
      .slice((page - 1) * 20, page * 20);

    orders.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return orders;
  }

  async create(data: Prisma.OrderUncheckedCreateInput) {
    const order: Order = {
      id: data.id ?? randomUUID(),
      user_id: data.user_id,
      source_wallet_id: data.source_wallet_id,
      currency_amount: data.currency_amount,
      price_usd: data.price_usd,
      created_at: new Date(),
      deleted_at: data.deleted_at ? new Date(data.deleted_at) : null,
    };

    this.items.push(order);

    return order;
  }

  async update(order: Order) {
    const orderIndex = this.items.findIndex(item => item.id === order.id);

    if (orderIndex >= 0) {
      this.items[orderIndex] = order;
    }

    return order;
  }
}