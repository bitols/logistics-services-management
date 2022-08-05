import ormConfig from '@config/orm/config';
import Credential from '@modules/credentials/infra/orm/entities/Credential';
import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'mongodb',
  url: ormConfig.url,
  useNewUrlParser: ormConfig.useNewUrlParser,
  synchronize: ormConfig.synchronize,
  logging: ormConfig.logging,
  entities: [Credential],
});

export { dataSource };
