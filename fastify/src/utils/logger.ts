import pino from 'pino';

export const logger = pino({
  redact: [
    'DATABASE_CONNECTION',
    'SUPERTOKENS_API_KEY',
    'UPSTASH_REDIS_REST_TOKEN',
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
