import { IGetAllStoragesCapacityBySenderIdRequest } from '@shared-types/reports/domain/models/requests/IGetAllStoragesCapacityBySenderIdRequest';
import { IStoragesCapacityResponse } from '@shared-types/reports/domain/models/responses/IStoragesCapacityResponse';
import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IStoragesCapacityRepository } from '../domain/repositories/IStoragesCapacityRepository';
import { IGetAllStoragesCapacitybySenderIdUseCase } from '../domain/useCases/IGetAllStoragesCapacityBySenderIdUseCase';

@injectable()
export default class GetAllStoragesCapacityBySenderIdUsecase
  implements IGetAllStoragesCapacitybySenderIdUseCase
{
  constructor(
    @inject('StoragesCapacityRepository')
    private storagesCapacityRepository: IStoragesCapacityRepository,
  ) {}

  public async execute(
    data: IGetAllStoragesCapacityBySenderIdRequest,
  ): Promise<IStoragesCapacityResponse[]> {
    const storagesCapacity =
      await this.storagesCapacityRepository.getAllBySender(data.senderId);
    if (!storagesCapacity.length) {
      throw new AppErrors('Storages capacity report not found');
    }

    return storagesCapacity.map(
      storageCapacity => storageCapacity as IStoragesCapacityResponse,
    );
  }
}
