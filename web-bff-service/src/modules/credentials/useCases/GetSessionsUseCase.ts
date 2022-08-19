import { ISession } from '@shared-types/credentials/domain/models/entities/ISession';
import { IValidToken } from '@shared-types/credentials/domain/models/requests/IValidToken';
import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { ICredentialsRepository } from '../domain/repositories/ICredentialsRepository';

@injectable()
export class GetSessionsUseCase {
  constructor(
    @inject('CredentialsGateway')
    private credentialsGateway: ICredentialsRepository,
  ) {}

  public async execute(data: IValidToken): Promise<ISession> {
    const session = await this.credentialsGateway.getSession(data);

    if (!session) {
      throw new AppErrors('JWT expired.', 401);
    }

    return session as unknown as ISession;
  }
}
