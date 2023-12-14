import helmet from '@fastify/helmet';
import fastifyPlugin from 'fastify-plugin';
import { FastifyInstance } from 'fastify';

const helmetPlugin = async (fastify: FastifyInstance) => {
  await fastify.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          'cdn.jsdelivr.net',
          'https://fonts.googleapis.com',
        ],
        imgSrc: ["'self'", 'data:', 'validator.swagger.io', 'cdn.jsdelivr.net'],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          'cdn.jsdelivr.net',
          'https://fonts.googleapis.com',
        ],
      },
    },
  });
};

export default fastifyPlugin(helmetPlugin);
