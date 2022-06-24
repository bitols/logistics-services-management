import typeOrmConfig from '@config/typeOrmConfig';
import Credential from '@modules/credentials/infra/typeorm/entities/Credential';
import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'mongodb',
  url: typeOrmConfig.url,
  useNewUrlParser: typeOrmConfig.useNewUrlParser,
  synchronize: typeOrmConfig.synchronize,
  logging: typeOrmConfig.logging,
  entities: [Credential],
});
