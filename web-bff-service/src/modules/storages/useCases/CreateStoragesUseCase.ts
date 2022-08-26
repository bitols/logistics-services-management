import { inject, injectable } from 'tsyringe';
import { IStoragesRepository } from '../domain/repositories/IStoragesRepository';
import { ICreateStorages } from '../domain/models/requests/ICreateStorages';
import { IStorages } from '../domain/models/responses/IStorages';
import AppErrors from '@shared/errors/AppErrors';
@injectable()
export default class CreateStoragesUseCase {
  constructor(
    @inject('StoragesRepository')
    private storagesRepository: IStoragesRepository,
  ) {}

  public async execute(data: ICreateStorages): Promise<IStorages> {
    const storage = await this.storagesRepository.create(data);
    if (!storage) {
      throw new AppErrors('Error on create storage');
    }
    return storage;
  }
}
