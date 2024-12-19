import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ENV } from './env.config';

class ConfigService {
  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: ENV.POSTGRES_HOST,
      port: parseInt(ENV.POSTGRES_PORT, 10),
      username: ENV.POSTGRES_USER,
      password: ENV.POSTGRES_PASSWORD,
      database: ENV.POSTGRES_DATABASE,
      entities: ['dist/**/*.entity.js'],
      migrationsTableName: 'migration',
      migrations: ['dist/migration/*.js'],
      ssl: ENV.MODE !== 'DEV',
      synchronize: ENV.MODE === 'DEV', // Synchronize Tables In DEV
    };
  }

  public getPort() {
    return ENV.PORT;
  }

  public isProduction() {
    return ENV.MODE !== 'DEV';
  }
}

const configService = new ConfigService();
export { configService };
