import { OrdersRepository } from '@/repositories/orders-repository';

interface FetchActiveOrdersUseCaseRequest {
  page: number;
}

export class FetchActiveOrdersUseCase {
  constructor(private readonly ordersRepository: OrdersRepository) { }

  async execute({
    page
  }: FetchActiveOrdersUseCaseRequest) {
    const orders = await this.ordersRepository.findManyActive(page, new Date());

    return {
      orders
    };
  }
}