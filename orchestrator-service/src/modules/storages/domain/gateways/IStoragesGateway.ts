import { IStoragesResponse } from '@shared-types/storages/domain/models/responses/IStoragesResponse';
import { IGetStoragesRequest } from '@shared-types/storages/domain/models/requests/IGetStoragesRequest';
export interface IStoragesGateway {
  getById(request: IGetStoragesRequest): Promise<IStoragesResponse | undefined>;
}
