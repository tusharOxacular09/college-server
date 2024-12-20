import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ENV } from './env.config';

class ConfigService {
  // Returns the TypeORM configuration for connecting to PostgreSQL
  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: ENV.POSTGRES_HOST,
      port: parseInt(ENV.POSTGRES_PORT, 10),
      username: ENV.POSTGRES_USER,
      password: ENV.POSTGRES_PASSWORD,
      database: ENV.POSTGRES_DATABASE,
      entities: ['dist/**/*.entity.js'], // Path to entity files for TypeORM
      migrationsTableName: 'migration', // Table name for migrations
      migrations: ['dist/migration/*.js'], // Path to migration files
      ssl: {
        rejectUnauthorized: false, // This will allow connections without certificate validation
      },
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
