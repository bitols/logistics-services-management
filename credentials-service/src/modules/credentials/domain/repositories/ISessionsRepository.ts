import { ITokenSession } from '@shared-types/credentials/domain/models/entities/ITokenSession';
import { ISession } from '@shared-types/credentials/domain/models/entities/ISession';
export interface ISessionsRepository {
  create(request: ISession): Promise<ITokenSession>;
  validation(request: ITokenSession): Promise<ISession>;
}
