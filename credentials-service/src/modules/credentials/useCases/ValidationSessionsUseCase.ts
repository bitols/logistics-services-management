import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { ISessionsRepository } from '../domain/repositories/ISessionsRepository';
import { IValidToken } from '@shared-types/credentials/domain/models/requests/IValidToken';
import { ISession } from '@shared-types/credentials/domain/models/entities/ISession';

@injectable()
export default class ValidationSessionsUseCase {
  constructor(
    @inject('SessionsRepository')
    private sessionsRepository: ISessionsRepository,
  ) {}

  public async execute(data: IValidToken): Promise<ISession> {
    try {
      console.log(data);
      return await this.sessionsRepository.validation({
        token: data.token,
      });
    } catch (error: any) {
      throw new AppErrors(error.message, 401);
    }
  }
}
