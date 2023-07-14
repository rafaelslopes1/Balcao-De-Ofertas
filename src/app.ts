import fastify from 'fastify';
import { ZodError } from 'zod';
import { env } from './env';
import { ordersRoutes } from './http/controllers/orders/routes';
import { ResourceNotFoundError } from './use-cases/errors/resource-not-found-error';
import { UnauthorizedError } from './use-cases/errors/unauthorized-error';

export const app = fastify();

app.register(ordersRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format });
  }

  if (error instanceof ResourceNotFoundError) {
    return reply
      .status(404)
      .send({ message: error.message });
  }

  if (error instanceof UnauthorizedError) {
    return reply
      .status(401)
      .send({ message: error.message });
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  }

  return reply.status(500).send({ message: 'Internal server error.' });
});