import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';

import { ProductsRepository } from '@modules/products/infra/orm/repositories/ProductsRepository';
import { KafkaQueue } from '@shared/infra/kafka/KafkaQueue';
import { IKafkaQueue } from '@shared/infra/kafka/queue/IKafkaQueue';
import { container } from 'tsyringe';

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);

container.register<IKafkaQueue>('KafkaQueue', KafkaQueue);
