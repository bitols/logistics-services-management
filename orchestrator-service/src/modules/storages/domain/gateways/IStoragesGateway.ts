import { IStoragesResponse } from '@shared-types/storages/domain/models/responses/IStoragesResponse';
import { IGetStoragesRequest } from '@shared-types/storages/domain/models/requests/IGetStoragesRequest';
import { IUpdateStoragesLocationRequest } from '@shared-types/storages/domain/models/requests/IUpdateStoragesLocationRequest';
export interface IStoragesGateway {
  getById(request: IGetStoragesRequest): Promise<IStoragesResponse | undefined>;
  updateLocation(
    request: IUpdateStoragesLocationRequest,
  ): Promise<IStoragesResponse | undefined>;
}
