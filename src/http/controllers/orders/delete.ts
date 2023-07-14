import { makeDeleteOrderUseCase } from '@/use-cases/factories/make-delete-order-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function deleteOrder(request: FastifyRequest, reply: FastifyReply) {
  const deleteOrderParamsSchema = z.object({
    orderId: z.string().uuid()
  });

  const deleteOrderHeaderSchema = z.object({
    'x-user-id': z.string().nonempty().uuid()
  });

  const { orderId } = deleteOrderParamsSchema.parse(request.params);

  const { 'x-user-id': userId } = deleteOrderHeaderSchema.parse(request.headers);

  const deleteOrderUseCase = makeDeleteOrderUseCase();

  await deleteOrderUseCase.execute({
    orderId,
    userId
  });

  return reply.status(204).send();
}