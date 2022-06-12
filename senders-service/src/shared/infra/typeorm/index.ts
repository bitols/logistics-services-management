import typeOrmConfig from '@config/typeOrmConfig';
import Sender from '@modules/senders/infra/typeorm/entities/Sender';
import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'mongodb',
  url: typeOrmConfig.url,
  useNewUrlParser: typeOrmConfig.useNewUrlParser,
  synchronize: typeOrmConfig.synchronize,
  logging: typeOrmConfig.logging,
  entities: [Sender],
});
