import { makeFetchActiveOrdersUseCase } from '@/use-cases/factories/make-fetch-active-orders-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function fetchActive(request: FastifyRequest, reply: FastifyReply) {
  const createFetchActiveOrdersQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1)
  });

  const { page } = createFetchActiveOrdersQuerySchema.parse(request.query);

  const fetchActiveOrdersUseCase = makeFetchActiveOrdersUseCase();

  const { orders } = await fetchActiveOrdersUseCase.execute({
    page
  });

  return reply.status(200).send({
    orders
  });
}