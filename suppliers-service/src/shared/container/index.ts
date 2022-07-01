import { ISuppliersRepository } from '@modules/suppliers/domain/repositories/ISuppliersRepository';
import { SuppliersRepository } from '@modules/suppliers/infra/orm/repositories/SuppliersRepository';
import { container } from 'tsyringe';

container.registerSingleton<ISuppliersRepository>(
  'SuppliersRepository',
  SuppliersRepository,
);
