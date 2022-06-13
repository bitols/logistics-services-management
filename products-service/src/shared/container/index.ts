import { IProductsQueue } from '@modules/products/domain/queues/IProductsQueue';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { ProductsQueue } from '@modules/products/infra/kafka/queues/ProductsQueue';
import { ProductsRepository } from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import { container } from 'tsyringe';

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<IProductsQueue>('ProductsQueue', ProductsQueue);
