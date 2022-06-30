import { ICredential } from '../models/entities/ICredential';
import { ICreateCredentials } from '../models/requests/ICreateCredentials';

export interface ICredentialsRepository {
  create(data: ICreateCredentials): Promise<ICredential>;
  save(credential: ICredential): Promise<ICredential>;
  getByEmail(email: string): Promise<ICredential | null | undefined>;
}
