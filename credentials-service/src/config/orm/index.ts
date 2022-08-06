import config from '@config/orm/config';
import Credential from '@modules/credentials/infra/orm/entities/Credential';
import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'mongodb',
  url: config.url,
  useNewUrlParser: config.useNewUrlParser,
  synchronize: config.synchronize,
  logging: config.logging,
  entities: [Credential],
});

export { dataSource };
