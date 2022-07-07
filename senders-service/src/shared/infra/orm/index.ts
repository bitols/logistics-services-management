import orm from '@config/ormConfig';
import Sender from '@modules/senders/infra/orm/entities/Sender';
import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'mongodb',
  url: orm.url,
  useNewUrlParser: orm.useNewUrlParser,
  synchronize: orm.synchronize,
  logging: orm.logging,
  entities: [Sender],
});
