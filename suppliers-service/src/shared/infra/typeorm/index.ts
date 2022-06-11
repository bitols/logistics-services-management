import typeOrmConfig from '@config/typeOrmConfig';
import Supplier from '@modules/suppliers/infra/typeorm/entities/Supplier';
import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'mongodb',
  url: typeOrmConfig.url,
  useNewUrlParser: typeOrmConfig.useNewUrlParser,
  synchronize: typeOrmConfig.synchronize,
  logging: typeOrmConfig.logging,
  entities: [Supplier],
});
