import { IStorageProductsRepository } from '@modules/storages/domain/repositories/IStoragePorductsRepository';
import { IStoragesRepository } from '@modules/storages/domain/repositories/IStoragesRepository';
import { StorageProductsRepository } from '@modules/storages/infra/orm/repositories/StorageProductsRepository';
import { StoragesRepository } from '@modules/storages/infra/orm/repositories/StoragesRepository';
import { container } from 'tsyringe';

container.registerSingleton<IStoragesRepository>(
  'StoragesRepository',
  StoragesRepository,
);

container.registerSingleton<IStorageProductsRepository>(
  'StorageProductsRepository',
  StorageProductsRepository,
);
