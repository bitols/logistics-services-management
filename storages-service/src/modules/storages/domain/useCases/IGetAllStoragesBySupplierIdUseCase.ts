import { IGetAllStoragesBySupplierIdRequest } from '../models/requests/IGetAllStoragesBySupplierIdRequest';
import { IStoragesResponse } from '../models/responses/IStoragesResponse';

export interface IGetAllStoragesBySupplierIdUseCase {
  execute(
    data: IGetAllStoragesBySupplierIdRequest,
  ): Promise<IStoragesResponse[]>;
}
