import { IValidationSessions } from '../models/requests/IValidationSessions';
import { ICredentials } from '../models/responses/ICredentials';

export interface ISessionsRepository {
  validateSession(
    request: IValidationSessions,
  ): Promise<ICredentials | undefined>;
}
