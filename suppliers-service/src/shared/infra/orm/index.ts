import orm from '@config/ormConfig';
import Supplier from '@modules/suppliers/infra/orm/entities/Supplier';
import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'mongodb',
  url: orm.url,
  useNewUrlParser: orm.useNewUrlParser,
  synchronize: orm.synchronize,
  logging: orm.logging,
  entities: [Supplier],
});
