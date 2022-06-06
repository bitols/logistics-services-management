import { IProductsGateway } from '@modules/products/domain/gateways/IProductsGateway';
import { ProductsGateway } from '@modules/products/infra/http/gateways/ProductsGateway';
import { IStoragesGateway } from '@modules/storages/domain/gateways/IStoragesGateway';
import { StoragesGateway } from '@modules/storages/infra/http/gateways/StoragesGateway';
import { container } from 'tsyringe';

container.registerSingleton<IProductsGateway>(
  'ProductsGateway',
  ProductsGateway,
);

container.registerSingleton<IStoragesGateway>(
  'StoragesGateway',
  StoragesGateway,
);