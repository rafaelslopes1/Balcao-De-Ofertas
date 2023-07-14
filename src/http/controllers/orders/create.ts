import { makeCreateOrderUseCase } from '@/use-cases/factories/make-create-order-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function createOrder(request: FastifyRequest, reply: FastifyReply) {
  const createOrderBodySchema = z.object({
    currencyAmount: z.number(),
    priceUsd: z.number(),
    sourceWalletId: z.string(),
  });

  const createOrderHeaderSchema = z.object({
    'x-user-id': z.string().nonempty().uuid()
  });

  console.log(request.body);

  const {
    currencyAmount,
    priceUsd,
    sourceWalletId,
  } = createOrderBodySchema.parse(request.body);

  const { 'x-user-id': userId } = createOrderHeaderSchema.parse(request.headers);

  const createOrderUseCase = makeCreateOrderUseCase();

  const { order } = await createOrderUseCase.execute({
    currencyAmount,
    priceUsd,
    sourceWalletId,
    userId
  });

  return reply.status(201).send(order);
}