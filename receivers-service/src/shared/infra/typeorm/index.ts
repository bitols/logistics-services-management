import typeOrmConfig from '@config/typeOrmConfig';
import Receivers from '@modules/receivers/infra/typeorm/entities/Receiver';
import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'mongodb',
  url: typeOrmConfig.url,
  useNewUrlParser: typeOrmConfig.useNewUrlParser,
  synchronize: typeOrmConfig.synchronize,
  logging: typeOrmConfig.logging,
  entities: [Receivers],
});
