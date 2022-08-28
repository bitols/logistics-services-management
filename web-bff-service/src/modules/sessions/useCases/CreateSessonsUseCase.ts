import { inject, injectable } from 'tsyringe';
import { ICreateSessions } from '../domain/models/requests/ICreateSessions';
import { ISessions } from '../domain/models/responses/ISessions';
import { ISessionsRepository } from '../domain/repositories/ISessionsRepository';

@injectable()
export class CreateSessionsUseCase {
  constructor(
    @inject('SessionsRepository')
    private credentialsRepository: ISessionsRepository,
  ) {}

  public async execute(data: ICreateSessions): Promise<ISessions> {
    const session = await this.credentialsRepository.createSession(data);

    return session as ISessions;
  }
}
