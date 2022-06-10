import { IGetStoragesRequest } from '@shared-types/storages/domain/models/requests/IGetStoragesRequest';

export interface IGenerateStoragesCapacitysUseCase {
  execute(request: IGetStoragesRequest): Promise<void>;
}
