import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IValidationSessions } from '../domain/models/requests/IValidationSessions';
import { ICredentials } from '../domain/models/responses/ICredentials';
import { ISessionsRepository } from '../domain/repositories/ISessionsRepository';
@injectable()
export default class ValidationSessionsUseCase {
  constructor(
    @inject('SessionsRepository')
    private sessionsRepository: ISessionsRepository,
  ) {}

  public async execute({ token }: IValidationSessions): Promise<ICredentials> {
    try {
      return await this.sessionsRepository.validation(token);
    } catch (error: any) {
      throw new AppErrors(error.message, 401);
    }
  }
}
