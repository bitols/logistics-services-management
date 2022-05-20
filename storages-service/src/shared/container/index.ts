import { IStoragesRepository } from '@modules/storages/domain/repositories/IStoragesRepository';
import { StoragesRepository } from '@modules/storages/infra/typeorm/repositories/StoragesRepository';
import { container } from 'tsyringe';

container.registerSingleton<IStoragesRepository>(
  'StoragesRepository',
  StoragesRepository,
);