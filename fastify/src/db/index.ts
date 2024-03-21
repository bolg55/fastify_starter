import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { env } from '../config/env';
import * as schema from './schema';

export type DbType = typeof db;

const pool = new Pool({
  connectionString: env.DATABASE_CONNECTION,
});

export const db = drizzle(pool, { schema });
