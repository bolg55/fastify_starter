import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { env } from '../config/env';

const pool = new Pool({
  connectionString: env.DATABASE_CONNECTION,
  ssl: true,
});

export const db = drizzle(pool);

const main = async () => {
  console.log('migration started...');
  await migrate(db, { migrationsFolder: 'migrations' });
  console.log('migration completed...');
  process.exit(0);
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
