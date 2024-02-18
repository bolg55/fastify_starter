import { FastifyInstance } from 'fastify';
// Routes
import userRoutes from 'routes/usersRoutes';
import meRoutes from 'routes/meRoutes';

const routes = [
  { plugin: userRoutes, prefix: '/api/users' },
  { plugin: meRoutes },
];

export const registerRoutes = async (
  fastifyInstance: FastifyInstance
): Promise<void> => {
  for (const route of routes) {
    await fastifyInstance.register(route.plugin, { prefix: route.prefix });
  }
};
