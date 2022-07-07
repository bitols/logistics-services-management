import { ISendersRepository } from '@modules/senders/domain/repositories/ISendersRepository';
import { SendersRepository } from '@modules/senders/infra/orm/repositories/SendersRepository';
import { container } from 'tsyringe';

container.registerSingleton<ISendersRepository>(
  'SendersRepository',
  SendersRepository,
);
