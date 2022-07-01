import typeOrmConfig from '@config/ormConfig';
import Receivers from '@modules/receivers/infra/orm/entities/Receiver';
import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'mongodb',
  url: typeOrmConfig.url,
  useNewUrlParser: typeOrmConfig.useNewUrlParser,
  synchronize: typeOrmConfig.synchronize,
  logging: typeOrmConfig.logging,
  entities: [Receivers],
});
