import typeOrmConfig from '@config/typeOrmConfig';
import Storage from '@modules/storages/infra/typeorm/entities/Storage';
import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'mongodb',
  url: typeOrmConfig.url,
  useNewUrlParser: typeOrmConfig.useNewUrlParser,
  synchronize: typeOrmConfig.synchronize,
  logging: typeOrmConfig.logging,
  entities: [Storage],
});
