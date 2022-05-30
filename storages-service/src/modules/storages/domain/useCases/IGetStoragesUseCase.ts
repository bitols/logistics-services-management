import { IGetStoragesRequest } from '@shared-types/storages/domain/models/requests/IGetStoragesRequest';
import { IStoragesResponse } from '@shared-types/storages/domain/models/responses/IStoragesResponse';

export interface IGetStoragesUseCase {
  execute(data: IGetStoragesRequest): Promise<IStoragesResponse>;
}
