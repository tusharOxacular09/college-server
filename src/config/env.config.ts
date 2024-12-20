import * as dotenv from 'dotenv';

// Load environment variables from the .env file into process.env
dotenv.config();

// Export an object to access environment variables with fallback defaults
export const ENV = {
  PORT: process.env.PORT || '3000', // Port for the server to run on (defaults to 3000)
  POSTGRES_HOST: process.env.POSTGRES_HOST || '', // PostgreSQL host (defaults to an empty string if not defined)
  POSTGRES_PORT: process.env.POSTGRES_PORT || '5432', // PostgreSQL port (defaults to 5432)
  POSTGRES_USER: process.env.POSTGRES_USER || '', // PostgreSQL username (defaults to an empty string if not defined)
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || '', // PostgreSQL password (defaults to an empty string if not defined)
  POSTGRES_DATABASE: process.env.POSTGRES_DATABASE || '', // PostgreSQL database name (defaults to an empty string if not defined)
  MODE: process.env.MODE || 'DEV', // Application mode (defaults to 'DEV')
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'secret1234secret5678', // Secret key for JWT authentication (defaults to a sample key)
};
