import { ICredentialsRepository } from '@modules/credentials/domain/repositories/ICredentialsRepository';
import { ISessionsRepository } from '@modules/credentials/domain/repositories/ISessionsRepository';
import SessionsRepository from '@modules/credentials/infra/auth/repositories/SessionsRepository';
import CreadentialsRepository from '@modules/credentials/infra/orm/repositories/CredentialsRepository';
import { container } from 'tsyringe';

container.registerSingleton<ISessionsRepository>(
  'SessionsRepository',
  SessionsRepository,
);

container.registerSingleton<ICredentialsRepository>(
  'CredentialsRepository',
  CreadentialsRepository,
);
