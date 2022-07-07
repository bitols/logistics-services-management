import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IGetAllStoragesCapacityBySenderId } from '../domain/models/requests/IGetAllStoragesCapacityBySenderId';
import { IStoragesCapacity } from '../domain/models/responses/IStoragesCapacity';
import { IStoragesCapacityRepository } from '../domain/repositories/IStoragesCapacityRepository';

@injectable()
export default class GetAllStoragesCapacityBySenderIdUsecase {
  constructor(
    @inject('StoragesCapacityRepository')
    private storagesCapacityRepository: IStoragesCapacityRepository,
  ) {}

  public async execute(
    data: IGetAllStoragesCapacityBySenderId,
  ): Promise<IStoragesCapacity[]> {
    const storagesCapacity =
      await this.storagesCapacityRepository.getAllBySender(data.senderId);
    if (!storagesCapacity.length) {
      throw new AppErrors('Storages capacity report not found');
    }

    return storagesCapacity.map(
      storageCapacity => storageCapacity as IStoragesCapacity,
    );
  }
}
