import { IStoragesResponse } from '@shared-types/storages/domain/models/responses/IStoragesResponse';
import { IGetStoragesRequest } from '@shared-types/storages/domain/models/requests/IGetStoragesRequest';
import { IGetAllStoragesBySupplierIdRequest } from '@shared-types/storages/domain/models/requests/IGetAllStoragesBySupplierIdRequest';
import { IGetAllStoragesBySenderIdRequest } from '@shared-types/storages/domain/models/requests/IGetAllStoragesBySenderIdRequests';
export interface IStoragesGateway {
  getAllBySupplier(
    request: IGetAllStoragesBySupplierIdRequest,
  ): Promise<IStoragesResponse[] | undefined>;
  getById(request: IGetStoragesRequest): Promise<IStoragesResponse | undefined>;
  getAllBySender(
    request: IGetAllStoragesBySenderIdRequest,
  ): Promise<IStoragesResponse[] | undefined>;
}
