import { ICreateSessions } from '../models/requests/ICreateSessions';
import { IValidationSessions } from '../models/requests/IValidationSessions';
import { ICredentials } from '../models/responses/ICredentials';
import { ISessions } from '../models/responses/ISessions';

export interface ISessionsRepository {
  validateSession(
    request: IValidationSessions,
  ): Promise<ICredentials | undefined>;
  createSession(request: ICreateSessions): Promise<ISessions | undefined>;
}
