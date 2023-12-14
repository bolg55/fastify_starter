import pino from 'pino';

export const logger = pino({
  redact: ['DATABASE_CONNECTION'],
  level: 'debug',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      ignore: 'pid,hostname',
    },
  },
});
