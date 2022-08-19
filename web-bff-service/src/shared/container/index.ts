import { ICredentialsRepository } from '@modules/credentials/domain/repositories/ICredentialsRepository';
import CredentialsRepository from '@modules/credentials/infra/rest/repositories/CredentialsRepository';
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
import { ISuppliersGateway } from '@modules/suppliers/domain/gateways/ISuppliersGateway';
import { SuppliersGateway } from '@modules/suppliers/infra/http/gateways/SuppliersGateway';
import { container } from 'tsyringe';

container.registerSingleton<IReceiversRepository>(
  'ReceiversGateway',
  ReceiversRepository,
);

container.registerSingleton<IProductsRepository>(
  'ProductsGateway',
  ProductsRepository,
);

container.registerSingleton<ISendersRepository>('SendersGateway', SendersRepository);

container.registerSingleton<ISuppliersGateway>(
  'SuppliersGateway',
  SuppliersGateway,
);

container.registerSingleton<IStoragesRepository>(
  'StoragesGateway',
  StoragesRepository,
);

container.registerSingleton<IReportsRepository>('ReportsGateway', ReportsRepository);

container.registerSingleton<ICredentialsRepository>(
  'CredentialsGateway',
  CredentialsRepository,
);
