import { IStoragesCapacityRepository } from '@modules/reports/domain/repositories/IStoragesCapacityRepository';
import { StoragesCapacityRepository } from '@modules/reports/infra/typeorm/repositories/StoragesCapacityRepository';
import { container } from 'tsyringe';
container.registerSingleton<IStoragesCapacityRepository>(
  'StoragesCapacityRepository',
  StoragesCapacityRepository,
);
