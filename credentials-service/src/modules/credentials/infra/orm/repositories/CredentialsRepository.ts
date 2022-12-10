import { ICredentialsRepository } from '@modules/credentials/domain/repositories/ICredentialsRepository';
import { ICreateCredentials } from '@modules/credentials/domain/models/requests/ICreateCredentials';
import { dataSource } from '@config/orm';
import Credential from '../entities/Credential';
import { ICredential } from '@modules/credentials/domain/models/entities/ICredential';

export default class CreadentialsRepository implements ICredentialsRepository {
  private ormRepository;
  constructor() {
    this.ormRepository = dataSource.getRepository(Credential);
  }

  public async save(credential: ICredential): Promise<ICredential> {
    await this.ormRepository.save(credential);

    return credential;
  }

  public async create(data: ICreateCredentials): Promise<ICredential> {
    const credential = this.ormRepository.create(data);

    return credential;
  }
  public async getByEmail(
    email: string,
  ): Promise<ICredential | null | undefined> {
    const credential = await this.ormRepository.findOneBy({
      email: email,
    });

    return credential;
  }
}
