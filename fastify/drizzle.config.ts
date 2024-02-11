import { env } from './src/config/env';
import type { Config } from 'drizzle-kit';

export default {
  out: './migrations',
  schema: './src/db/schema.ts',
  breakpoints: false,
  driver: 'pg',
  dbCredentials: {
    connectionString: env.DATABASE_CONNECTION,
  },
} satisfies Config;
