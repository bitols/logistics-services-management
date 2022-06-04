import { IDeleteStoragesRequest } from '@shared-types/storages/domain/models/requests/IDeleteStoragesRequest';

export interface IDeleteStoragesUseCase {
  execute(data: IDeleteStoragesRequest): Promise<void>;
}
