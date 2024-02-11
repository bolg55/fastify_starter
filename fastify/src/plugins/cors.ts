import { env } from '@config/env';
import cors from '@fastify/cors';
import fastifyPlugin from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import supertokens from 'supertokens-node';

const corsPlugin = async (fastify: FastifyInstance) => {
  await fastify.register(cors, {
    origin: [env.API_DOMAIN],
    allowedHeaders: ['Content-Type', ...supertokens.getAllCORSHeaders()],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
  });
};

export default fastifyPlugin(corsPlugin);
