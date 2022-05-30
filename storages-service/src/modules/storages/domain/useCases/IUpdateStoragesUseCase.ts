import { IUpdateStoragesRequest } from '@shared-types/storages/domain/models/requests/IUpdateStoragesRequest';
import { IStoragesResponse } from '@shared-types/storages/domain/models/responses/IStoragesResponse';

export interface IUpdateStoragesUseCase {
  execute(data: IUpdateStoragesRequest): Promise<IStoragesResponse>;
}
