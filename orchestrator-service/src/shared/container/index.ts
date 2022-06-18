import { IProductsGateway } from '@modules/products/domain/gateways/IProductsGateway';
import { ProductsGateway } from '@modules/products/infra/http/gateways/ProductsGateway';
import { IReportsGateway } from '@modules/reports/domain/gateways/IReportsGateway';
import { ReportsGateway } from '@modules/reports/infra/http/gateways/ReportsGateway';
import { IStoragesGateway } from '@modules/storages/domain/gateways/IStoragesGateway';
import { StoragesGateway } from '@modules/storages/infra/http/gateways/StoragesGateway';
import { IKafkaQueue } from '@shared/infra/kafka/queue/IKafkaQueue';
import { KafkaQueue } from '@shared/infra/kafka/KafkaQueue';
import { container } from 'tsyringe';

container.registerSingleton<IProductsGateway>(
  'ProductsGateway',
  ProductsGateway,
);

container.registerSingleton<IStoragesGateway>(
  'StoragesGateway',
  StoragesGateway,
);

container.registerSingleton<IReportsGateway>('ReportsGateway', ReportsGateway);

container.register<IKafkaQueue>('KafkaQueue', KafkaQueue);
