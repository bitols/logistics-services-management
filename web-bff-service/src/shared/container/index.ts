import { ISessionsRepository } from '@modules/sessions/domain/repositories/ISessionsRepository';
import SessionsRepository from '@modules/sessions/infra/rest/repositories/SessionsRepository';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { ProductsRepository } from '@modules/products/infra/rest/repositories/ProductsRepository';
import { IReceiversRepository } from '@modules/receivers/domain/repositories/IReceiversRepository';
import { ReceiversRepository } from '@modules/receivers/infra/rest/repositories/ReceiversRepository';
import { IReportsRepository } from '@modules/reports/domain/repositories/IReportsRepository';
import { ReportsRepository } from '@modules/reports/infra/rest/repositories/ReportsRepository';
import { ISendersRepository } from '@modules/senders/domain/repositories/ISendersRepository';
import { SendersRepository } from '@modules/senders/infra/rest/repositories/SendersRepository';
import { IStoragesRepository } from '@modules/storages/domain/repositories/IStoragesRepository';
import { StoragesRepository } from '@modules/storages/infra/rest/repositories/StoragesRepository';
import { ISuppliersRepository } from '@modules/suppliers/domain/repositories/ISuppliersRepository';
import { SuppliersRepository } from '@modules/suppliers/infra/rest/repositories/SuppliersRepository';
import { container } from 'tsyringe';

container.registerSingleton<IReceiversRepository>(
  'ReceiversRepository',
  ReceiversRepository,
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<ISendersRepository>(
  'SendersRepository',
  SendersRepository,
);

container.registerSingleton<ISuppliersRepository>(
  'SuppliersRepository',
  SuppliersRepository,
);

container.registerSingleton<IStoragesRepository>(
  'StoragesRepository',
  StoragesRepository,
);

container.registerSingleton<IReportsRepository>(
  'ReportsRepository',
  ReportsRepository,
);

container.registerSingleton<ISessionsRepository>(
  'SessionsRepository',
  SessionsRepository,
);
