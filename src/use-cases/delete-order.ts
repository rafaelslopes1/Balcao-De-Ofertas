import { OrdersRepository } from '@/repositories/orders-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { UnauthorizedError } from './errors/unauthorized-error';

interface DeleteOrderUseCaseRequest {
  orderId: string,
  userId: string
}

export class DeleteOrderUseCase {
  constructor(private readonly ordersRepository: OrdersRepository) { }

  async execute({
    orderId,
    userId
  }: DeleteOrderUseCaseRequest) {
    const order = await this.ordersRepository.findById(orderId);

    if (!order || order.deleted_at !== null) {
      throw new ResourceNotFoundError();
    }

    if (order.user_id !== userId) {
      throw new UnauthorizedError();
    }

    order.deleted_at = new Date();

    await this.ordersRepository.update(order);
  }
}