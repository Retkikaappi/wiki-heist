import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema.ts';
import { DB_URL } from '../utils/config.ts';

const db = drizzle(DB_URL, { schema, logger: true });

export default db;
