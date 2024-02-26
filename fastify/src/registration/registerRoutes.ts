import { FastifyInstance } from 'fastify';
// Routes
import userRoutes from 'routes/usersRoutes';
import meRoutes from 'routes/meRoutes';
import stripeRoutes from 'routes/stripeRoutes';

const routes = [
  { plugin: userRoutes, prefix: '/api/users' },
  { plugin: meRoutes },
  { plugin: stripeRoutes, prefix: '/stripe' },
];

export const registerRoutes = async (
  fastifyInstance: FastifyInstance
): Promise<void> => {
  for (const route of routes) {
    await fastifyInstance.register(route.plugin, { prefix: route.prefix });
  }
};
