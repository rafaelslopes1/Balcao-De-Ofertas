import { OrdersRepository } from '@/repositories/orders-repository';
import { Order } from '@prisma/client';

interface FetchActiveOrdersUseCaseRequest {
  page: number;
}

interface FetchActiveOrdersUseCaseResponse {
  orders: Order[];
}

export class FetchActiveOrdersUseCase {
  constructor(private readonly ordersRepository: OrdersRepository) { }

  async execute({
    page
  }: FetchActiveOrdersUseCaseRequest): Promise<FetchActiveOrdersUseCaseResponse> {
    const orders = await this.ordersRepository.findManyActive(page, new Date());

    return {
      orders
    };
  }
}