import { inject, injectable } from 'tsyringe';
import { IRegisterStoragesCapacity } from '../domain/models/requests/IRegisterStoragesCapacity';
import { IStoragesCapacity } from '../domain/models/responses/IStoragesCapacity';
import { IStoragesCapacityRepository } from '../domain/repositories/IStoragesCapacityRepository';

@injectable()
export default class RegisterStoragesCapacityUseCase {
  constructor(
    @inject('StoragesCapacityRepository')
    private storagesCapacityRepository: IStoragesCapacityRepository,
  ) {}

  public async execute(
    data: IRegisterStoragesCapacity,
  ): Promise<IStoragesCapacity> {
    let storageCapacity = await this.storagesCapacityRepository.getByStorageId(
      data.storageId,
    );

    if (!storageCapacity) {
      storageCapacity = await this.storagesCapacityRepository.create(data);
    } else {
      storageCapacity.capacity = data.capacity;
      storageCapacity.stored = data.stored;
      storageCapacity.usage = data.usage;
      storageCapacity.products = data.products;
      storageCapacity.value = data.value;
    }

    await this.storagesCapacityRepository.save(storageCapacity);

    return storageCapacity as IStoragesCapacity;
  }
}
