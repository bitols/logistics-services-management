import { IRegisterStoragesCapacityRequest } from '@shared-types/reports/domain/models/requests/IRegisterStoragesCapacityRequest';
import { IStoragesCapacityResponse } from '@shared-types/reports/domain/models/responses/IStoragesCapacityResponse';
import { inject, injectable } from 'tsyringe';
import { IStoragesCapacityRepository } from '../domain/repositories/IStoragesCapacityRepository';
import { IRegisterStoragesCapacityUseCase } from '../domain/useCases/IRegisterStoragesCapacityUseCase';

@injectable()
export default class RegisterStoragesCapacityUseCase
  implements IRegisterStoragesCapacityUseCase
{
  constructor(
    @inject('StoragesCapacityRepository')
    private storagesCapacityRepository: IStoragesCapacityRepository,
  ) {}

  public async execute(
    data: IRegisterStoragesCapacityRequest,
  ): Promise<IStoragesCapacityResponse> {
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

    return storageCapacity as IStoragesCapacityResponse;
  }
}
