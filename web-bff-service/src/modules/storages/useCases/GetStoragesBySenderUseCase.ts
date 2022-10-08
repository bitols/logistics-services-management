import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IGetStoragesBySender } from '../domain/models/requests/IGetStoragesBySender';
import { IStorages } from '../domain/models/responses/IStorages';
import { IStoragesRepository } from '../domain/repositories/IStoragesRepository';

@injectable()
export default class GetStoragesBySenderUsecase {
  constructor(
    @inject('StoragesRepository')
    private storagesRepository: IStoragesRepository,
  ) {}

  public async execute(data: IGetStoragesBySender): Promise<IStorages[]> {
    let storages: IStorages[] | undefined;

    if (!data.name) {
      storages = await this.storagesRepository.getAllBySender(data);
    } else {
      storages = await this.storagesRepository.getAllByName(data);
    }
    if (!storages) {
      throw new AppErrors('Storages not found');
    }

    return storages;
  }
}
