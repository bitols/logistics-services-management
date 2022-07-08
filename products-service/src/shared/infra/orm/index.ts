import orm from '@config/ormConfig';
import Products from '@modules/products/infra/orm/entities/Product';
import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'mongodb',
  url: orm.url,
  useNewUrlParser: orm.useNewUrlParser,
  synchronize: orm.synchronize,
  logging: orm.logging,
  entities: [Products],
});
