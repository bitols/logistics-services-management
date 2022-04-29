import { IProductRepository } from '@modules/products/domain/repositories/IProductRepository';
import { ProductRepository } from '@modules/products/infra/typeorm/repositories/ProductRepository';
import { container } from 'tsyringe';

container.registerSingleton<IProductRepository>(
  'ProductRepository',
  ProductRepository,
);
