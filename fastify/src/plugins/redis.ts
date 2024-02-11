import { env } from '@config/env';
import { Redis } from '@upstash/redis';
import fastifyPlugin from 'fastify-plugin';
import { FastifyInstance } from 'fastify';

declare module 'fastify' {
  export interface FastifyInstance {
    redis: Redis;
  }
}

const redisPlugin = async (server: FastifyInstance) => {
  const redis = new Redis({
    url: env.UPSTASH_REDIS_REST_URL,
    token: env.UPSTASH_REDIS_REST_TOKEN,
  });

  server.decorate('redis', redis);
};

export default fastifyPlugin(redisPlugin);
