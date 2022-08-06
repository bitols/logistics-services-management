import config from '@config/orm/config';
import Sender from '@modules/senders/infra/orm/entities/Sender';
import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'mongodb',
  url: config.url,
  useNewUrlParser: config.useNewUrlParser,
  synchronize: config.synchronize,
  logging: config.logging,
  entities: [Sender],
});
