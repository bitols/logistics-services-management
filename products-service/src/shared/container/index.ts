import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { ProductsRepository } from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import { IKafkaQueue } from '@shared/infra/queue/IKafkaQueue';
import { KafkaQueue } from '@shared/infra/queue/KafkaQueue';
import { container } from 'tsyringe';

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<IKafkaQueue>('KafkaQueue', KafkaQueue);
