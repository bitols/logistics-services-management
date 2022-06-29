import AppError from '@shared/errors/AppErrors';
import { compare } from 'bcryptjs';
import { ICreateSessions } from '@shared-types/credentials/domain/models/requests/ICreateSessions';
import { inject, injectable } from 'tsyringe';
import { ISessionsRepository } from '../domain/repositories/ISessionsRepository';
import { ITokenSession } from '@shared-types/credentials/domain/models/entities/ITokenSession';
import { ICredentialsRepository } from '../domain/repositories/ICredentialsRepository';

@injectable()
export default class CreateSessionsUseCase {
  constructor(
    @inject('SessionsRepository')
    private sessionsRepository: ISessionsRepository,
    @inject('CredentialsRepository')
    private credentialsRepository: ICredentialsRepository,
  ) {}
  public async execute(data: ICreateSessions): Promise<ITokenSession> {
    const credentials = await this.credentialsRepository.getByEmail(data.email);

    if (!credentials) {
      throw new AppError('Incorrect email/password credentials.', 401);
    }
    const passwordConfirmed = await compare(
      data.password,
      credentials.password,
    );

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password credentials.', 401);
    }

    return await this.sessionsRepository.create({
      email: credentials.email,
      senderId: credentials.senderId,
    });
  }
}
