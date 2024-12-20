import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ENV } from './env.config';

// Configuration service to manage environment-specific settings and database configuration
class ConfigService {
  // Returns the TypeORM configuration for connecting to PostgreSQL
  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres', // Specifies the database type
      host: ENV.POSTGRES_HOST, // Database host (e.g., localhost or external host)
      port: parseInt(ENV.POSTGRES_PORT, 10), // Database port, parsed as integer
      username: ENV.POSTGRES_USER, // Database username
      password: ENV.POSTGRES_PASSWORD, // Database password
      database: ENV.POSTGRES_DATABASE, // Database name
      entities: ['dist/**/*.entity.js'], // Path to entity files for TypeORM
      migrationsTableName: 'migration', // Table name for migrations
      migrations: ['dist/migration/*.js'], // Path to migration files
      ssl: ENV.MODE !== 'DEV', // Enable SSL if not in development mode
      synchronize: ENV.MODE === 'DEV', // Synchronize database schema in development mode
    };
  }

  // Returns the port the application should run on, as specified in environment variables
  public getPort() {
    return ENV.PORT;
  }

  // Returns true if the application is in production mode (not 'DEV')
  public isProduction() {
    return ENV.MODE !== 'DEV';
  }
}

// Creating an instance of ConfigService to be used throughout the application
const configService = new ConfigService();
export { configService };
