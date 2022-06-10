import { IStoragesCapacityResponse } from '@shared-types/reports/domain/models/responses/IStoragesCapacityResponse';
import { IRegisterStoragesCapacityRequest } from '@shared-types/reports/domain/models/requests/IRegisterStoragesCapacityRequest';

export interface IRegisterStoragesCapacityUseCase {
  execute(
    data: IRegisterStoragesCapacityRequest,
  ): Promise<IStoragesCapacityResponse>;
}
