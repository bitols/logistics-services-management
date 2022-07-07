import orm from '@config/ormConfig';
import StoragesCapacity from '@modules/reports/infra/orm/entities/StorageCapacity';
import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'mongodb',
  url: orm.url,
  useNewUrlParser: orm.useNewUrlParser,
  synchronize: orm.synchronize,
  logging: orm.logging,
  entities: [StoragesCapacity],
});
