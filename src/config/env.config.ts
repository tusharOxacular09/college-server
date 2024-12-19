import * as dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || '3000',
  POSTGRES_HOST: process.env.POSTGRES_HOST || '',
  POSTGRES_PORT: process.env.POSTGRES_PORT || '5432',
  POSTGRES_USER: process.env.POSTGRES_USER || '',
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || '',
  POSTGRES_DATABASE: process.env.POSTGRES_DATABASE || '',
  MODE: process.env.MODE || 'DEV',
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'secret1234secret5678',
};
