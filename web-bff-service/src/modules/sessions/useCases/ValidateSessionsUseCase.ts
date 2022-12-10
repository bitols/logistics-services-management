import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IValidationSessions } from '../domain/models/requests/IValidationSessions';
import { ICredentials } from '../domain/models/responses/ICredentials';
import { ISessionsRepository } from '../domain/repositories/ISessionsRepository';

@injectable()
export class ValidateSessionsUseCase {
  constructor(
    @inject('SessionsRepository')
    private credentialsRepository: ISessionsRepository,
  ) {}

  public async execute(data: IValidationSessions): Promise<ICredentials> {
    const credential = await this.credentialsRepository.validateSession(data);

    if (!credential) {
      throw new AppErrors('JWT expired.', 401);
    }
    return credential;
  }
}
