import { ISession } from '@shared-types/credentials/domain/models/entities/ISession';
import { IValidToken } from '@shared-types/credentials/domain/models/requests/IValidToken';

export interface ICredentialsRepository {
  getSession(request: IValidToken): Promise<ISession | undefined>;
}
