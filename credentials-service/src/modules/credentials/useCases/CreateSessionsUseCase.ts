import AppError from '@shared/errors/AppErrors';
import { compareHashString } from '@config/encryption';
import { ICreateSessions } from '@modules/credentials/domain/models/requests/ICreateSessions';
import { inject, injectable } from 'tsyringe';
import { ISessionsRepository } from '../domain/repositories/ISessionsRepository';
import { ICredentialsRepository } from '../domain/repositories/ICredentialsRepository';
import { ISessions } from '../domain/models/responses/ISessions';

@injectable()
export default class CreateSessionsUseCase {
  constructor(
    @inject('SessionsRepository')
    private sessionsRepository: ISessionsRepository,
    @inject('CredentialsRepository')
    private credentialsRepository: ICredentialsRepository,
  ) {}
  public async execute(data: ICreateSessions): Promise<ISessions> {
    const credential = await this.credentialsRepository.getByEmail(data.email);
    if (!credential) {
      throw new AppError('Incorrect email/password credentials.', 401);
    }

    const passwordConfirmed = await compareHashString(
      data.password,
      credential.password,
    );
    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password credentials.', 401);
    }

    const token = await this.sessionsRepository.creation(
      credential.id,
      credential.email,
      credential.senderId,
    );

    return { token };
  }
}
