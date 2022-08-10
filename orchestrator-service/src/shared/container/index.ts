import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { ProductsRepository } from '@modules/products/infra/rest/repositories/ProductsRepository';
import { IReportsRepository } from '@modules/reports/domain/repositories/IReportsRepository';
import { ReportsRepository } from '@modules/reports/infra/rest/repositories/ReportsRepository';
import { IStoragesRepository } from '@modules/storages/domain/repositories/IStoragesRepository';
import { StoragesRepository } from '@modules/storages/infra/rest/repositories/StoragesRepository';
import { container } from 'tsyringe';
import { IGeolocationsRepository } from '@modules/geolocation/domain/repositories/IGeolocationsRepository';
import { GeolocationsRepository } from '@modules/geolocation/infra/rest/repositories/GeolocationsRepository';
import { IReceiversRepository } from '@modules/receivers/domain/repositories/IReceiversRepository';
import { ReceiversRepository } from '@modules/receivers/infra/rest/repositories/ReceiversRepository';

container.registerSingleton<IGeolocationsRepository>(
  'GeolocationsRepository',
  GeolocationsRepository,
);

container.registerSingleton<IReceiversRepository>(
  'ReceiversRepository',
  ReceiversRepository,
);

container.registerSingleton<IReportsRepository>(
  'ReportsRepository',
  ReportsRepository,
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<IStoragesRepository>(
  'StoragesRepository',
  StoragesRepository,
);
