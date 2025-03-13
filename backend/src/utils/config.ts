import 'dotenv/config';

const URL =
  process.env.NODE_ENV === 'dev'
    ? process.env.DB_URL_DEV
    : process.env.DB_URL_PROD;

export const DB_URL = URL as string;
