import { FastifyInstance } from 'fastify';
import { createOrder } from './create';
import { deleteOrder } from './delete';
import { fetchActive } from './fetch-active';

export async function ordersRoutes(app: FastifyInstance) {
  app.get('/orders', fetchActive);
  app.post('/orders', createOrder);
  app.delete('/orders/:orderId', deleteOrder);
}