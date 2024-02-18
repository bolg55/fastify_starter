import { env } from '@config/env';
import Redis from 'ioredis';
import fastifyPlugin from 'fastify-plugin';
import { FastifyInstance } from 'fastify';

declare module 'fastify' {
  export interface FastifyInstance {
    redis: Redis;
  }
}

const redisPlugin = async (server: FastifyInstance) => {
  const redis = new Redis(
    `rediss://default:${env.UPSTASH_REDIS_REST_TOKEN}@${env.UPSTASH_REDIS_REST_URL}`
  );

  server.decorate('redis', redis);
};

export default fastifyPlugin(redisPlugin);
