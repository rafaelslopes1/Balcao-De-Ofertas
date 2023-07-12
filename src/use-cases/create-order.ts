import { OrdersRepository } from '@/repositories/orders-repository';
import { WalletsRepository } from '@/repositories/wallets-repository';
import { DailyOrderLimitExceeded } from './errors/daily-order-limit-exceeded-error';
import { InsufficientBalanceError } from './errors/insufficient-balance-error';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { UnauthorizedError } from './errors/unauthorized-error';

interface CreateOrderUseCaseInput {
  priceUsd: number;
  currencyAmount: number;
  sourceWalletId: string;
  userId: string;
}

export class CreateOrderUseCase {
  constructor(
    private readonly orderRepository: OrdersRepository,
    private readonly walletRepository: WalletsRepository
  ) { }

  async execute({
    priceUsd,
    currencyAmount,
    sourceWalletId,
    userId
  }: CreateOrderUseCaseInput) {
    const wallet = await this.walletRepository.findById(sourceWalletId);

    if (!wallet) {
      throw new ResourceNotFoundError();
    }

    if (wallet.user_id !== userId) {
      throw new UnauthorizedError();
    }

    if (currencyAmount > wallet.balance) {
      throw new InsufficientBalanceError();
    }

    const activeUserOrders = await this.orderRepository.findManyActive(1, new Date(), userId);

    if (activeUserOrders.length === 5) {
      throw new DailyOrderLimitExceeded();
    }

    const order = await this.orderRepository.create({
      price_usd: priceUsd,
      currency_amount: currencyAmount,
      source_wallet_id: sourceWalletId,
      user_id: userId,
    });

    return {
      order
    };
  }
}