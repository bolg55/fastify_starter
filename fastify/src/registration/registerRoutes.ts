import { FastifyInstance } from 'fastify';
// Routes
import userRoutes from 'routes/usersRoutes';

const routes = [{ plugin: userRoutes, prefix: '/api/users' }];

export const registerRoutes = async (
  fastifyInstance: FastifyInstance
): Promise<void> => {
  for (const route of routes) {
    await fastifyInstance.register(route.plugin, { prefix: route.prefix });
  }
};
