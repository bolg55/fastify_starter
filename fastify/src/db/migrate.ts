import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { db } from './index';

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
