import cors from '@fastify/cors';
import fastifyPlugin from 'fastify-plugin';
import { FastifyInstance } from 'fastify';

const corsPlugin = async (fastify: FastifyInstance) => {
  await fastify.register(cors, {
    origin: [process.env.API_DOMAIN || 'http://localhost:8080'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
  });
};

export default fastifyPlugin(corsPlugin);
