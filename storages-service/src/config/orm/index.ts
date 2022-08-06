import config from '@config/orm/config';
import Storage from '@modules/storages/infra/orm/entities/Storage';
import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'mongodb',
  url: config.url,
  useNewUrlParser: config.useNewUrlParser,
  synchronize: config.synchronize,
  logging: config.logging,
  entities: [Storage],
});
