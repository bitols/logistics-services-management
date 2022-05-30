import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IGetAllStoragesBySupplierIdRequest } from '@shared-types/storages/domain/models/requests/IGetAllStoragesBySupplierIdRequest';
import { IStoragesResponse } from '@shared-types/storages/domain/models/responses/IStoragesResponse';
import { IStoragesRepository } from '../domain/repositories/IStoragesRepository';
import { IGetAllStoragesBySupplierIdUseCase } from '../domain/useCases/IGetAllStoragesBySupplierIdUseCase';

@injectable()
export default class GetAllStoragesBySupplierIdUseCase
  implements IGetAllStoragesBySupplierIdUseCase
{
  constructor(
    @inject('StoragesRepository')
    private storagesRepository: IStoragesRepository,
  ) {}

  public async execute(
    data: IGetAllStoragesBySupplierIdRequest,
  ): Promise<IStoragesResponse[]> {
    const storages = await this.storagesRepository.getAllBySupplier(
      data.supplierId,
    );

    if (!storages.length) {
      throw new AppErrors('Storages not found');
    }

    return storages.map(storage => storage as IStoragesResponse);
  }
}
