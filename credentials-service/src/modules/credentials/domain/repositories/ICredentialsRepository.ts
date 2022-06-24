import { ICredential } from '@shared-types/credentials/domain/models/entities/ICredential';
import { ICreateCredentials } from '@shared-types/credentials/domain/models/requests/ICreateCredentials';

export interface ICredentialsRepository {
  create(data: ICreateCredentials): Promise<ICredential>;
  save(credential: ICredential): Promise<ICredential>;
  getByEmail(email: string): Promise<ICredential | null | undefined>;
}
