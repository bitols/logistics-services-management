import { IProductsGateway } from '@modules/products/domain/gateways/IProductsGateway';
import { ProductsGateway } from '@modules/products/infra/http/gateways/ProductsGateway';
import { IReceiversGateway } from '@modules/receivers/domain/gateways/IReceiversGateway';
import { ReceiversGateway } from '@modules/receivers/infra/http/gateways/ReceiversGateway';
import { ISendersGateway } from '@modules/senders/domain/gateways/ISendersGateway';
import { SendersGateway } from '@modules/senders/infra/http/gateways/SendersGateway';
import { IStoragesGateway } from '@modules/storages/domain/gateways/IStoragesGateway';
import { StoragesGateway } from '@modules/storages/infra/http/gateways/StoragesGateway';
import { ISuppliersGateway } from '@modules/suppliers/domain/gateways/ISuppliersGateway';
import { SuppliersGateway } from '@modules/suppliers/infra/http/gateways/SuppliersGateway';
import { container } from 'tsyringe';

container.registerSingleton<IReceiversGateway>(
  'ReceiversGateway',
  ReceiversGateway,
);

container.registerSingleton<IProductsGateway>(
  'ProductsGateway',
  ProductsGateway,
);

container.registerSingleton<ISendersGateway>('SendersGateway', SendersGateway);

container.registerSingleton<ISuppliersGateway>(
  'SuppliersGateway',
  SuppliersGateway,
);

container.registerSingleton<IStoragesGateway>(
  'StoragesGateway',
  StoragesGateway,
);
