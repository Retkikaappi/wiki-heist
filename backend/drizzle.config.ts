import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { DB_URL } from './src/utils/config.ts';

export default defineConfig({
  out: './drizzle',
  dialect: 'postgresql',
  schema: './src/db/schema.ts',
  dbCredentials: { url: DB_URL },
  verbose: true,
  strict: true,
});
