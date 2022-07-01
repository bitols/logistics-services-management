import { IReceiversRepository } from '@modules/receivers/domain/repositories/IReceiverRepository';
import { ReceiversRepository } from '@modules/receivers/infra/orm/repositories/ReceiversRepository';
import { container } from 'tsyringe';

container.registerSingleton<IReceiversRepository>(
  'ReceiversRepository',
  ReceiversRepository,
);
