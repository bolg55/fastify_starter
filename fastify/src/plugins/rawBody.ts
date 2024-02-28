import rawBody from 'fastify-raw-body';
import fastifyPlugin from 'fastify-plugin';
import { FastifyInstance } from 'fastify';

const rawBodyPlugin = async (fastify: FastifyInstance) => {
  await fastify.register(rawBody, {
    field: 'rawBody',
    global: false,
    encoding: false,
    runFirst: true,
    routes: ['/stripe/webhook'],
  });
};

export default fastifyPlugin(rawBodyPlugin);
