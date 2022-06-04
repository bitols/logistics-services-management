import { IGetAllStoragesBySenderIdRequest } from '@shared-types/storages/domain/models/requests/IGetAllStoragesBySenderIdRequests';
import { IStoragesResponse } from '@shared-types/storages/domain/models/responses/IStoragesResponse';

export interface IGetAllStoragesBySenderIdUseCase {
  execute(data: IGetAllStoragesBySenderIdRequest): Promise<IStoragesResponse[]>;
}
