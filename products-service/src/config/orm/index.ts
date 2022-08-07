import config from '@config/orm/config';
import Products from '@modules/products/infra/orm/entities/Product';
import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'mongodb',
  url: config.url,
  useNewUrlParser: config.useNewUrlParser,
  synchronize: config.synchronize,
  logging: config.logging,
  entities: [Products],
});
