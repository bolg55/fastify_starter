import { env } from './config/env';
import { logger } from './utils/logger';
import { buildServer } from './utils/server';

const gracefulShutdown = async ({
  app,
}: {
  app: Awaited<ReturnType<typeof buildServer>>;
}) => {
  logger.info('Gracefully shutting down');
  await app.close();
};

const main = async () => {
  const app = await buildServer(logger);

  await app.listen({ port: env.PORT, host: env.HOST });

  const signals = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
  logger.debug(env, 'Using environment variables');

  signals.forEach((signal) => {
    process.on(signal, async () => {
      await gracefulShutdown({ app });
      process.exit(0);
    });
  });
};

main();
