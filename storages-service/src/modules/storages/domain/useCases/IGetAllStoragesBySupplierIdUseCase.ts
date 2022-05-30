import { IGetAllStoragesBySupplierIdRequest } from '@shared-types/storages/domain/models/requests/IGetAllStoragesBySupplierIdRequest';
import { IStoragesResponse } from '@shared-types/storages/domain/models/responses/IStoragesResponse';

export interface IGetAllStoragesBySupplierIdUseCase {
  execute(
    data: IGetAllStoragesBySupplierIdRequest,
  ): Promise<IStoragesResponse[]>;
}
