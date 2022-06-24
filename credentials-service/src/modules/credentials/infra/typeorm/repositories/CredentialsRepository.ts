import { ICredentialsRepository } from '@modules/credentials/domain/repositories/ICredentialsRepository';
import { ICreateCredentials } from '@shared-types/credentials/domain/models/requests/ICreateCredentials';
import { Repository } from 'typeorm';
import { dataSource } from '@shared/infra/typeorm';
import Credential from '../entities/Credential';
import { ICredential } from '@shared-types/credentials/domain/models/entities/ICredential';

export default class CreadentialsRepository implements ICredentialsRepository {
  private ormRepository: Repository<Credential>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Credential);
  }

  public async save(credential: ICredential): Promise<ICredential> {
    console.log(`save credential: ${JSON.stringify(credential)}`);

    await this.ormRepository.save(credential);

    return credential;
  }

  public async create(data: ICreateCredentials): Promise<ICredential> {
    console.log(`create credential: ${JSON.stringify(data)}`);

    const credential = this.ormRepository.create(data);

    return credential;
  }
  public async getByEmail(
    email: string,
  ): Promise<ICredential | null | undefined> {
    console.log(`get credential by email: ${email}`);

    const credential = await this.ormRepository.findOneBy({
      email: email,
    });

    return credential;
  }
}
