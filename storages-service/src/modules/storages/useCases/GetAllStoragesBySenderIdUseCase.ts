import { IGetAllStoragesBySenderIdRequest } from '@shared-types/storages/domain/models/requests/IGetAllStoragesBySenderIdRequests';
import { IStoragesResponse } from '@shared-types/storages/domain/models/responses/IStoragesResponse';
import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IStoragesRepository } from '../domain/repositories/IStoragesRepository';
import { IGetAllStoragesBySenderIdUseCase } from '../domain/useCases/IGetAllStoragesBySenderIdUseCase';

@injectable()
export default class GetAllStoragesBySenderIdUsecase
  implements IGetAllStoragesBySenderIdUseCase
{
  constructor(
    @inject('StoragesRepository')
    private storagesRepository: IStoragesRepository,
  ) {}

  public async execute(
    data: IGetAllStoragesBySenderIdRequest,
  ): Promise<IStoragesResponse[]> {
    const storages = await this.storagesRepository.getAllBySender(
      data.senderId,
    );

    if (!storages.length) {
      throw new AppErrors('Storages not found');
    }

    return storages.map(storage => storage as IStoragesResponse);
  }
}
