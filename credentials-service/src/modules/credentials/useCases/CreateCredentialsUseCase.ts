import { hash } from 'bcryptjs';
import { ICreateCredentials } from '@modules/credentials/domain/models/requests/ICreateCredentials';
import { ICredentials } from '@modules/credentials/domain/models/responses/ICredentials';
import { inject, injectable } from 'tsyringe';
import { ICredentialsRepository } from '@modules/credentials/domain/repositories/ICredentialsRepository';
import AppErrors from '@shared/errors/AppErrors';

@injectable()
export default class CreateCredentialsUseCase {
  constructor(
    @inject('CredentialsRepository')
    private credentialsRepository: ICredentialsRepository,
  ) {}

  public async execute(data: ICreateCredentials): Promise<ICredentials> {
    let credential = await this.credentialsRepository.getByEmail(data.email);

    if (credential) {
      throw new AppErrors('Credentials already exists.');
    }

    const hashedPassword = await hash(data.password, 8);
    data.password = hashedPassword;

    credential = await this.credentialsRepository.create(data);
    await this.credentialsRepository.save(credential);

    return {
      id: credential.id,
      email: credential.email,
      senderId: credential.senderId,
    };
  }
}
