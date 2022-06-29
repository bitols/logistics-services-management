import { ISession } from '@shared-types/credentials/domain/models/entities/ISession';
import { IValidToken } from '@shared-types/credentials/domain/models/requests/IValidToken';

export interface ICredentialsGateway {
  getSession(request: IValidToken): Promise<ISession | undefined>;
}
