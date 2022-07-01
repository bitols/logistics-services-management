import ormConfig from '@config/ormConfig';
import Receivers from '@modules/receivers/infra/orm/entities/Receiver';
import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'mongodb',
  url: ormConfig.url,
  useNewUrlParser: ormConfig.useNewUrlParser,
  synchronize: ormConfig.synchronize,
  logging: ormConfig.logging,
  entities: [Receivers],
});
