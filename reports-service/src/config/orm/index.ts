import orm from '@config/orm/config';
import StorageReport from '@modules/reports/infra/orm/entities/StorageReport';
import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'mongodb',
  url: orm.url,
  useNewUrlParser: orm.useNewUrlParser,
  synchronize: orm.synchronize,
  logging: orm.logging,
  entities: [StorageReport],
});
