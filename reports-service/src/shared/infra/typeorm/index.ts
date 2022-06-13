import typeOrmConfig from '@config/typeOrmConfig';
import StoragesCapacity from '@modules/reports/infra/typeorm/entities/StorageCapacity';
import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'mongodb',
  url: typeOrmConfig.url,
  useNewUrlParser: typeOrmConfig.useNewUrlParser,
  synchronize: typeOrmConfig.synchronize,
  logging: typeOrmConfig.logging,
  entities: [StoragesCapacity],
});
