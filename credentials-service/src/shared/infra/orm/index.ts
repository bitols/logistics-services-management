import ormConfig from '@config/ormConfig';
import Credential from '@modules/credentials/infra/typeorm/entities/Credential';
import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'mongodb',
  url: ormConfig.url,
  useNewUrlParser: ormConfig.useNewUrlParser,
  synchronize: ormConfig.synchronize,
  logging: ormConfig.logging,
  entities: [Credential],
});
