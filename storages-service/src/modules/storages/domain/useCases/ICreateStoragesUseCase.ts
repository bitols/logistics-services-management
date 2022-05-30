import { ICreateStoragesRequest } from '@shared-types/storages/domain/models/requests/ICreateStoragesRequest';
import { IStoragesResponse } from '@shared-types/storages/domain/models/responses/IStoragesResponse';

export interface ICreateStoragesUseCase {
  execute(data: ICreateStoragesRequest): Promise<IStoragesResponse>;
}
