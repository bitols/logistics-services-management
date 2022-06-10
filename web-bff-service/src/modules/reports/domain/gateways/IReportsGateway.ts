import { IGetAllStoragesCapacityBySenderIdRequest } from '@shared-types/reports/domain/models/requests/IGetAllStoragesCapacityBySenderIdRequest';
import { IStoragesCapacityResponse } from '@shared-types/reports/domain/models/responses/IStoragesCapacityResponse';
export interface IReportsGateway {
  getAllStoragesCapacityBySender(
    request: IGetAllStoragesCapacityBySenderIdRequest,
  ): Promise<IStoragesCapacityResponse[] | undefined>;
}
