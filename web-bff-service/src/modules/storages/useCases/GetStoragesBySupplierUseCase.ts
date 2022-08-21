import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IGetStoragesBySupplier } from '../domain/models/requests/IGetStoragesBySupplier';

import { IStorages } from '../domain/models/responses/IStorages';
import { IStoragesRepository } from '../domain/repositories/IStoragesRepository';

@injectable()
export default class GetStoragesBySupplierUseCase {
  constructor(
    @inject('StoragesRepository')
    private storagesRepository: IStoragesRepository,
  ) {}

  public async execute(data: IGetStoragesBySupplier): Promise<IStorages[]> {
    const storages = await this.storagesRepository.getAllBySupplier(data);

    if (!storages) {
      throw new AppErrors('Storages not found');
    }

    return storages;
  }
}
