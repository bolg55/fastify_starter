import pino from 'pino';

export const logger = pino({
  redact: [
    'DATABASE_CONNECTION',
    'SUPERTOKENS_API_KEY',
    'UPSTASH_REDIS_REST_TOKEN',
    'STRIPE_SECRET_KEY',
    'STRIPE_PUBLIC_KEY',
  ],
  level: 'debug',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      ignore: 'pid,hostname',
    },
  },
});
