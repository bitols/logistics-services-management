import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IGetStorages } from '../domain/models/requests/IGetStorages';
import { IStorages } from '../domain/models/responses/IStorages';
import { IStoragesRepository } from '../domain/repositories/IStoragesRepository';

@injectable()
export default class GetStoragesUseCase {
  constructor(
    @inject('StoragesRepository')
    private storagesRepository: IStoragesRepository,
  ) {}

  public async execute(data: IGetStorages): Promise<IStorages> {
    const storage = await this.storagesRepository.getById(data);

    if (!storage) {
      throw new AppErrors('Storage not found');
    }

    return storage;
  }
}
