import { hash } from 'bcryptjs';
import { ICreateCredentials } from '@shared-types/credentials/domain/models/requests/ICreateCredentials';
import { ICredentials } from '@shared-types/credentials/domain/models/responses/ICredentials';
import { inject, injectable } from 'tsyringe';
import { ICredentialsRepository } from '../domain/repositories/ICredentialsRepository';
import AppErrors from '@shared/errors/AppErrors';

@injectable()
export default class CreateCredentialsUseCase {
  constructor(
    @inject('CredentialsRepository')
    private credentialsRepository: ICredentialsRepository,
  ) {}

  public async execute(data: ICreateCredentials): Promise<ICredentials> {
    let credentials = await this.credentialsRepository.getByEmail(data.email);

    if (credentials) {
      throw new AppErrors('Credentials already exists.');
    }

    const hashedPassword = await hash(data.password, 8);
    data.password = hashedPassword;

    credentials = await this.credentialsRepository.create(data);
    await this.credentialsRepository.save(credentials);

    return credentials as unknown as ICredentials;
  }
}
