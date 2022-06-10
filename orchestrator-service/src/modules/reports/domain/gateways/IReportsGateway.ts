import { IRegisterStoragesCapacityRequest } from '@shared-types/reports/domain/models/requests/IRegisterStoragesCapacityRequest';
import { IStoragesCapacityResponse } from '@shared-types/reports/domain/models/responses/IStoragesCapacityResponse';
export interface IReportsGateway {
  registerStoragesCapacity(
    request: IRegisterStoragesCapacityRequest,
  ): Promise<IStoragesCapacityResponse | undefined>;
}
