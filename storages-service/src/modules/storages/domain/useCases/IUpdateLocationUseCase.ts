import { IStoragesResponse } from '@shared-types/storages/domain/models/responses/IStoragesResponse';
import { IUpdateStoragesLocationRequest } from '@shared-types/storages/domain/models/requests/IUpdateStoragesLocationRequest';
export interface IUpdateLocationUseCase {
  execute(data: IUpdateStoragesLocationRequest): Promise<IStoragesResponse>;
}
