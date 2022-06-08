import { IGetStoragesRequest } from '@shared-types/storages/domain/models/requests/IGetStoragesRequest';

export interface IGenerateStoragesIndicatorsUseCase {
  execute(request: IGetStoragesRequest): Promise<void>;
}
